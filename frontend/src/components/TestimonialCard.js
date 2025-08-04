import React from 'react';
import './TestimonialCard.css';

const TestimonialCard = ({ testimonial }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={`star ${index < rating ? 'filled' : ''}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="testimonial-card card">
      <div className="testimonial-content">
        <div className="stars">
          {renderStars(testimonial.rating)}
        </div>
        <p className="testimonial-comment">"{testimonial.comment}"</p>
        <div className="testimonial-author">
          <strong>{testimonial.name}</strong>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard; 