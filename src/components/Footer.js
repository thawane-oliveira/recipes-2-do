// import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './styles/Footer.css';
// import { useState } from 'react';
// import searchIcon from '../images/searchIcon.svg'

function Footer() {
  const history = useHistory();
  const { setIsCategory } = useContext(AppContext);

  const handleRedirMeals = () => {
    history.push('/meals');
    setIsCategory(false);
  };

  const handleRedirCocktails = () => {
    history.push('/drinks');
    setIsCategory(false);
  };

  return (
    <footer
      className="geral-footer"
      data-testid="footer"
    >
      <div className="footer-btn">
        <button
          className="meals-footer"
          type="button"
          onClick={ () => handleRedirMeals() }
        >
          <img
            src={ mealIcon }
            alt="imag-meals"
            data-testid="meals-bottom-btn"
          />
        </button>
        <button
          className="drinks-footer"
          type="button"
          onClick={ () => handleRedirCocktails() }
        >
          <img
            src={ drinkIcon }
            alt="imag-drinkIcon"
            data-testid="drinks-bottom-btn"
          />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
