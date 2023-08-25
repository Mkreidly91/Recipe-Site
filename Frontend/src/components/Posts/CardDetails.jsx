import React, { useState } from 'react';
import Modal from '../Common/Modal';
import back from '../../assets/icons/card/back.svg';
import shopping from '../../assets/icons/card/shopping.svg';
import share from '../../assets/icons/card/share.svg';

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
        className="h-full rounded-md"
        alt=""
      />
    );
  });

  const ingredientDisplay = ingredients.map((ingredient, index) => {
    const { name, quantity, measurement } = ingredient;
    return (
      <span key={index} className="text-sm mt-2">
        - {quantity} {measurement} {name}
      </span>
    );
  });

  const commentDisplay = allComments.map((comment, index) => {
    return (
      <div className="py-3 border-t">
        <Comment comment={comment} />
      </div>
    );
  });

  return (
    <Modal
      setShow={setShow}
      className={`w-full h-full flex flex-col justify-start gap-5 py-5 b-pink fixed overflow-y-scroll bg-white   `}
    >
      <img
        src={back}
        className=" w-[30px] left-20 cursor-pointer position absolute z-30"
        onClick={() => {
          setShow((prev) => !prev);
        }}
      />
      <div className="card-details-header flex  gap- shadow-md pb-5 ">
        <div className="flex flex-col items-start justify-center gap-8 w-[50%] pl-20">
          <div className="cuisine font-semibold py-1 px-2 b-orange text-white text-center rounded-md  text-lg">
            {cuisine}
          </div>
          <div className="title font-bold  text-5xl">{name}</div>

          <User user={user} />
          {/* Buttons Section */}
          <div className="buttons flex gap-5 items-center">
            <div className="button-icon flex gap-2 cursor-pointer items-center b-beige px-3 py-2 rounded-md">
              <Button text="Create shopping list" className="text-xs" />
              <img src={shopping} alt="" />
            </div>
            <div className="button-icon flex gap-2 cursor-pointer items-center b-beige px-3 py-2 rounded-md">
              <Button text="Share" className="text-xs" />
              <img src={share} alt="" />
            </div>
          </div>
        </div>

        {/* Images section */}
        <div className="image-preview flex flex-col gap-2 grow">
          <img
            src={currentImage}
            className="w-full h-[500px] rounded-md  "
            alt=""
          />
          <div className="allImages h-[100px]   flex flex-wrap gap-1">
            {imageDisplay}
          </div>
        </div>
      </div>

      <div className="card-details-body flex flex-col gap-10">
        {/* Ingredients Section */}
        <div className="ingredients-section flex flex-col gap-1 px-20">
          <div className="text-3xl font-bold mb-5  border-b-2 border-black pb-5 mt-3  ">
            Ingredients
          </div>
          {ingredientDisplay}
        </div>

        {/* Comments Section */}
        <div className="comments-section flex flex-col gap-3 px-20">
          <div className="text-3xl font-bold mb-5  border-b-2 border-black pb-5 mt-3  ">
            Comments
          </div>
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
