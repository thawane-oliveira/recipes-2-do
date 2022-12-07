// import { useEffect, useState } from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  const responseFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
  // const [fav, setFav] = useState(responseFav);

  const filterMeals = () => {
    const filterMeal = responseFav.filter((e) => e.type === 'meal');
    setFav(filterMeal);
  };

  const filterDrinks = () => {
    const filterDrink = responseFav.filter((e) => e.type === 'drink');
    setFav(filterDrink);
  };

  const filterAll = () => {
    setFav(responseFav);
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
    </div>
  );
}

export default FavoriteRecipes;
