import React from 'react';
import './Card.css';

const Card = ({ value, text, color, size, fontsize, vFontsize, borderRadius}) => {
  return (
    <div className="card" style={{ backgroundColor: color, width: size, borderRadius: borderRadius}}>
      <div className="card-text" style={{fontSize:fontsize}}>{text}</div>
      <div className="card-value" style={{fontSize:vFontsize}}>
        {value}
      </div>
    </div>
  );
};

export default Card;