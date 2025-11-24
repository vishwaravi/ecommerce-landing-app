import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Filters from './components/Filters';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import { fetchProducts } from './services/api';

/**
 * Main App Component
 * Root component that manages the entire application state
 */
function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: null,
    maxPrice: null,
    sort: '',
  });

  /**
   * Load cart from localStorage on mount
   */
  useEffect(() => {
    const savedCart = localStorage.getItem('shopCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  /**
   * Save cart to localStorage whenever it changes
   */
  useEffect(() => {
    localStorage.setItem('shopCart', JSON.stringify(cart));
  }, [cart]);

  /**
   * Add product to cart
   */
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === product._id);
      if (existingItem) {
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  /**
   * Remove product from cart
   */
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId));
  };

  /**
   * Update product quantity in cart
   */
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  /**
   * Fetch products from API when filters or search change
   */
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Build query parameters
        const params = {};
        if (filters.category) params.category = filters.category;
        if (filters.minPrice !== null) params.minPrice = filters.minPrice;
        if (filters.maxPrice !== null) params.maxPrice = filters.maxPrice;
        if (filters.sort) params.sort = filters.sort;
        if (searchQuery.trim()) params.search = searchQuery.trim();

        const response = await fetchProducts(params);
        
        setProducts(response.data || []);
      } catch (err) {
        console.error('Error loading products:', err);
        setError(
          err.response?.data?.message ||
          'Failed to load products. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [filters, searchQuery]);

  /**
   * Handle filter changes from Filters component
   */
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with Search */}
      <Header 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Banner - Hidden on mobile */}
      <div className="hidden md:block">
        <Hero />
      </div>

      {/* Mobile Filters - Outside main content */}
      <div className="md:hidden">
        <Filters filters={filters} onFilterChange={handleFilterChange} />
      </div>

      {/* Main Content - Two Column Layout */}
      <main className="flex-grow">
        <div className="container mx-auto px-3 md:px-6 py-4 md:py-8">
          <div className="md:grid md:grid-cols-[280px_1fr] md:gap-8">
            {/* Left Column: Fixed Filter Sidebar - Desktop Only */}
            <aside className="hidden md:block">
              <div className="sticky top-24">
                <Filters filters={filters} onFilterChange={handleFilterChange} />
              </div>
            </aside>

            {/* Right Column: Products Grid - Isolated */}
            <section className="w-full">
              <ProductGrid 
                products={products} 
                loading={loading} 
                error={error}
                onAddToCart={addToCart}
              />
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}

/**
 * Scroll to Top Button Component
 * Shows button when user scrolls down
 */
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transform hover:scale-110 transition-all z-40"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
        </button>
      )}
    </>
  );
};

export default App;
