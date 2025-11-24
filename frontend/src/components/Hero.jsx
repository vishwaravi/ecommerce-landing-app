import React from 'react';

/**
 * Hero Section Component
 * Displays main hero banner with featured products
 */
const Hero = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Large Hero Banner */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-6xl font-bold text-black mb-2">
            TRIZEN
          </h2>
          <div className="inline-block bg-lime-400 px-6 py-2 text-sm md:text-base font-medium text-black">
            There's One for Everyone
          </div>
        </div>

        {/* Hero Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 mt-8">
          {/* Left Image */}
          <div className="relative group cursor-pointer overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600&h=800&fit=crop"
              alt="Shop Women"
              className="w-full h-[300px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x800/FFE5B4/000000?text=Shop+Women';
              }}
            />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold drop-shadow-lg">Shop Women</h3>
            </div>
          </div>

          {/* Center Image */}
          <div className="relative group cursor-pointer overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop"
              alt="Featured Product"
              className="w-full h-[300px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x800/E9B4D1/000000?text=Featured';
              }}
            />
          </div>

          {/* Right Image */}
          <div className="relative group cursor-pointer overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1564859228273-274232fdb516?w=600&h=800&fit=crop"
              alt="Shop Men"
              className="w-full h-[300px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x800/ADD8E6/000000?text=Shop+Men';
              }}
            />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold drop-shadow-lg">Shop Men</h3>
            </div>
          </div>
        </div>
      </div>

      {/* New Drops Section Header */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-black mb-8">
            New Drops
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Hero;
