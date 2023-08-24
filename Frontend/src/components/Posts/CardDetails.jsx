import React, { useState } from 'react';
import Modal from '../Common/Modal';
import cross from '../../assets/icons/card/cross.svg';

import TextArea from '../Inputs/TextArea';
import User from './user';
import Comment from './Comment';
import Button from '../Common/Button';

import { postComment } from '../../helpers/user.helpers';
import { replaceObjectById } from '../../helpers/helpers';

const CardDetails = ({ setShow, className, recipe, setAllRecipes }) => {
  const {
    id,
    comments,
    cuisine,
    images,
    ingredients,
    isLiked,
    likes,
    name,
    user,
  } = recipe;

  const [currentImage, setCurrentImage] = useState(images[0].image);
  const [allComments, setAllComments] = useState(comments);
  const [text, setText] = useState('');

  console.log(allComments);

  function changeHandler(e) {
    const { value } = e.target;
    setText(value);
  }

  async function postHandler() {
    if (!text.trim()) return;
    const res = await postComment({ comment: text, recipeId: id });
    setAllComments((prev) => [res.comment, ...prev]);
    setAllRecipes((prev) => {
      const newState = prev.map((e) => {
        if (e.id === id) {
          return { ...e, comments: [res.comment, ...e.comments] };
        }
        return e;
      });
      return newState;
    });
  }
  const imageDisplay = images.map((image, index) => {
    const { image: image64 } = image;
    return (
      <img
        key={index}
        onClick={(e) => {
          setCurrentImage(image64);
        }}
        src={image64}
        className="h-full"
        alt=""
      />
    );
  });

  const ingredientDisplay = ingredients.map((ingredient, index) => {
    const { name, quantity, measurement } = ingredient;
    return (
      <span key={index} className="text-xs">
        - {quantity} {measurement} {name}
      </span>
    );
  });

  const commentDisplay = allComments.map((comment, index) => {
    return <Comment comment={comment} />;
  });

  return (
    <Modal
      setShow={setShow}
      className={`w-full h-full flex flex-col justify-start gap-5 p-5 b-pink fixed overflow-y-scroll   `}
    >
      <div className="card-details-header flex flex-col gap-3 ">
        <div className="flex items-center justify-between">
          <div className="title font-bold  text-5xl">{name}</div>
          <img
            src={cross}
            className="cursor-pointer"
            onClick={() => {
              setShow((prev) => !prev);
            }}
          />
        </div>
        <User user={user} />
      </div>

      <div className="card-details-body flex flex-col gap-10">
        {/* Images section */}
        <div className="image-preview">
          <img src={currentImage} className="w-full h-[500px] " alt="" />
        </div>
        <div className="allImages h-[200px]   flex flex-wrap gap-1">
          {imageDisplay}
        </div>

        {/* Ingredients Section */}
        <div className="ingredients-section flex flex-col gap-1">
          <span className="text-2xl font-semibold mb-5">Ingredients</span>
          {ingredientDisplay}
        </div>

        {/* Comments Section */}
        <div className="comments-section flex flex-col gap-3">
          <span className="text-2xl font-semibold mb-5">Comments</span>
          <TextArea
            placeholder="Comment on this recipe"
            className="h-[100px]"
            onChange={changeHandler}
          />
          <Button
            onClick={() => {
              postHandler();
            }}
            text="Post comment"
            className="text-white bg-orange-500 w-fit text-xs py-3 px-2 rounded-lg self-end"
          />
          <div className="allComments flex flex-col gap-5">
            {commentDisplay}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CardDetails;