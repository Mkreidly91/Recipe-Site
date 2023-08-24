import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import SignInForm from '../components/Forms/SignInForm';
import logo from '../assets/images/Tastebite.png';
const SignInPage = () => {
  return (
    <div className=" h-full flex justify-center items-center relative b-pink">
      <div className=" absolute top-0 header  w-full flex items-center justify-between py-10 px-10">
        <img src={logo} className="w-[150px]" alt="" />
        <div className="flex justify-end text-xs text-black ">
          Don't have an account?
          <Link to="/signUp" className=" cursor-pointer">
            <span className="color-orange font-medium ml-1">Sign up!</span>
          </Link>
        </div>
      </div>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
