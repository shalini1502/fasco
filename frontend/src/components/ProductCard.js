import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    setQuantity(1);
  };

  return (
    <div className="product-card card">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
        />
      </Link>
      
      <div className="product-info">
        <Link to={`/product/${product.id}`} className="product-title">
          <h3>{product.name}</h3>
        </Link>
        
        <p className="product-category">{product.category}</p>
        
        <div className="product-price">
          <span className="price">₹{product.price}</span>
        </div>
        
        <div className="product-actions">
          <div className="quantity-selector">
            <label htmlFor={`quantity-${product.id}`}>Qty:</label>
            <select 
              id={`quantity-${product.id}`}
              value={quantity} 
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          
          <button 
            className="btn btn-primary add-to-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 