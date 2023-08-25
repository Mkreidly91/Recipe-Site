import React from 'react';

import shoppingImg from '../../assets/icons/card/shopping.svg';

const ListItem = ({ list }) => {
  const { name, shopping_list_items: items } = list;
  console.log(name, items);
  return (
    <div className="flex flex-col gap-3 border-b w-[90%] p-5  m-auto">
      <div className="flex  gap-3 items-center border-black border-b pb-3">
        <div className="text-3xl font-semibold text-center">{name}</div>
        <img className="w-[30px]" src={shoppingImg} alt="" />
      </div>
      <div className=" text-lg font-semibold">Ingredients</div>
      {items &&
        items.map((e) => <div className="text-sm">- {e.ingredient.name}</div>)}
    </div>
  );
};

export default ListItem;
