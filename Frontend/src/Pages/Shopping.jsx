import React, { useEffect, useState } from 'react';
import shoppingImg from '../assets/images/shopping.png';
import { getShoppingLists } from '../helpers/user.helpers';
import ListItem from '../components/ShoppingList/ListItem';
const ShoppingPage = () => {
  const [lists, setLists] = useState();
  useEffect(() => {
    const getInfo = async () => {
      const res = await getShoppingLists();
      setLists(res);
    };

    getInfo();
  }, []);

  return (
    <div className="shopping-page">
      <div className="shopping-header  flex  h-[500px] shadow-md mb-7">
        <div className="w-[50%] flex items-center justify-center text-4xl font-semibold">
          <span>Get that Shopping Going</span>
        </div>
        <img
          className="h-full w-[50%] grow object-cover"
          src={shoppingImg}
          alt=""
        />
      </div>
      {lists && lists.map((list) => <ListItem list={list} />)}
    </div>
  );
};

export default ShoppingPage;
