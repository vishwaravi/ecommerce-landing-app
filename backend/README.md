# Backend README

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Configure MongoDB URI in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/ecommerce
```

4. Seed database with sample products:
```bash
npm run seed
```

5. Start development server:
```bash
npm run dev
```

Server will run on http://localhost:5000

## API Endpoints

- `GET /api/products` - Get all products (with optional filters)
- `GET /api/search?q=term` - Search products
- `GET /api/products/:id` - Get single product
- `GET /health` - Health check

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data
