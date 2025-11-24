import React, { useState, useEffect, useRef } from 'react';
import { searchProducts } from '../services/api';
import { useDebounce, useClickOutside } from '../hooks/useDebounce';

const SEARCH_HISTORY_KEY = 'shopHub_searchHistory';
const MAX_HISTORY_ITEMS = 5;

/**
 * Header Component with Search Bar, Autosuggest, and Search History
 * Displays navigation and search functionality with dropdown suggestions
 */
const Header = ({ cartCount = 0 }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  
  // Debounce search query to avoid excessive API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  // Handle click outside to close suggestions
  const searchRef = useClickOutside(() => {
    setShowSuggestions(false);
    setShowHistory(false);
  });

  /**
   * Load search history from localStorage on mount
   */
  useEffect(() => {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  /**
   * Save search term to history
   */
  const saveToHistory = (term) => {
    if (!term.trim()) return;
    
    let history = [...searchHistory];
    
    // Remove if already exists
    history = history.filter(item => item.toLowerCase() !== term.toLowerCase());
    
    // Add to beginning
    history.unshift(term);
    
    // Limit history size
    history = history.slice(0, MAX_HISTORY_ITEMS);
    
    setSearchHistory(history);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
  };

  /**
   * Clear search history
   */
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  };

  /**
   * Remove single item from history
   */
  const removeFromHistory = (term) => {
    const history = searchHistory.filter(item => item !== term);
    setSearchHistory(history);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
  };

  /**
   * Fetch search suggestions when debounced query changes
   */
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearchQuery.trim() === '') {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setIsSearching(true);
      setShowHistory(false);
      try {
        const response = await searchProducts(debouncedSearchQuery);
        setSuggestions(response.data || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Search error:', error);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    };

    fetchSuggestions();
  }, [debouncedSearchQuery]);

  /**
   * Handle suggestion click - autofill search bar and save to history
   */
  const handleSuggestionClick = (productName) => {
    setSearchQuery(productName);
    saveToHistory(productName);
    setShowSuggestions(false);
    setShowHistory(false);
  };

  /**
   * Handle history item click
   */
  const handleHistoryClick = (term) => {
    setSearchQuery(term);
    setShowHistory(false);
  };

  /**
   * Handle search input change
   */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  /**
   * Handle search input focus
   */
  const handleSearchFocus = () => {
    if (searchQuery.trim() === '' && searchHistory.length > 0) {
      setShowHistory(true);
      setShowSuggestions(false);
    }
  };

  /**
   * Handle Enter key press to save search
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      saveToHistory(searchQuery);
      setShowSuggestions(false);
      setShowHistory(false);
    }
  };

  return (
    <>
      {/* Promo Banner */}
      <div className="bg-black text-white text-center py-2 px-4">
        <p className="text-xs md:text-sm">
          Sale is on! 25% off sitewide using TEES25 at checkout
        </p>
      </div>

      {/* Main Header */}
      <header className="bg-white sticky top-0 z-[100] border-b-2 border-black">
        <div className="flex items-center">
          {/* Logo Section with Lime Background */}
          <div className="bg-lime-400 px-6 md:px-12 py-4 md:py-6 border-r-2 border-black">
            <h1 className="text-xl md:text-2xl font-bold text-black whitespace-nowrap">
              TRIZEN
            </h1>
          </div>

          {/* Navigation and Actions */}
          <div className="flex-1 flex items-center justify-between px-4 md:px-8 py-3">
            {/* Search Bar - Visible on all screens */}
            <div className="relative flex-1 max-w-sm mr-4 md:mr-8" ref={searchRef}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-400 transition-colors bg-white"
                  aria-label="Search products"
                />
              
              {/* Search Icon */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {isSearching ? (
                  <div className="animate-spin h-5 w-5 border-2 border-primary-500 border-t-transparent rounded-full"></div>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                )}
              </div>
            </div>

            {/* Search History Dropdown */}
            {showHistory && searchHistory.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto animate-slide-down z-[110]">
                <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-50">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs font-semibold text-gray-600">Recent Searches</span>
                  </div>
                  <button 
                    onClick={clearHistory}
                    className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Clear All
                  </button>
                </div>
                {searchHistory.map((term, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b last:border-b-0 group"
                  >
                    <div 
                      onClick={() => handleHistoryClick(term)}
                      className="flex items-center gap-3 flex-1"
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <p className="text-sm text-gray-700">{term}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromHistory(term);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded"
                      aria-label="Remove from history"
                    >
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Product Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto animate-slide-down z-[110]">
                <div className="px-4 py-2 border-b bg-gray-50">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span className="text-xs font-semibold text-gray-600">
                      Suggestions ({suggestions.length})
                    </span>
                  </div>
                </div>
                {suggestions.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => handleSuggestionClick(product.name)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b last:border-b-0"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/50';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm truncate">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-500">{product.category}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                          <span className="text-xs text-gray-500">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold text-primary-600 text-sm whitespace-nowrap">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                      {product.inStock ? (
                        <span className="hidden lg:inline-block text-xs text-green-600">In Stock</span>
                      ) : (
                        <span className="hidden lg:inline-block text-xs text-red-600">Out of Stock</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results Message */}
            {showSuggestions && suggestions.length === 0 && debouncedSearchQuery && !isSearching && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 animate-slide-down z-[110]">
                <p className="text-gray-500 text-sm text-center">
                  No products found for "{debouncedSearchQuery}"
                </p>
              </div>
            )}
          </div>

            {/* Center Navigation Links - Hidden on mobile */}
            <nav className="hidden md:flex items-center gap-6 md:gap-12 flex-1 justify-center">
              <a href="#" className="text-sm md:text-base font-medium text-gray-800 hover:text-black transition-colors">
                New
              </a>
              <a href="#" className="text-sm md:text-base font-medium text-gray-800 hover:text-black transition-colors">
                Women
              </a>
              <a href="#" className="text-sm md:text-base font-medium text-gray-800 hover:text-black transition-colors">
                Men
              </a>
            </nav>

            {/* Right Side - Log In & Cart */}
            <div className="flex items-center gap-3 md:gap-4">
              <button className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-black transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="hidden lg:inline">Log In</span>
              </button>
              <button className="relative">
                <svg className="w-6 h-6 text-gray-800 hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
