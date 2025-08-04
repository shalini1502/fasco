# E-Commerce Clothing Website

A full-stack e-commerce clothing website built with React frontend and Node.js backend.

## Features

- Product catalog with categories
- Product details with size and color selection
- Shopping cart functionality
- Responsive design
- Customer testimonials

## Tech Stack

- **Frontend**: React, React Router, CSS3
- **Backend**: Node.js, Express.js
- **Deployment**: Vercel

## Local Development

1. Install dependencies:
   ```bash
   npm run install-all
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

3. Follow the prompts to configure your deployment.

## Project Structure

```
fasco/
├── backend/
│   └── server.js          # Express server with API routes
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/    # React components
│       ├── App.js         # Main App component
│       └── index.js       # Entry point
├── package.json           # Root package.json
├── vercel.json           # Vercel configuration
└── README.md
```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/testimonials` - Get customer testimonials
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:productId` - Update cart item
- `DELETE /api/cart/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

Made by Shalini Sharma
