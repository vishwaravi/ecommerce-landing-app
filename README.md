# TRIZEN - Modern E-Commerce Platform

A full-stack MERN e-commerce application with a sleek, modern design inspired by professional templates. Features a responsive layout, shopping cart functionality, advanced filtering, and smooth user experience.

## 🚀 Features

### Frontend
- **Modern UI Design**: Clean, professional interface with lime accent colors (#d4ff00) and black borders
- **Responsive Layout**: Fully optimized for mobile, tablet, and desktop devices
- **Shopping Cart**: 
  - Add/remove items with quantity management
  - Persistent cart using localStorage
  - Real-time cart badge counter
- **Advanced Filtering**:
  - Category filtering (7 categories)
  - Price range filtering
  - Sort by price (low to high, high to low)
  - Sidebar layout on desktop, modal-based on mobile
- **Smart Search**:
  - Real-time search with 300ms debounce
  - Search history tracking (last 5 searches)
  - Autosuggest functionality
  - Visible on all screen sizes
- **Product Display**:
  - 3-column grid layout on desktop
  - 2-column on mobile
  - Hover effects with Quick Add button
  - Mobile-optimized Add to Cart buttons
- **Loading States**: Minimum 1-second loading animation for smooth UX

### Backend
- **RESTful API**: Express.js backend with MongoDB
- **Product Management**: 62 products across 7 categories
- **Database**: MongoDB with Mongoose ODM
- **Query Support**: Category, price range, and sorting filters

## 📦 Product Categories

- Electronics (10 products)
- Clothing (12 products)
- Home & Kitchen (6 products)
- Books (8 products)
- Sports (10 products)
- Beauty (8 products)
- Toys (8 products)

## 🛠️ Tech Stack

### Frontend
- React 18.2.0
- Vite 5.0.8
- Tailwind CSS 3.4.0
- Axios 1.6.2
- React Icons

### Backend
- Node.js
- Express 4.18.2
- MongoDB
- Mongoose 8.0.3
- CORS
- dotenv

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ecommerce-landing-app
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecom
EOF

# Seed the database with products
node seedData.js

# Start the backend server
npm start
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

This will:
- Clear existing products
- Add 62 products across 7 categories
- Display success confirmation

## 📁 Project Structure

```
ECOM/
├── backend/
│   ├── models/
│   │   └── Product.js          # Product schema
│   ├── routes/
│   │   └── products.js         # Product API routes
│   ├── .env                    # Environment variables
│   ├── server.js               # Express server setup
│   ├── seedData.js             # Database seeding script
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx      # Navigation & search
│   │   │   ├── Hero.jsx        # Hero section
│   │   │   ├── Filters.jsx     # Sidebar/modal filters
│   │   │   ├── ProductGrid.jsx # Product grid layout
│   │   │   ├── ProductCard.jsx # Individual product card
│   │   │   └── Footer.jsx      # Footer component
│   │   ├── services/
│   │   │   └── api.js          # Axios API service
│   │   ├── App.jsx             # Main app component
│   │   ├── index.css           # Tailwind styles
│   │   └── main.jsx            # React entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Products

#### Get All Products
```http
GET /api/products
```

**Query Parameters:**
- `category` (string): Filter by category
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `sort` (string): Sort order ("price-asc" or "price-desc")

**Example:**
```http
GET /api/products?category=Electronics&minPrice=10000&maxPrice=50000&sort=price-asc
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "...",
      "name": "Product Name",
      "price": 29999,
      "category": "Electronics",
      "description": "Product description",
      "image": "image-url",
      "inStock": true
    }
  ]
}
```

#### Get Single Product
```http
GET /api/products/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Product Name",
    "price": 29999,
    "category": "Electronics",
    "description": "Product description",
    "image": "image-url",
    "inStock": true
  }
}
```

## 💡 Key Features Explained

### Cart Management
The shopping cart is managed using React state and persisted to localStorage:
- Items are stored with product details, quantity, and unique identifiers
- Cart data persists across page refreshes
- Real-time cart count displayed in header badge

### Responsive Filters
- **Desktop**: Fixed sidebar with vertical layout (264px wide)
- **Mobile/Tablet**: Horizontal buttons that open modal overlays
- Instant filter application with loading states

### Smart Loading States
- Minimum 1-second loading animation prevents glitch effects
- Uses `Promise.all` to ensure smooth transitions
- Loading spinner displays during product fetches

### Search Functionality
- Debounced search (300ms) for performance
- Stores last 5 searches in localStorage
- Autosuggest dropdown with clickable history
- Clear history option

## 🎨 Design Features

- **Color Scheme**: 
  - Primary: Lime (#d4ff00)
  - Secondary: Black borders
  - Background: White
- **Typography**: Clean, modern sans-serif
- **Spacing**: Consistent padding and margins
- **Hover Effects**: Smooth transitions on interactive elements
- **Mobile-First**: Optimized for touch interfaces

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
```

### Backend Development
```bash
cd backend
npm start            # Start server
npm run dev          # Start with nodemon (if configured)
```

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or your preferred MongoDB hosting
2. Update `MONGODB_URI` in production environment
3. Deploy to services like Heroku, Railway, or Render

### Frontend Deployment
1. Build the production version:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to Vercel, Netlify, or similar services
3. Update API base URL in `frontend/src/services/api.js` to point to production backend

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecom
```

### Frontend
Update the API base URL in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Known Issues

- None currently reported

## 🔮 Future Enhancements

- User authentication and profiles
- Order management system
- Payment gateway integration
- Product reviews and ratings
- Wishlist functionality
- Admin dashboard for product management
- Email notifications
- Advanced search with filters
- Related products suggestions

## 👨‍💻 Author

Built with ❤️ using the MERN stack

## 📞 Support

For issues, questions, or contributions, please open an issue in the repository.

---

**Happy Shopping! 🛒**
