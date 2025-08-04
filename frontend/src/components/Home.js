import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import TestimonialCard from './TestimonialCard';
import './Home.css';

const Home = ({ products, addToCart }) => {
  const featuredProducts = products.slice(0, 4);
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

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Discover Your Style</h1>
            <p>Explore our collection of trendy and comfortable clothing for every occasion.</p>
            <Link to="/products" className="btn btn-primary">Shop Now</Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="grid grid-4">
            {featuredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                addToCart={addToCart}
              />
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '2rem' }}>
            <Link to="/products" className="btn btn-secondary">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="grid grid-3">
            {testimonials.map(testimonial => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 