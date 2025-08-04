# StyleStore - E-commerce Clothing Website

A modern, responsive e-commerce clothing website built with React.js frontend and Node.js/Express.js backend.

## Features

### Frontend
- **Landing Page** with hero section, featured products, and testimonials
- **Product Catalog** with filtering and sorting options
- **Product Detail Pages** with size/color selection
- **Shopping Cart** with add/remove functionality and checkout
- **Responsive Design** that works on all devices
- **Modern UI** with smooth animations and transitions

### Backend
- **RESTful API** for products and cart management
- **Express.js Server** with CORS support
- **Sample Product Data** with realistic clothing items
- **Cart Management** with in-memory storage (demo)

## Project Structure

```
e-commerce-clothing/
├── backend/
│   └── server.js          # Express server with API endpoints
├── frontend/
│   ├── public/
│   │   └── index.html     # Main HTML file
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Navbar.js
│   │   │   ├── Home.js
│   │   │   ├── Products.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── Cart.js
│   │   │   ├── Footer.js
│   │   │   ├── ProductCard.js
│   │   │   └── TestimonialCard.js
│   │   ├── App.js         # Main React component
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Global styles
│   └── package.json       # Frontend dependencies
├── package.json           # Root package.json
└── README.md             # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Quick Start

1. **Clone or download the project files**

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   npm run install-client
   ```

3. **Start the development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   ```

   This will start:
   - Backend server on `http://localhost:5000`
   - Frontend React app on `http://localhost:3000`

### Alternative Setup

If you prefer to run servers separately:

```bash
# Terminal 1 - Start backend
npm run server

# Terminal 2 - Start frontend
npm run client
```

## Usage

### Navigation
- **Home**: Landing page with hero section and featured products
- **Products**: Browse all products with filtering options
- **Product Details**: Click on any product to view details
- **Cart**: View cart, modify quantities, and checkout

### Shopping Features
- **Add to Cart**: Select quantity and add products
- **Cart Management**: Update quantities or remove items
- **Checkout**: Demo checkout process (shows success message)
- **Filtering**: Filter by category and sort by price/name

### Responsive Design
The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get specific product

### Cart
- `GET /api/cart` - Get cart contents
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:productId` - Update item quantity
- `DELETE /api/cart/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Testimonials
- `GET /api/testimonials` - Get customer testimonials

## Customization

### Adding Products
Edit the `products` array in `backend/server.js` to add new products:

```javascript
const products = [
  {
    id: 7,
    name: "New Product",
    price: 99.99,
    category: "New Category",
    image: "https://example.com/image.jpg",
    description: "Product description",
    sizes: ["S", "M", "L"],
    colors: ["Red", "Blue"],
    inStock: true
  }
];
```

### Styling
- Global styles: `frontend/src/index.css`
- Component-specific styles: Each component has its own `.css` file
- Color scheme: Primary blue `#007bff`, can be customized

### Database Integration
Currently uses in-memory storage. To integrate with a database:
1. Install database driver (MongoDB, PostgreSQL, etc.)
2. Replace in-memory arrays with database queries
3. Add proper error handling and validation

## Technologies Used

### Frontend
- **React.js** - UI framework
- **React Router** - Navigation
- **CSS3** - Styling with responsive design
- **Fetch API** - HTTP requests

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## Development

### Available Scripts
- `npm start` - Start production server
- `npm run server` - Start backend development server
- `npm run client` - Start frontend development server
- `npm run dev` - Start both servers concurrently
- `npm run build` - Build frontend for production

### Code Structure
- **Components**: Modular React components
- **CSS**: Component-scoped stylesheets
- **API**: RESTful endpoints in Express
- **Routing**: Client-side routing with React Router

## Deployment

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy the `frontend/build` folder to your hosting service

### Backend Deployment
1. Set environment variables (PORT, etc.)
2. Deploy to Node.js hosting (Heroku, Vercel, etc.)

## License

This project is for educational purposes. Feel free to modify and use as needed.

## Support

For questions or issues, please check the code comments or create an issue in the repository. 