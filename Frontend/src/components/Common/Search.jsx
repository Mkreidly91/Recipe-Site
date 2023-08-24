import React, { useEffect, useRef, useState } from 'react';
import CustomInput from '../Inputs/CustomInput';
import mag from '../../assets/icons/magnifier.svg';
import genreBlack from '../../assets/icons/genre.svg';
import genreWhite from '../../assets/icons/genre-white.svg';
import authorBlack from '../../assets/icons/author.svg';
import authorWhite from '../../assets/icons/author-white.svg';

import { search } from '../../helpers/user.helpers';

// import { search, getMessagesById } from '../../helpers/common.helpers';
const falseState = {
  genre: false,
  author: false,
};
const Search = ({ togglePage, setCards }) => {
  const [query, setQuery] = useState('');
  const [input, setInput] = useState('');

  const timeout = useRef();

  useEffect(() => {
    if (!input.trim()) {
      const reset = async () => {
        const res = await search({});
        setCards(res);
        togglePage('all');
      };
      reset();
    }
  }, [input]);

  const [clicked, setClicked] = useState(falseState);
  const { genre, author } = clicked;

  const toggleState = (button) => {
    setClicked({ ...falseState, [button]: !clicked[button] });
  };
  const changeHandler = (e) => {
    const { value } = e.target;
    setInput(value);
    if (genre) {
      setQuery({ genre: value });
    } else if (author) {
      setQuery({ author: value });
    } else {
      setQuery({ keywords: value });
    }
  };
  console.log(query);
  async function handleDebounceSearch() {
    clearTimeout(timeout.current);

    if (!input.trim()) {
      const res = await search({});
      setCards(res);
    }

    timeout.current = setTimeout(async () => {
      const posts = await search({
        author: query.author,
        genre: query.genre,
        keywords: query.keywords,
      });

      console.log(posts);
      setCards(posts);
    }, 600);
  }

  return (
    <div className="w-[600px]  h-fit  rounded-2xl flex flex-col  gap-5 ">
      <div className="input-container relative flex flex-col  justify-center gap-5 ">
        <CustomInput
          type="search"
          className="bg-slate-100 pl-[100px] "
          value={input}
          onChange={(e) => {
            changeHandler(e);
            handleDebounceSearch();
          }}
          placeholder="Search book titles, authors, publishers..."
          onFocus={async () => {
            togglePage('search');
            const res = await search({});
            setCards(res);
          }}
        />
        <img
          src={mag}
          className="absolute top-[50%] translate-x-[30px] translate-y-[-30%] "
          alt=""
        />
      </div>

      <div className="button-container flex justify-center gap-20 relative">
        <div
          className={`flex gap-3 p-1 px-3 rounded-md  cursor-pointer ${
            clicked.genre ? 'b-orange text-white' : 'bg-slate-100 text-black'
          }`}
          onClick={() => {
            toggleState('genre');
          }}
        >
          <img src={clicked.genre ? genreWhite : genreBlack} alt="" />
          <span className=""> Genre</span>
        </div>
        <div
          className={`flex gap-3  p-1 px-3 rounded-md cursor-pointer ${
            clicked.author ? 'b-orange text-white' : 'bg-slate-100 text-black'
          }`}
          onClick={() => {
            toggleState('author');
          }}
        >
          <img src={clicked.author ? authorWhite : authorBlack} alt="" />
          <span className=""> Author</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
