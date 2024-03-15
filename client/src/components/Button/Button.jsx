import React from 'react';
import './Button.css'; 

const Button = ({ icon, text, onClick}) => {
    return (
        <button className="sue-button" onClick={onClick}>
            {icon && <span className="button-icon">{icon}</span>}
            <span>{text}</span>
        </button>
    );
}

export default Button;
