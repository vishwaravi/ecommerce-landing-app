import express from 'express';
import { 
  getProducts, 
  searchProducts, 
  getProductById 
} from '../controllers/productController.js';

const router = express.Router();

/**
 * Product Routes
 */

// GET /api/products - Get all products with optional filters
router.get('/products', getProducts);

// GET /api/search?q=term - Search products with autosuggest
router.get('/search', searchProducts);

// GET /api/products/:id - Get single product by ID
router.get('/products/:id', getProductById);

export default router;
