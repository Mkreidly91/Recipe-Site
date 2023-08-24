import React, { useState } from 'react';

import { register } from '../../helpers/auth.helpers';
import CustomInput from '../Inputs/CustomInput';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Common/Button';

const initialState = {
  name: '',
  email: '',
  password: '',
};

const SignUpForm = ({ className }) => {
  const [inputState, setInputState] = useState(initialState);
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  console.log(errors);

  function onChange(e) {
    const { value, name } = e.target;
    setInputState((prev) => ({ ...prev, [name]: value }));
  }

  async function handlesignUp() {
    const { data, message, errorMessages } = await register(inputState);
    if (errorMessages) {
      setErrors(errorMessages[0]);
      return;
    } else if (message) {
      setErrors(message);
      return;
    }
    if (data) {
      setErrors('');
      navigate('/');
    }
  }

  const { name, email, password } = inputState;
  return (
    <div className={` w-fit flex flex-col items-center   ${className}`}>
      <div className="form-header  flex flex-col gap-3 w-fit text-center   rounded-t-2xl  ">
        <span className="font-semibold text-4xl">
          Get Started With TasteBite
        </span>
        <span className="font-normal">
          Discover recipes, connect with people
        </span>
      </div>
      <div className="signUp-container flex flex-col items-center gap-3 insta-border  h-fit p-10">
        <div className="form-container flex flex-col gap-5">
          <CustomInput
            label="Full Name"
            name="name"
            type="text"
            onChange={onChange}
            value={name}
            className={'w-[300px] text-black'}
            placeholder="Full Name"
          />

          <CustomInput
            label="Email"
            name="email"
            type="email"
            onChange={onChange}
            value={email}
            className={'w-[300px] text-black'}
            placeholder="Email"
          />
          <CustomInput
            label="password"
            name="password"
            type="password"
            onChange={onChange}
            value={password}
            className={'w-[300px] text-black'}
            placeholder="Password"
          />
        </div>
        <div className="error font-light text-red-700 text-xs min-h-[14px] mt-2">
          {errors}
        </div>
        <Button
          text="Create Account"
          onClick={() => handlesignUp()}
          className="sign-in  py-2   text-center text-normal text-white font-light rounded-md  b-orange  cursor-pointer w-[300px] "
        />
      </div>
    </div>
  );
};

export default SignUpForm;
