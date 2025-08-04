import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cart, updateCartItem, removeFromCart, clearCart, getCartTotal }) => {
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartItem(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    alert('Thank you for your purchase! This is a demo application.');
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="container">
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Link to="/products" className="btn btn-primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Shopping Cart</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.productId} className="cart-item card">
                <div className="cart-item-image">
                  <img src={item.product.image} alt={item.product.name} />
                </div>
                
                <div className="cart-item-info">
                  <h3>{item.product.name}</h3>
                  <p className="cart-item-price">₹{item.product.price}</p>
                </div>
                
                <div className="cart-item-quantity">
                  <label>Quantity:</label>
                  <select 
                    value={item.quantity} 
                    onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                  >
                    {[0, 1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>
                        {num === 0 ? 'Remove' : num}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="cart-item-total">
                  <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
                
                <button 
                  className="btn btn-danger remove-btn"
                  onClick={() => removeFromCart(item.productId)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary card">
            <h3>Order Summary</h3>
            
            <div className="summary-item">
              <span>Subtotal:</span>
              <span>₹{getCartTotal().toFixed(2)}</span>
            </div>
            
            <div className="summary-item">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            
            <div className="summary-item total">
              <span>Total:</span>
              <span>₹{getCartTotal().toFixed(2)}</span>
            </div>
            
            <div className="cart-actions">
              <button 
                className="btn btn-primary checkout-btn"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              
              <button 
                className="btn btn-secondary"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              
              <Link to="/products" className="btn btn-secondary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 