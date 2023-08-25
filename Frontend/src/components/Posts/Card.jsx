import React, { useEffect, useLayoutEffect, useState } from 'react';
import Button from '../Common/Button';
import like from '../../assets/icons/card/like.svg';
import liked from '../../assets/icons/card/liked.svg';
import commentImg from '../../assets/icons/card/comments.svg';
import CardDetails from './CardDetails';
import User from './user';
import { likeRecipe } from '../../helpers/user.helpers';

const Card = ({ recipe, setAllRecipes }) => {
  const [show, setShow] = useState(false);

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

  const [likeState, setLikeState] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const { image: firstImage } = images[0] || '';

  return (
    <>
      {show && (
        <CardDetails
          recipe={recipe}
          setShow={setShow}
          setAllRecipes={setAllRecipes}
        />
      )}
      <div
        onClick={() => setShow(true)}
        className="flex flex-col gap-2 border shadow-md rounded-lg w-[300px]  cursor-pointer hover:bg-slate-100"
      >
        <div className="card-header flex flex-col gap-1  p-2 ">
          <span className="b-orange w-fit min-w-[50px] text-white text-xs text-center rounded-md py-1 px-2">
            {cuisine}
          </span>
          <span className="font-bold  text-2xl">{name}</span>
        </div>

        <div className="img-contianer w-full h-[300px]">
          <img src={firstImage} className="w-full h-full" alt="" />
        </div>

        <div className="flex justify-between p-2">
          {/* user */}
          <User textStyles="text-xs font-semibold" user={user} />

          {/* likes and comments */}
          <div className="flex items-center justify-end gap-4">
            <div className="flex items-center gap-1">
              <img
                onClick={async (e) => {
                  e.stopPropagation();
                  setLikeState((prev) => !prev);
                  await likeRecipe(id);

                  likeState
                    ? setLikeCount((prev) => prev - 1)
                    : setLikeCount((prev) => prev + 1);
                }}
                src={likeState ? liked : like}
                alt=""
              />
              <span className="text-sm" alt="">
                {likeCount}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <img src={commentImg} alt="" />
              <span className="text-sm" alt="">
                {comments.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
