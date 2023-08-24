import React from 'react';

const CustomSelect = ({
  name,
  label,
  value,
  onChange,
  className,
  placeholder,
  onFocus,
  onBlur,
  options,
}) => {
  return (
    <div className="input-container flex flex-col gap-1 font-normal">
      <label className="block  tracking-wides text-xs font-medium rounded-md ">
        {label}
      </label>
      <select
        name={name}
        value={value}
        className={`appearance-none border-b  px-3 h-[50px] leading-tight focus:outline-none placeholder:text-xs placeholder:font-normal placeholder:text-gray-300   
         ${className}`}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <option className="" value="">
          unit
        </option>
        {options &&
          options.map((e, index) => (
            <option value={e.id} key={index}>
              {e.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default CustomSelect;
