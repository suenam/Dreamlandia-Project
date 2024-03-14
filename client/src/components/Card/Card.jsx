import React from 'react';
import './Card.css';

const Card = ({ value, text, color, textAlign, fs}) => {
  return (
    <div className="card" style={{ backgroundColor: color }}>
      <div className="card-text">{text}</div>
      <div className="card-value" style={{ textAlign: textAlign, fontSize: fs }}>
        {value}
      </div>
    </div>
  );
};

export default Card;