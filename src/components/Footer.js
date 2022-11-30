// import PropTypes from 'prop-types';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './style.css';
// import { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import searchIcon from '../images/searchIcon.svg';

function Footer() {
  //   const history = useHistory();

  return (
    <footer
      data-testid="footer"
    >
      <button
        type="button"
      >
        <img src={ mealIcon } alt="imag-meals" data-testid="meals-bottom-btn" />
      </button>
      <button
        type="button"
      >
        <img src={ drinkIcon } alt="imag-drinkIcon" data-testid="drinks-bottom-btn" />
      </button>

    </footer>
  );
}

export default Footer;
