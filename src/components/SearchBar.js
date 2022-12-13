// import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import './styles/Header.css';

function SearchBar() {
  const history = useHistory();

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
    <form className="search-form">

      <label htmlFor="search-input" className="search-label">
        <input
          className="search-input"
          data-testid="search-input"
          id="search-input"
          placeholder="Search recipe"
          onChange={ onInputChange }
          type="text"
        />
      </label>

      <label htmlFor="ingredient" className="ingredient-label">
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

      <label htmlFor="name" className="name-label">
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

      <label htmlFor="firstLetter" className="firstletter-label">
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
        className="searchbar-btn"
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
