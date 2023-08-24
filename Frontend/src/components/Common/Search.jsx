import React, { useEffect, useRef, useState } from 'react';

import mag from '../../assets/icons/common/mag.svg';

import { search } from '../../helpers/user.helpers';
import CustomInput from '../Inputs/CustomInput';

// import { search, getMessagesById } from '../../helpers/common.helpers';

const Search = ({ setCards }) => {
  const [query, setQuery] = useState('');
  const [input, setInput] = useState('');

  const timeout = useRef();

  // useEffect(() => {
  //   if (!input.trim()) {
  //     const reset = async () => {
  //       const res = await search({});
  //       setCards(res);
  //       togglePage('all');
  //     };
  //     reset();
  //   }
  // }, [input]);

  const changeHandler = (e) => {
    const { value } = e.target;
    setInput(value);
    setQuery(value);
  };
  console.log(query);
  async function handleDebounceSearch() {
    clearTimeout(timeout.current);

    if (!input.trim()) {
      const res = await search('');
      setCards(res);
    }

    timeout.current = setTimeout(async () => {
      const posts = await search(query);
      setCards(posts.recipes);
    }, 600);
  }

  return (
    <div className="h-fit  rounded-2xl flex flex-col  gap-5 ">
      <div className="input-container relative flex flex-col  justify-center gap-5 ">
        <CustomInput
          type="search"
          className=" pl-[100px] w-[450px] "
          value={input}
          onChange={(e) => {
            changeHandler(e);
            handleDebounceSearch();
          }}
          placeholder="Search by name, cuisine, and ingredients."
        />
        <img
          src={mag}
          className="absolute top-[50%] translate-x-[30px] translate-y-[-30%] "
          alt=""
        />
      </div>
    </div>
  );
};

export default Search;
