import React, { useState } from 'react';
import CustomInput from '../Inputs/CustomInput';
import { logIn } from '../../helpers/auth.helpers';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Common/Button';

const initialState = {
  email: '',
  password: '',
};

const SignInForm = ({ setShow, className }) => {
  const [inputState, setInputState] = useState(initialState);
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  function onChange(e) {
    const { value, name } = e.target;
    setInputState((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSignIn() {
    const { data, message, errorMessages } = await logIn(inputState);
    if (errorMessages) {
      setErrors(errorMessages[0]);
      return;
    } else if (message) {
      setErrors(message);
      return;
    }
    if (data) {
      setErrors('');
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/main');
    }
  }

  const { email, password } = inputState;
  return (
    <div className={` w-fit flex flex-col items-center  ${className}`}>
      <div className="form-header  flex flex-col gap-3 w-fit text-center  p-6 rounded-t-2xl bg-cyan-dark ">
        <span className="font-semibold text-4xl">Welcome Back</span>
        <span className="font-normal">Log into your account</span>
      </div>
      <div className="form-container flex flex-col gap-5 p-6 pb-0 ">
        <CustomInput
          label="Email"
          name="email"
          type="text"
          onChange={onChange}
          value={email}
          className={'w-[300px] text-black'}
          labelStyle={{ color: 'white' }}
          placeholder="Email"
        />
        <CustomInput
          label="password"
          name="password"
          type="password"
          onChange={onChange}
          value={password}
          className={'w-[300px]  text-black '}
          placeholder="Password"
        />
      </div>
      <div className="error font-light text-red-700 text-xs min-h-[14px] mt-2">
        {errors}
      </div>

      <Button
        text="Log In"
        onClick={() => handleSignIn()}
        className="sign-in  py-2 mt-5   text-center text-normal text-black font-light rounded-md border border-solid border-black cursor-pointer w-[300px] "
      />
    </div>
  );
};

export default SignInForm;
