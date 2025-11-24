import React from 'react';

/**
 * ProductCard Component
 * Displays individual product with image, name, price, and rating
 * Optimized for mobile-first design
 */
const ProductCard = ({ product, onAddToCart }) => {
  /**
   * Render star rating with smaller stars
   */
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-3 h-3 fill-current text-yellow-400" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    }

    // Remaining empty stars
    const emptyStars = 5 - fullStars;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-3 h-3 fill-current text-gray-300" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-none shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
      {/* Product Image */}
      <div className="relative bg-gray-100 aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x400?text=Product';
          }}
        />
        
        {/* Discount Badge (if applicable) */}
        {product.discount && (
          <div className="absolute top-3 left-3">
            <span className="bg-lime-400 text-black text-xs font-bold px-3 py-1 rounded">
              {product.discount}% OFF
            </span>
          </div>
        )}

        {/* Quick Add Button - Appears on Hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-white text-black px-4 md:px-6 py-1.5 md:py-2 rounded text-sm md:text-base font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-lime-400"
          >
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 bg-gray-50">
        {/* Product Name */}
        <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 leading-tight h-10">
          {product.name}
        </h3>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs text-gray-500">
            ({product.rating})
          </span>
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-base font-bold text-black">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Category Tag */}
        <div className="text-xs text-gray-500 uppercase tracking-wide mb-3">
          {product.category}
        </div>

        {/* Add to Cart Button - Mobile */}
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full bg-black text-white py-2 text-sm font-medium hover:bg-gray-800 transition-colors md:hidden"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
