import React, { useState, useRef, useEffect } from 'react';
import Modal from '../Common/Modal';
import TextArea from '../Inputs/TextArea';
import CustomInput from '../Inputs/CustomInput';
import { toBase64 } from '../../helpers/helpers';
import Button from '../Common/Button';
import { addPost } from '../../helpers/user.helpers';
import { getMeasurements, getIngredient } from '../../helpers/recipe.helpers';
import CustomSelect from '../Inputs/CustomSelect';
import noImage from '../../assets/icons/common/no-image.svg';
import { Link } from 'react-router-dom';
const initialState = {
  name: '',
  cuisine: '',
  images: [],
  ingredients: [],
};
const AddPost = () => {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState();
  const [measurements, setMeasurements] = useState();

  console.log(errors);
  const [selectedIngredient, setSelectedIngredient] = useState({
    ingredient: '',
    quantity: '',
    measurement: '',
  });

  console.log(state);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState();
  const timeout = useRef();

  useEffect(() => {
    const loadMeasurements = async () => {
      const res = await getMeasurements();
      setMeasurements(res);
    };
    loadMeasurements();
  }, []);

  async function handleQuery(e) {
    const { value } = e.target;
    setQuery(value);
  }

  async function handleDebounceSearch(e) {
    clearTimeout(timeout.current);
    if (!query.trim() && query.length === 0) {
      setResults('');
      return;
    }
    timeout.current = setTimeout(async () => {
      const users = await getIngredient(query);
      setResults(users);
    }, 600);
  }

  const fileInput = useRef();

  function onChange(e) {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }

  async function onImageChange(e) {
    const files = e.target.files;
    if (!files) return;
    let result = [];
    for (const file of files) {
      const base64 = await toBase64(file);
      result.push(base64);
    }
    // imageRef.current.src = result[0] || '';
    setState((prev) => ({ ...prev, images: result }));
  }

  const { name, cuisine, ingredients, images } = state;

  function addIngredient() {
    const { ingredient, quantity, measurement } = selectedIngredient;
    if (!ingredient || !quantity || !measurement) return;
    setState((prev) => ({
      ...prev,
      ingredients: [{ ingredient, quantity, measurement }, ...prev.ingredients],
    }));
    setSelectedIngredient({
      ingredient: '',
      quantity: '',
      measurement: '',
    });
  }

  async function handleSave() {
    const { message, errorMessages, post } = await addPost(state);

    if (errorMessages) {
      setErrors(errorMessages[0]);
      return;
    }
    console.log(post);
  }

  const searchResults = () => {
    if (!results) return;
    return results.map((element, index) => (
      <div
        className="cursor-pointer  border-b hover:bg-slate-200 py-2 px-3  "
        key={index}
        onClick={() => {
          setSelectedIngredient((prev) => ({
            ...prev,
            ingredient: element.name,
          }));
          setResults('');
        }}
      >
        {element.name}
      </div>
    ));
  };

  return (
    <div className="post-page-container h-full flex justify-center items-center p-2 bg-yellow-100">
      <div className=" w-[90%] flex justify-around gap-10 p-10 shadow-lg bg-white  rounded-2xl">
        <div
          onClick={() => {
            setResults('');
          }}
          className=" post-form-container w-[60%] flex flex-col items-start gap-5 bg-white  rounded-3xl"
        >
          <span className="font-bold text-lg">Create your Recipe</span>
          <CustomInput
            label="Recipe Name"
            name="recipe"
            type="text"
            onChange={(e) =>
              setState((prev) => ({ ...prev, name: e.target.value }))
            }
            value={name}
            className={'w-[300px] text-black'}
            placeholder="Title"
          />

          <CustomInput
            label="Cuisine"
            name="cuisine"
            type="text"
            onChange={(e) =>
              setState((prev) => ({ ...prev, cuisine: e.target.value }))
            }
            value={cuisine}
            className={'w-[300px] text-black'}
            placeholder="Cuisine"
          />

          <div className="addIngredients flex flex-col gap-5 relative">
            <div className="searchBox">
              <CustomInput
                label="Ingredient"
                name="ingredient"
                type="text"
                onChange={(e) => {
                  handleQuery(e);
                  setSelectedIngredient((prev) => ({
                    ...prev,
                    ingredient: e.target.value,
                  }));
                  handleDebounceSearch();
                }}
                value={selectedIngredient.ingredient}
                className={'w-[300px] text-black rounded-b-none'}
                placeholder="Ingredient"
              />
              <div className=" absolute top-[70px] results bg-white  border-l border-r  text-gray-400  leading-tight focus:outline-none placeholder:text-xs placeholder:font-normal placeholder:text-gray-300  rounded-b-md w-[300px]">
                {results && searchResults()}
              </div>
            </div>

            <div className="flex items-center justify-between gap-5">
              <CustomInput
                label="Quantity"
                name="quantity"
                type="text"
                value={selectedIngredient.quantity}
                className={'w-[100px] text-black'}
                placeholder="Quantity"
                onChange={(e) => {
                  setSelectedIngredient((prev) => ({
                    ...prev,
                    quantity: e.target.value,
                  }));
                }}
              />

              <CustomSelect
                label="Unit"
                className={'w-[150px] text-black text-sm text-center'}
                options={measurements}
                name="measurement"
                value={selectedIngredient.measurement}
                onChange={(e) => {
                  setSelectedIngredient((prev) => ({
                    ...prev,
                    measurement: e.target.value,
                  }));
                }}
              />
            </div>

            <Button
              onClick={() => {
                addIngredient();
              }}
              className={
                'self-end cursor-pointer text-white b-orange py-1 px-3 rounded'
              }
              text={'Add '}
            />
          </div>
          <div className="w-full flex flex-col gap-2 mt-5">
            <span>Ingredient List</span>
            <div className="ingredientList border rounded-xl min-h-[300px] w-full p-4 ">
              {state.ingredients.map((e, index) => {
                const { ingredient, quantity, measurement } = e;
                return (
                  <div key={index} className="text-xs ">
                    - {quantity} {measurements[measurement - 1].name}{' '}
                    {ingredient}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Image Preview */}

        <div className="flex flex-col gap-5">
          <div className="preview-container flex items-center justify-center h-[300px] bg-gray-100 rounded-md">
            {state.images[0] ? (
              <img className="w-full h-full" src={state.images[0]} alt="" />
            ) : (
              <img src={noImage} />
            )}
          </div>
          <input
            ref={fileInput}
            className=" cursor-pointer file-input file-input-bordered file-input-primary w-full h-fit max-w-xs  bg-transparent  appearance-none border   text-gray-400   focus:outline-none placeholder:text-xs placeholder:font-normal placeholder:text-gray-300  rounded-md  bg-slate-100"
            type="file"
            accept="image/*"
            onChange={onImageChange}
            multiple={true}
          />

          <div className=" button-continer flex items-center gap-5">
            <Button
              onClick={() => {
                handleSave();
              }}
              className={'cursor-pointer text-white b-orange py-1 px-3 rounded'}
              text="Save"
            />
            <Link to="/main">
              <Button
                onClick={() => {}}
                className={'cursor-pointer'}
                text="Cancel"
              />
            </Link>
          </div>
          <div className="error font-light text-red-700 text-xs min-h-[14px] mt-2">
            {errors}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
