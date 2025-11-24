import React from 'react';
import ProductCard from './ProductCard';

/**
 * Skeleton Loading Card Component
 */
const SkeletonCard = () => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
    <div className="aspect-square bg-gray-200"></div>
    <div className="p-3 md:p-4">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
      <div className="h-8 bg-gray-200 rounded w-full"></div>
    </div>
  </div>
);

/**
 * ProductGrid Component
 * Displays products in a responsive grid layout
 */
const ProductGrid = ({ products, loading, error, onAddToCart }) => {
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

  return (
    <div id="products" className="scroll-mt-20">
      {/* Products Count */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-black text-center md:text-left">
          Shop All
          {!loading && (
            <span className="text-lg font-normal text-gray-600 ml-3">
              ({products.length} {products.length === 1 ? 'item' : 'items'})
            </span>
          )}
        </h2>
      </div>

      {/* Products Grid - 3 per row layout - Fixed height container */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 min-h-[600px]">
        {loading ? (
          // Show skeleton cards during loading - same layout as real products
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={`skeleton-${index}`} />
          ))
        ) : products.length === 0 ? (
          // No products found - centered message
          <div className="col-span-2 md:col-span-3 flex items-center justify-center">
            <div className="text-center py-12">
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
          </div>
        ) : (
          // Render actual products
          products.map((product) => (
            <ProductCard 
              key={product._id} 
              product={product}
              onAddToCart={onAddToCart}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Memoize to optimize re-renders
export default React.memo(ProductGrid);
