import PropTypes from 'prop-types';
import { useContext } from 'react';
import AppContext from '../context/AppContext';
import requestMeal from '../services/requestMeal';
// import { useHistory } from 'react-router-dom';

function SearchBar({ headerText }) {
  // const history = useHistory();

  const {
    searchInput,
    setSearchInput,
    radioOption,
    setRadioOption,
    searchByFilter,
    setSearchByFilter,
  } = useContext(AppContext);

  const onInputChange = ({ target }) => {
    setSearchInput(target.value);
  };

  const onRadioChange = ({ target }) => {
    setRadioOption(target.value);
  };

  const clickSearchButton = async () => {
    setSearchByFilter({
      searchText: searchInput,
      typeOfSearch: radioOption,
    });

    const { searchText, typeOfSearch } = searchByFilter;

    if (headerText === 'Drinks') {
      const fetch = await requestCocktail(searchText, typeOfSearch);
      return fetch;
    }
    if (headerText === 'Meals') {
      const fetch = await requestMeal(searchText, typeOfSearch);
      return fetch;
    }
    if (searchText.length > 1 && typeOfSearch === 'first-letter-search') {
      const advice = global.alert('Your search must have only 1 (one) character');
      return advice;
    }
  };

  return (
    <form>

      <label htmlFor="search-input">
        <input
          data-testid="search-input"
          id="search-input"
          placeholder="Search recipe"
          onChange={ onInputChange }
          type="text"
        />
      </label>

      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          id="ingredient"
          name="searchBy"
          onChange={ onRadioChange }
          type="radio"
          value="ingredient-search"
        />
        Ingredient
      </label>

      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          id="name"
          name="searchBy"
          onChange={ onRadioChange }
          type="radio"
          value="name-search"
        />
        Name
      </label>

      <label htmlFor="firstLetter">
        <input
          data-testid="first-letter-search-radio"
          id="firstLetter"
          name="searchBy"
          onChange={ onRadioChange }
          type="radio"
          value="first-letter-search"
        />
        First Letter
      </label>

      <button
        data-testid="exec-search-btn"
        onClick={ clickSearchButton }
        type="button"
      >
        Search
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  headerText: PropTypes.string.isRequired,
};

export default SearchBar;
