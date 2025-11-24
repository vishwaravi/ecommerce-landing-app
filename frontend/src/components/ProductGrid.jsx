import React from 'react';
import ProductCard from './ProductCard';

/**
 * ProductGrid Component
 * Displays products in a responsive grid layout
 */
const ProductGrid = ({ products, loading, error, onAddToCart }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin h-16 w-16 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 text-center">
        <svg
          className="w-16 h-16 text-red-500 mx-auto mb-4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-red-700 mb-2">
          Error Loading Products
        </h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-12 text-center">
        <svg
          className="w-20 h-20 text-gray-400 mx-auto mb-4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
        </svg>
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
          No Products Found
        </h3>
        <p className="text-gray-600">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  return (
    <div id="products" className="scroll-mt-20">
      {/* Products Count */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-black text-center md:text-left">
          Shop All
          <span className="text-lg font-normal text-gray-600 ml-3">
            ({products.length} {products.length === 1 ? 'item' : 'items'})
          </span>
        </h2>
      </div>

      {/* Products Grid - 3 per row layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
        {products.map((product) => (
          <ProductCard 
            key={product._id} 
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
