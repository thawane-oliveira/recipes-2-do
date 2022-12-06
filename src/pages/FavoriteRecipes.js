import { useState } from 'react';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const responseFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [fav, setFav] = useState(responseFav);

  const filterMeals = () => {
    const filterMeal = responseFav.filter((e) => e.type === 'meal');
    setFav(filterMeal);
    console.log(filterMeal);
  };

  const filterDrinks = () => {
    const filterDrink = responseFav.filter((e) => e.type === 'drink');
    setFav(filterDrink);
    console.log(filterDrink);
  };

  const filterAll = () => {
    setFav(responseFav);
    console.log(responseFav);
  };

  return (
    <div>
      <Header headerText="Favorite Recipes" enableSearchButton={ false } />
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
        fav
          .map((element, index) => {
            if (element.type === 'meal') {
              return (
                <div key={ index }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ element.image }
                    alt={ element.name }
                  />
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    { `${element.nationality} - ${element.category}` }
                  </p>

                  <p data-testid={ `${index}-horizontal-name` }>{ element.name}</p>

                  <button
                    type="button"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    onClick={ () => {} }
                    src="blackHeartIcon"
                  >
                    <img src={ blackHeartIcon } alt={ element.name } />
                  </button>

                  <button
                    type="button"
                    data-testid={ `${index}-horizontal-share-btn` }
                    onClick={ () => {} }
                    src="shareIcon"
                  >
                    <img src={ shareIcon } alt={ element.name } />
                  </button>

                </div>
              );
            }
            return (
              <div key={ index }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ element.image }
                  alt={ element.name }
                />

                <p data-testid={ `${index}-horizontal-top-text` }>
                  { element.alcoholicOrNot }
                </p>

                <p data-testid={ `${index}-horizontal-name` }>{ element.name}</p>

                <button
                  type="button"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  onClick={ () => {} }
                  src="blackHeartIcon"
                >
                  <img src={ blackHeartIcon } alt={ element.name } />
                </button>

                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => {} }
                  src="shareIcon"
                >
                  <img src={ shareIcon } alt={ element.name } />
                </button>
              </div>
            );
          })
      }
    </div>
  );
}

export default FavoriteRecipes;
