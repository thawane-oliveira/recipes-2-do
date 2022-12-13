import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './styles/DoneRecipes.css';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const responseDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [done, setDone] = useState(responseDone);
  const [isCopied, setIsCopied] = useState('');

  const filterMeals = () => {
    const filterMeal = responseDone.filter((e) => e.type === 'meal');
    setDone(filterMeal);
  };
  const filterDrinks = () => {
    const filterDrink = responseDone.filter((e) => e.type === 'drink');
    setDone(filterDrink);
  };
  const filterAll = () => {
    setDone(responseDone);
  };

  const handleShare = (type, id) => {
    if (type === 'drink') {
      copy(`http://localhost:3000/drinks/${id}`);
      setIsCopied(id);
    } if (type === 'meal') {
      copy(`http://localhost:3000/meals/${id}`);
      setIsCopied(id);
    }
  };

  return (
    <div className="main-done-container">
      <Header headerText="Done Recipes" enableSearchButton={ false } />
      <div className="btn-container-filter">
        <button
          className="all-fav"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ filterAll }
        >
          All
        </button>
        <button
          className="meals-fav"
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ filterMeals }
        >
          Meals
        </button>
        <button
          className="drinks-fav"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ filterDrinks }
        >
          Drinks
        </button>
      </div>
      {
        done
          .map((element, index) => {
            if (element.type === 'meal') {
              return (
                <div
                  className="done-container"
                  key={ index }
                >
                  <Link to={ `/meals/${element.id}` }>
                    <img
                      className="done-img"
                      data-testid={ `${index}-horizontal-image` }
                      src={ element.image }
                      alt={ element.name }
                    />
                  </Link>
                  <Link to={ `/meals/${element.id}` }>
                    <p
                      data-testid={ `${index}-horizontal-name` }
                      className="done-title"
                    >
                      { element.name}
                    </p>
                  </Link>
                  <p
                    className="done-category"
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { `${element.nationality} - ${element.category}` }
                  </p>
                  <p
                    className="done-date"
                    data-testid={ `${index}-horizontal-done-date` }
                  >
                    {element.doneDate}

                  </p>
                  { element.tags.map((item) => (
                    <p
                      className="done-tags"
                      key={ item }
                      data-testid={ `${index}-${item}-horizontal-tag` }
                    >
                      {item}

                    </p>
                  ))}
                  <div className="btn-done-container">
                    <button
                      className="done-fav"
                      type="button"
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      onClick={ () => {} }
                      src="blackHeartIcon"
                    >
                      <img src={ blackHeartIcon } alt={ element.name } />
                    </button>
                    {
                      isCopied === element.id ? <p>Link copied!</p> : (
                        <button
                          className="done-share"
                          type="button"
                          data-testid={ `${index}-horizontal-share-btn` }
                          onClick={ () => handleShare(element.type, element.id) }
                          src="shareIcon"
                        >
                          <img src={ shareIcon } alt={ element.name } />
                        </button>)
                    }
                  </div>
                </div>
              );
            }
            return (
              <div
                className="done-container"
                key={ index }
              >
                <Link to={ `/drinks/${element.id}` }>
                  <img
                    className="done-img"
                    data-testid={ `${index}-horizontal-image` }
                    src={ element.image }
                    alt={ element.name }
                  />
                </Link>
                <Link to={ `/drinks/${element.id}` }>
                  <p
                    className="done-title"
                    data-testid={ `${index}-horizontal-name` }
                  >
                    { element.name}
                  </p>
                </Link>
                <p
                  className="done-category"
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { element.alcoholicOrNot }
                </p>
                <p
                  className="done-date"
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {element.doneDate}

                </p>
                { element.tags.map((item) => (
                  <p
                    className="done-tags"
                    key={ item }
                    data-testid={ `${index}-${item}-horizontal-tag` }
                  >
                    {item}

                  </p>
                ))}
                <div className="btn-done-container">
                  <button
                    className="done-fav"
                    type="button"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    onClick={ () => {} }
                    src="blackHeartIcon"
                  >
                    <img src={ blackHeartIcon } alt={ element.name } />
                  </button>
                  {
                    isCopied === element.id ? <p>Link copied!</p> : (
                      <button
                        className="done-share"
                        type="button"
                        data-testid={ `${index}-horizontal-share-btn` }
                        onClick={ () => handleShare(element.type, element.id) }
                        src="shareIcon"
                      >
                        <img src={ shareIcon } alt={ element.name } />
                      </button>)
                  }
                </div>
              </div>
            );
          })
      }
    </div>
  );
}
export default DoneRecipes;
