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

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);

    try {
      const encodedProdNum = encodeURIComponent(prodNum);
      const response = await fetch(`https://dslwww.vercel.app/api/product/${encodedProdNum}`);
      if (!response.ok) {
        throw new Error('Failed to fetch the product');
      }
      const { data }: { data: Product[] } = await response.json();
      if (data.length === 0) {
        throw new Error('Product not found');
      }
      setProducts(prev => [...prev, ...data]);
      setProdNum('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = (productId: string) => {
    setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
  };

  return (
    <div className="container mx-auto px-4 py-8 my-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-end items-center mb-4">
        <div className="flex gap-4 items-center">
          {error && (
            <p className="text-red-500 mr-4">{error}</p>
          )}
          <input            
            type="text"
            value={prodNum}
            onChange={(e) => setProdNum(e.target.value)}
            placeholder="Product Number"
            className={`max-w-[17ch] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black ${
              error ? 'border-red-500' : 'border-black'
            }`}
          />
          <button
            onClick={fetchProduct}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Fetch
          </button>
        </div>
      </div>

      {loading && <p>Loading...</p>}

      <div className="mt-6">
        <div className="flex text-center text-white bg-blue-500 px-4 py-2 rounded-t-md">
          <div className="w-1/4 font-bold">Product Number</div>
          <div className="w-1/2 font-bold">Description</div>
          <div className="w-1/4 font-bold">List Price</div>
        </div>

        {products.map((product, index) => (
          <div key={product._id} className={`flex text-center px-4 py-2 bg-white text-black border-b border-black`}>
            <div className="w-1/4">{product.prodNumber}</div>
            <div className="w-1/2">{product.prodDescription}</div>
            <div className="w-1/4">
              ${isNaN(Number(product.prodListPrice)) ? "N/A" : Number(product.prodListPrice).toFixed(2)}
            </div>
            <div className="w-[2rem]">
              <button
                onClick={() => removeProduct(product._id)}
                className="text-red-500"
              >
                &#10060; 
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuoteBuilder;
