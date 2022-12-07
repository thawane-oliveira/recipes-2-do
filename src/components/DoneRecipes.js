import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const responseDone = JSON.parse(localStorage.getItem('doneRecipes'));
  const [done, setDone] = useState(responseDone);
  const [isCopied, setIsCopied] = useState('');

  const filterMeals = () => {
    const filterMeal = responseDone.filter((e) => e.type === 'meal');
    setDone(filterMeal);
    console.log(filterMeal);
  };
  const filterDrinks = () => {
    const filterDrink = responseDone.filter((e) => e.type === 'drink');
    setDone(filterDrink);
    console.log(filterDrink);
  };
  const filterAll = () => {
    setDone(responseDone);
    console.log(responseDone);
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
    <div>
      <Header headerText="Done Recipes" enableSearchButton={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ filterAll }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ filterMeals }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterDrinks }
      >
        Drinks
      </button>
      {
        done
          .map((element, index) => {
            if (element.type === 'meal') {
              return (
                <div
                  className="teste"
                  key={ index }
                >
                  <Link to={ `/meals/${element.id}` }>
                    <img
                      height={ 300 }
                      width={ 300 }
                      data-testid={ `${index}-horizontal-image` }
                      src={ element.image }
                      alt={ element.name }
                    />
                  </Link>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    { `${element.nationality} - ${element.category}` }
                  </p>
                  <Link to={ `/meals/${element.id}` }>
                    <p data-testid={ `${index}-horizontal-name` }>{ element.name}</p>
                  </Link>
                  <p
                    data-testid={ `${index}-horizontal-done-date` }
                  >
                    {element.doneDate}

                  </p>
                  { element.tags.map((item) => (
                    <p
                      key={ item }
                      data-testid={ `${index}-${item}-horizontal-tag` }
                    >
                      {item}

                    </p>
                  ))}

                  <button
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
                        type="button"
                        data-testid={ `${index}-horizontal-share-btn` }
                        onClick={ () => handleShare(element.type, element.id) }
                        src="shareIcon"
                      >
                        <img src={ shareIcon } alt={ element.name } />
                      </button>)
                  }
                </div>
              );
            }
            return (
              <div className="teste" key={ index }>
                <Link to={ `/drinks/${element.id}` }>
                  <img
                    height={ 300 }
                    width={ 300 }
                    data-testid={ `${index}-horizontal-image` }
                    src={ element.image }
                    alt={ element.name }
                  />
                </Link>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { element.alcoholicOrNot }
                </p>
                <Link to={ `/drinks/${element.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>{ element.name}</p>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {element.doneDate}

                </p>
                { element.tags.map((item) => (
                  <p
                    key={ item }
                    data-testid={ `${index}-${item}-horizontal-tag` }
                  >
                    {item}

                  </p>
                ))}
                <button
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
                      type="button"
                      data-testid={ `${index}-horizontal-share-btn` }
                      onClick={ () => handleShare(element.type, element.id) }
                      src="shareIcon"
                    >
                      <img src={ shareIcon } alt={ element.name } />
                    </button>)
                }
              </div>
            );
          })
      }
    </div>
  );
}
export default DoneRecipes;
