import React from 'react';
import booklogo from '../../assets/icons/books-logo.svg';

const Logo = ({ className, logoSize = 40, fontSize = 16, gap = 2 }) => {
  return (
    <div className={`flex gap-${gap} items-center ${className}`}>
      <img
        className={`w-[${logoSize}px] h-[${logoSize}px]`}
        src={booklogo}
        alt=""
      />
      <span className={`text-[${fontSize.toString()}px] `}>BookSpace</span>
    </div>
  );
};

export default Logo;
