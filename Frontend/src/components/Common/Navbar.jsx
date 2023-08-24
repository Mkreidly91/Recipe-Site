import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/Tastebite.png';
import Button from './Button';

const Navbar = () => {
  return (
    <div className="nav">
      <div className="yello bg-yellow-400 h-[30px]"></div>
      <nav className="py-[34px] px-[77px] flex items-center justify-between shadow-md">
        <img className="w-[160px]" src={logo} alt="" />
        <div className="flex gap-5">
          <Link to="/main">
            <Button text="RECIPES" />
          </Link>

          <Link to="">
            <Button text="SHOPPING" />
          </Link>

          <Link to="">
            <Button text="MEAL PLAN" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
