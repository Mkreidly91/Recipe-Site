import React from 'react';

const TextArea = ({
  name,
  label,
  value,
  onChange,
  rows,
  cols,
  className,
  placeholder,
}) => {
  return (
    <div className="input-container flex flex-col gap-2 font-normal">
      <label className="block uppercase tracking-wide text-gray-500 text-xs font-medium rounded-md ">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        rows={rows}
        cols={cols}
        className={`appearance-none border py-2 px-3 text-gray-400 h-[60px] leading-tight focus:outline-none placeholder:text-md placeholder:font-normal placeholder:text-gray-300  rounded-md  ${className}`}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextArea;

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
  } ${className}`} */
}
