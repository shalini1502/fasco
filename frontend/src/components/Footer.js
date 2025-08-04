import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Fasco</h3>
            <p>Your one-stop destination for trendy and comfortable clothing. Quality fashion for every occasion.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Categories</h4>
            <ul>
              <li><Link to="/products">T-Shirts</Link></li>
              <li><Link to="/products">Jackets</Link></li>
              <li><Link to="/products">Jeans</Link></li>
              <li><Link to="/products">Hoodies</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li>Email: info@fasco.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Fashion St, Style City</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Fasco. All rights reserved. developed by 
            Shalini Sharma
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 