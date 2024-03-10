import { useEffect, useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { IoMdSearch } from 'react-icons/io';
import apiCall from '../utils/callApi';
import categoryOptions from '../../data/category.json';
import './Search.scss';

const Search = () => {
  const [categoryOption, setCategoryOption] = useState('All');
  const [suggestion, setSuggestion] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const options = [
    'All',
    ...categoryOptions.category.map((catOption) => catOption.name),
  ];
  const getSuggestion = () => {
    apiCall('data/products.json')
      .then((suggestionResults) => {
        setSuggestion(suggestionResults);
      });
  };
  const handleOnChange = (e) => {
    setCategoryOption(e.target.value);
  };
  useEffect(() => {
    getSuggestion();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleInput = () => {
    setIsInputFocused(true);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    navigate({
      pathname: '/search',
      search: `${
        createSearchParams({
          categoryOption: `${categoryOption}`,
          search: `${search}`,
        })
      }`,
    });
    setCategoryOption('All');
    setSearch('');
  };
  const getWidth = () => {
    const selectOption = options[categoryOption];
    const selectedOptionLength = selectOption ? selectOption.length : 0;
    return `${selectedOptionLength ? selectedOptionLength * 20 : 70}px`;
  };

  return (
    <div className="w-full">
      <div
        className={`flex items-center h-10 bg-amazonclone-yellow rounded hover-bg-red
      ${isInputFocused ? 'ring ring-orange-400  focus:ring focus:ring-orange-400' : ''}`}
      >
        <select
          className="classic cursor-pointer bg-[#e6e6e6] h-full text-gray-900 p-2
          rounded-l  ring ring-0 outline-0 focus:ring focus:ring-0 border-0"
          style={{ width: getWidth() }}
          value={categoryOption}
          onChange={handleOnChange}
        >
          {
            options.map((catOption, index) => (
              <option key={catOption} value={index}>
                {catOption}
              </option>

            ))
          }
        </select>
        <input
          className="flex-grow h-full  text-black p-3 outline-0 border-0"
          type="text"
          placeholder="Search Amazon"
          value={search}
          onBlur={() => setIsInputFocused(false)}
          onMouseDown={handleInput}
          onChange={handleChange}
        />
        <button
          className="w-12 h-full hover:bg-amber-500 hover:rounded-r"
          aria-label="search"
          type="submit"
          onClick={handleSearch}
        >
          <IoMdSearch
            className="w-full h-7 m-auto text-amazonclone text-[20px]"
          />
        </button>
      </div>
      <div className="bg-white text-black absolute z-40">
        {suggestion
          && Object.values(suggestion).filter((suggest) => {
            const currentSearch = search.toLowerCase();
            const title = suggest.title.toLowerCase(); // Use slice to limit the length
            return (
              currentSearch
              && title.startsWith(currentSearch)
              && title !== currentSearch
            );
          })
            .slice(0, 10)
            .map((suggest) => (
              // eslint-disable-next-line max-len
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <div className="w-[790px] px-2" key={suggest.id} onClick={() => setSearch(suggest.title)}>
                <p className="line-clamp-1">{suggest.title}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Search;
