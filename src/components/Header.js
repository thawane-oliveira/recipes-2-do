import PropTypes from 'prop-types';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Header({ headerText, enableSearchButton }) {
  const history = useHistory();

  const redirectToProfile = () => {
    history.push('/profile');
  };

  const [hideInput, setHideInput] = useState(false);

  const hideInputOrNot = () => {
    if (hideInput === false) {
      setHideInput(true);
    } if (hideInput === true) {
      setHideInput(false);
    }
  };

  return (
    <header>
      <h1 data-testid="page-title">{headerText}</h1>
      <button
        data-testid="profile-button"
        onClick={ redirectToProfile }
        type="button"
      >
        <img
          data-testid="profile-top-btn"
          src="src/images/profileIcon.svg"
          alt="profile icon"
        />
      </button>

      { hideInput && (
        <label htmlFor="search-input">
          <input data-testid="search-input" type="text" id="search-input" />
        </label>)}
      { enableSearchButton && (
        <button
          type="button"
          onClick={ hideInputOrNot }
          data-testid="search-button"
        >
          <img
            data-testid="search-top-btn"
            src="src/images/searchIcon.svg"
            alt="search top icon"
          />
        </button>
      ) }
    </header>
  );
}

Header.propTypes = {
  enableSearchButton: PropTypes.bool.isRequired,
  headerText: PropTypes.string.isRequired,
};

export default Header;
