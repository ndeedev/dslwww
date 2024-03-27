"use client"

import React, { useState } from 'react';

interface Product {
  _id: string;
  prodNumber: string;
  prodDescription: string;
  prodListPrice: number | string;
}

const QuoteBuilder: React.FC = () => {
  const [prodNum, setProdNum] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDiscount, setSelectedDiscount] = useState<number>(1); // Default discount is 100% (no discount)

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);

    try {
      const encodedProdNum = encodeURIComponent(prodNum);

      /*
        Use this spaghetti to get and use my current URL
      */
        const protocol = window.location.protocol; // e.g., "https:"
        const hostname = window.location.hostname;
        const port = window.location.port; // Might be an empty string
      
        const domain = port ? `${hostname}:${port}` : hostname;
        const fullUrl = `${protocol}//${domain}`;

      const response = await fetch(`${fullUrl}/api/product/${encodedProdNum}`);
      if (!response.ok) {
        throw new Error('Failed to fetch the product');
      }
      const { data }: { data: Product[] } = await response.json();
      if (data.length === 0) {
        throw new Error('Product not found');
      }
      setProducts(prev => [...prev, ...data]);
      setProdNum('');
      setError(null); // Reset error when product is found
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = (index: number) => {
    setProducts(prevProducts => {
      const newProducts = [...prevProducts];
      newProducts.splice(index, 1);
      return newProducts;
    });
  };

  const getTotalPrice = () => {
    return products.reduce((total, product) => {
      const price = isNaN(Number(product.prodListPrice)) ? 0 : Number(product.prodListPrice);
      return total + (price * selectedDiscount); // Use the discounted price for calculation
    }, 0);
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDiscount(parseFloat(e.target.value));
  };

  return (
    <div className="container mx-auto px-4 py-8 my-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-end mb-4">
        <div className="flex items-center">
          <select
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            defaultValue="1" // Default value is "List"
            onChange={handleDiscountChange} // Call handleDiscountChange when the select value changes
          >
            <option value="1">List</option>
            <option value=".6">40%</option>
            <option value=".5">50%</option>
            <option value=".4">60%</option>
          </select>
          <input
            type="text"
            value={prodNum}
            onChange={(e) => setProdNum(e.target.value)}
            placeholder="Product Number"
            className={`max-w-[17ch] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              error ? 'text-red-500 border-red-500' : 'text-black border-black'
            }`}
          />
          <button
            onClick={fetchProduct}
            disabled={loading}
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Fetch
          </button>
        </div>
      </div>

      {loading && <p>Loading...</p>}

      <div className="mt-6">
        <div className="flex text-center text-white bg-blue-500 px-4 py-2 rounded-t-md">
          <div className="w-1/5 font-bold">Product Number</div>
          <div className="flex-1 font-bold">Description</div>
          <div className="w-1/5 font-bold">List Price</div>
          <div className="w-6 font-bold"></div>
        </div>

        {products.map((product, index) => (
          <div key={`${product.prodNumber}-${index}`} className={`flex text-center px-4 py-2 bg-white text-black border-b border-black`}>
            <div className="w-1/5">{product.prodNumber}</div>
            <div className="flex-1">{product.prodDescription}</div>
            <div className="w-1/5">
              ${isNaN(Number(product.prodListPrice)) ? "N/A" : (Number(product.prodListPrice) * selectedDiscount).toFixed(2)}
            </div>
            <div className="w-6">
              <button
                onClick={() => removeProduct(index)}
                className="text-red-500"
              >
                &#10060; 
              </button>
            </div>
          </div>
        ))}

        <div className="flex text-center px-4 py-2 bg-white text-black border-b border-black">
          <div className="w-1/5"></div>
          <div className="flex-1 font-bold text-right">Total Price:</div>
          <div className="w-1/5 font-bold">${getTotalPrice().toFixed(2)}</div>
          <div className="w-6 font-bold"></div>
        </div>
      </div>
    </div>
  );
};

export default QuoteBuilder;
