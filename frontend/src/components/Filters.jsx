import React, { useState } from 'react';

/**
 * Filters Component
 * Provides category and price range filtering options
 */
const Filters = ({ filters, onFilterChange }) => {
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const categories = [
    'All',
    'Electronics',
    'Clothing',
    'Home & Kitchen',
    'Books',
    'Sports',
    'Beauty',
    'Toys',
  ];

  const priceRanges = [
    { label: 'All Prices', min: null, max: null },
    { label: 'Under ₹5,000', min: 0, max: 5000 },
    { label: '₹5,000 - ₹15,000', min: 5000, max: 15000 },
    { label: '₹15,000 - ₹50,000', min: 15000, max: 50000 },
    { label: '₹50,000+', min: 50000, max: null },
  ];

  const handleCategoryChange = (category) => {
    onFilterChange({
      ...filters,
      category: category === 'All' ? '' : category,
    });
  };

  const handlePriceRangeChange = (range) => {
    onFilterChange({
      ...filters,
      minPrice: range.min,
      maxPrice: range.max,
    });
  };

  const handleSortChange = (sortValue) => {
    onFilterChange({
      ...filters,
      sort: sortValue,
    });
    setShowSortModal(false);
  };

  return (
    <>
      {/* Mobile: Horizontal Sort/Filter Bar */}
      <div className="md:hidden bg-white border-t border-b border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between gap-2">
          <button 
            onClick={() => setShowSortModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 border border-black text-sm font-medium hover:bg-black hover:text-white transition-colors flex-1 justify-center"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            Sort
          </button>
          <button 
            onClick={() => setShowFilterModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 border border-black text-sm font-medium hover:bg-black hover:text-white transition-colors flex-1 justify-center"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>
      </div>

      {/* Desktop: Sidebar Filters */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
        <h3 className="text-xl font-bold text-black mb-6">Filters</h3>
        
        {/* Category Filter */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-900 mb-4">
            Category
          </label>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  (filters.category === category) ||
                  (filters.category === '' && category === 'All')
                    ? 'bg-black text-white font-medium'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-900 mb-4">
            Price Range
          </label>
          <div className="space-y-2">
            {priceRanges.map((range, index) => (
              <label key={index} className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="priceRange"
                  checked={
                    filters.minPrice === range.min &&
                    filters.maxPrice === range.max
                  }
                  onChange={() => handlePriceRangeChange(range)}
                  className="w-4 h-4 text-black focus:ring-black"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-black">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-4">
            Sort By
          </label>
          <select
            value={filters.sort || ''}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black bg-white text-gray-700"
          >
            <option value="">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Sort Modal (Mobile) */}
      {showSortModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden" onClick={() => setShowSortModal(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Sort By</h3>
              <button onClick={() => setShowSortModal(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => handleSortChange('')}
                className={`w-full text-left px-4 py-3 rounded-lg ${filters.sort === '' ? 'bg-primary-50 text-primary-700 font-medium' : 'hover:bg-gray-50'}`}
              >
                Newest First
              </button>
              <button
                onClick={() => handleSortChange('price-asc')}
                className={`w-full text-left px-4 py-3 rounded-lg ${filters.sort === 'price-asc' ? 'bg-primary-50 text-primary-700 font-medium' : 'hover:bg-gray-50'}`}
              >
                Price: Low to High
              </button>
              <button
                onClick={() => handleSortChange('price-desc')}
                className={`w-full text-left px-4 py-3 rounded-lg ${filters.sort === 'price-desc' ? 'bg-primary-50 text-primary-700 font-medium' : 'hover:bg-gray-50'}`}
              >
                Price: High to Low
              </button>
              <button
                onClick={() => handleSortChange('rating')}
                className={`w-full text-left px-4 py-3 rounded-lg ${filters.sort === 'rating' ? 'bg-primary-50 text-primary-700 font-medium' : 'hover:bg-gray-50'}`}
              >
                Highest Rated
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal (Mobile) */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden" onClick={() => setShowFilterModal(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Filters</h3>
              <button onClick={() => setShowFilterModal(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      (filters.category === category) ||
                      (filters.category === '' && category === 'All')
                        ? 'bg-black text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Price Range
              </label>
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <label key={index} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={
                        filters.minPrice === range.min &&
                        filters.maxPrice === range.max
                      }
                      onChange={() => handlePriceRangeChange(range)}
                      className="w-4 h-4 text-black focus:ring-black"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {range.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => setShowFilterModal(false)}
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Filters;
