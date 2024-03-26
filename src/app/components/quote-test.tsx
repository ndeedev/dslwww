"use client";

import React, { useState } from 'react';

interface Product {
  _id: string;
  prodNumber: string;
  prodDescription: string;
  prodListPrice: number | string; // Adjusting for potential string input
}

const QuoteBuilder: React.FC = () => {
  const [prodNum, setProdNum] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/api/product/${prodNum}`);
      if (!response.ok) {
        throw new Error('Failed to fetch the product');
      }
      const { data }: { data: Product[] } = await response.json();
      setProducts(prev => [...prev, ...data]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 my-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-end gap-4 mb-4">
        <input
          type="text"
          value={prodNum}
          onChange={(e) => setProdNum(e.target.value)}
          placeholder="Product Number"
          className="max-w-[15ch] px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          maxLength={15}
        />
        <button
          onClick={fetchProduct}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Fetch
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="mt-6">
        {/* Header */}
        <div className="flex text-center text-white bg-blue-500 px-4 py-2 rounded-t-md">
          <div className="w-1/4 font-bold">Product Number</div>
          <div className="w-1/2 font-bold">Description</div>
          <div className="w-1/4 font-bold">List Price</div>
        </div>

        {/* Rows - Background color set to white and border color to black */}
        {products.map((product, index) => (
          <div key={product._id} className={`flex text-center px-4 py-2 bg-white text-black border-b border-black`}>
            <div className="w-1/4">{product.prodNumber}</div>
            <div className="w-1/2 overflow-hidden text-ellipsis">{product.prodDescription}</div>
            <div className="w-1/4">
              ${isNaN(Number(product.prodListPrice)) ? "N/A" : Number(product.prodListPrice).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuoteBuilder;
