const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Sample data - In a real app, this would come from a database
const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 2499,
    category: "T-Shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    description: "Premium cotton classic white t-shirt perfect for everyday wear.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray"],
    inStock: true
  },
  {
    id: 2,
    name: "Denim Jacket",
    price: 7499,
    category: "Jackets",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400",
    description: "Vintage-style denim jacket with modern comfort and style.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black"],
    inStock: true
  },
  {
    id: 3,
    name: "Slim Fit Jeans",
    price: 4999,
    category: "Jeans",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    description: "Comfortable slim fit jeans with stretch technology.",
    sizes: ["30", "32", "34", "36"],
    colors: ["Blue", "Black", "Gray"],
    inStock: true
  },
  {
    id: 4,
    name: "Casual Hoodie",
    price: 4199,
    category: "Hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
    description: "Warm and comfortable hoodie perfect for casual outings.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gray", "Black", "Navy"],
    inStock: true
  },
  {
    id: 5,
    name: "Formal Shirt",
    price: 6699,
    category: "Shirts",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
    description: "Professional formal shirt suitable for office and special occasions.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Blue", "Pink"],
    inStock: true
  },
  {
    id: 6,
    name: "Summer Dress",
    price: 5899,
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
    description: "Light and breezy summer dress perfect for warm weather.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Floral", "Blue", "Pink"],
    inStock: true
  }
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment: "Amazing quality clothing! The fit is perfect and the material is so comfortable."
  },
  {
    id: 2,
    name: "Mike Chen",
    rating: 5,
    comment: "Great customer service and fast delivery. Will definitely shop here again!"
  },
  {
    id: 3,
    name: "Emily Davis",
    rating: 4,
    comment: "Love the variety of styles available. The prices are reasonable too."
  }
];

// Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

app.get('/api/testimonials', (req, res) => {
  res.json(testimonials);
});

// Cart endpoints (simple in-memory storage for demo)
let cart = [];

app.get('/api/cart', (req, res) => {
  res.json(cart);
});

app.post('/api/cart', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      }
    });
  }
  
  res.json(cart);
});

app.put('/api/cart/:productId', (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  
  const item = cart.find(item => item.productId === parseInt(productId));
  
  if (!item) {
    return res.status(404).json({ message: 'Item not found in cart' });
  }
  
  if (quantity <= 0) {
    cart = cart.filter(item => item.productId !== parseInt(productId));
  } else {
    item.quantity = quantity;
  }
  
  res.json(cart);
});

app.delete('/api/cart/:productId', (req, res) => {
  const { productId } = req.params;
  cart = cart.filter(item => item.productId !== parseInt(productId));
  res.json(cart);
});

app.delete('/api/cart', (req, res) => {
  cart = [];
  res.json(cart);
});

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// For Vercel deployment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app; 