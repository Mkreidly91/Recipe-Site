import React from 'react';

const Button = ({ text, className, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer   ${className} ${
        disabled && 'opacity-50 cursor-not-allowed'
      } `}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
