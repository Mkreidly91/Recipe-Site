import React from 'react';

const User = ({ user, className, textStyles, imageStyles, letterStyles }) => {
  const { name } = user;
  return (
    <div className="user flex items-center gap-2">
      <div
        className={` flex justify-center items-center w-[30px] h-[30px]  p-3 rounded-full  bg-gray-300 ${imageStyles}`}
      >
        <span className={letterStyles}>
          {name ? user.name.charAt(0) : user.charAt(0)}
        </span>
      </div>
      <span className={`${textStyles}`}>{name ? user.name : user}</span>
    </div>
  );
};

export default User;
