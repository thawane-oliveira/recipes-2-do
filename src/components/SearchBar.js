// import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
// import requestCocktail from '../services/requestCocktail';
// import requestMeal from '../services/requestMeal';

function SearchBar(props) {
  const history = useHistory();

  console.log(props);
  const {
    searchInput,
    setSearchInput,
    radioOption,
    setRadioOption,
    setSearchByFilter,
    setPath,
  } = useContext(AppContext);

  const onInputChange = ({ target }) => {
    setSearchInput(target.value);
  };

  const onRadioChange = ({ target }) => {
    setRadioOption(target.value);
  };

  const clickSearchButton = async () => {
    setPath(history.location.pathname);
    setSearchByFilter({
      searchText: searchInput,
      typeOfSearch: radioOption,
    });
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

// SearchBar.propTypes = {
//   headerText: PropTypes.string.isRequired,
// };

export default SearchBar;
