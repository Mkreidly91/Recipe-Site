import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import logo from '../assets/images/Tastebite.png';
import SignUpForm from '../components/Forms/SignUpForm';
const SignUpPage = () => {
  return (
    <div className=" h-full flex justify-center items-center relative b-pink">
      <div className=" absolute top-0 header  w-full flex items-center justify-between py-10 px-10">
        <img src={logo} className="w-[150px]" alt="" />
        <div className="flex justify-end text-xs text-black ">
          Have an account?
          <Link to="/" className=" cursor-pointer">
            <span className="color-orange font-medium ml-1">Sign in!</span>
          </Link>
        </div>
      </div>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
