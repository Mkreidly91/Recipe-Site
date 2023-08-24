import React from 'react';
import User from './user';

const Comment = ({ comment }) => {
  const { comment: text, user } = comment;
  return (
    <div className="flex flex-col gap-3">
      <User textStyles={'text-sm  font-medium'} user={user} />
      <span className="text-xs">{text}</span>
    </div>
  );
};

export default Comment;
