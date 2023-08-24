import React, { useEffect, useState } from 'react';
import logo from '../assets/images/Tastebite.png';
import { getAll } from '../helpers/recipe.helpers';
import Card from '../components/Posts/Card';

const MainPage = () => {
  const [allRecipes, setAllRecipes] = useState();
  useEffect(() => {
    const getRecipes = async () => {
      const res = await getAll();
      setAllRecipes(res.recipes);
    };

    getRecipes();
  }, []);
  console.log(allRecipes);
  const { name, comments, cuisine, images, ingredients, isLiked } =
    {} || allRecipes[0];

  return (
    <div className="flex flex-col items-center px-5">
      <img src={logo} className="w-[150px] py-10" alt="" />

      <div className="cards">
        <div className="flex  flex-wrap justify-center gap-5">
          {allRecipes &&
            allRecipes.map((recipe) => (
              <Card recipe={recipe} setAllRecipes={setAllRecipes} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;