import Product from '../models/Product.js';

/**
 * @desc    Get all products with optional filtering
 * @route   GET /api/products
 * @access  Public
 * @query   category - Filter by category (optional)
 * @query   minPrice - Minimum price filter (optional)
 * @query   maxPrice - Maximum price filter (optional)
 * @query   sort - Sort order: 'price-asc', 'price-desc', 'rating' (optional)
 */
export const getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sort, search } = req.query;
    
    // Build filter object
    let filter = {};
    
    // Add search filter if provided
    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { category: searchRegex }
      ];
    }
    
    if (category) {
      filter.category = category;
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    // Build sort object
    let sortOption = {};
    switch (sort) {
      case 'price-asc':
        sortOption.price = 1;
        break;
      case 'price-desc':
        sortOption.price = -1;
        break;
      case 'rating':
        sortOption.rating = -1;
        break;
      default:
        sortOption.createdAt = -1; // Default: newest first
    }
    
    const products = await Product.find(filter).sort(sortOption);
    
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
    
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products',
      error: error.message,
    });
  }
};

/**
 * @desc    Search products by name (with autosuggest support)
 * @route   GET /api/search
 * @access  Public
 * @query   q - Search term (required)
 */
export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }
    
    // Case-insensitive partial match search
    // Using regex for flexible matching
    const searchRegex = new RegExp(q.trim(), 'i');
    
    const products = await Product.find({
      name: searchRegex,
    })
      .select('name category price rating image') // Return only necessary fields
      .limit(5) // Return maximum 5 suggestions
      .sort({ rating: -1 }); // Prioritize higher-rated products
    
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
    
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while searching products',
      error: error.message,
    });
  }
};

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: product,
    });
    
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching product',
      error: error.message,
    });
  }
};
