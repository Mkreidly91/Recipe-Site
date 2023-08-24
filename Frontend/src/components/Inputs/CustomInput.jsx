import React from 'react';

const CustomInput = ({
  name,
  label,
  value,
  onChange,
  type = 'text',
  className,
  labelStyles,
  error,
  placeholder,
  onFocus,
  onBlur,
}) => {
  return (
    <div
      className={`input-container flex flex-col gap-1 font-normal ${labelStyles}`}
    >
      <label className="block  tracking-wide text-xs font-medium rounded-md ">
        {label}
      </label>
      <input
        name={name}
        value={value}
        className={`appearance-none border-b  px-3   h-[50px] leading-tight focus:outline-none placeholder:text-xs placeholder:font-normal placeholder:text-gray-400   ${
          error && 'border-red-500'
        } ${className}`}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

export default CustomInput;
{
  /* <div className="input-container flex flex-col gap-2 font-normal">
<label className="block uppercase tracking-wide text-gray-500 text-xs font-medium rounded-md ">
  {label}
</label>
<input
  name={name}
  value={value}
  className={`appearance-none border py-2 px-3 text-gray-400 h-[60px] leading-tight focus:outline-none placeholder:text-xs placeholder:font-normal placeholder:text-gray-300  rounded-md ${
    error && 'border-red-500'
  } ${className}`}
  type={type}
  onChange={onChange}
  placeholder={placeholder}
  onFocus={onFocus}
  onBlur={onBlur}
/>
</div> */
}
