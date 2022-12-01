import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import Card from './Card';

function Recipes({ headerText }) {
  const {
    categories,
    setCategories,
    initialRecipes,
    setInitialRecipes,
    recipes,
    setRecipes,
    isCategory,
    setIsCategory,
  } = useContext(AppContext);

  const magicNumber = 12;
  const maxButton = 5;

  // const settest = (allRecipes) => {
  //   const allCategories = [...new Set(allRecipes.map((item) => item.strCategory))].sort();
  //   setCategories(allCategories);
  // };

  const buttonFetch = async ({ target }) => {
    if (headerText === 'Meals') {
      const mealCategoryFilter = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.value}`);
      const mealData = await mealCategoryFilter.json();
      console.log(mealData.meals);
      setInitialRecipes(mealData.meals);
      setIsCategory(true);
    }
    if (headerText === 'Drinks') {
      const drinkCategoryFilter = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.value}`);
      const drinkData = await drinkCategoryFilter.json();
      console.log(drinkData.drinks);
      setInitialRecipes(drinkData.drinks);
      setIsCategory(true);
    }
  };

  const clearFilters = () => {
    setIsCategory(false);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      if (headerText === 'Meals') {
        const mealResponse = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const mealData = await mealResponse.json();
        setRecipes(mealData.meals);

        const categoryMealResponse = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const categoryMealData = await categoryMealResponse.json();
        const mealDataArray = categoryMealData.meals.map((item) => item.strCategory);
        setCategories(mealDataArray);
      } else if (headerText === 'Drinks') {
        const drinkResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const drinkData = await drinkResponse.json();
        setRecipes(drinkData.drinks);

        const categoryDrinkResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const categoryDrinkData = await categoryDrinkResponse.json();
        const drinkDataArray = categoryDrinkData.drinks.map((item) => item.strCategory);
        setCategories(drinkDataArray);
      }
    };
    fetchRecipes();
  }, [headerText, setCategories, setRecipes]);

  return (
    <div>
      {
        categories
          .filter((_item, index) => index < maxButton)

          .map((recipe) => (
            <button
              data-testid={ `${recipe}-category-filter` }
              key={ recipe }
              onClick={ buttonFetch }
              type="button"
              value={ recipe }
            >
              {recipe}
            </button>
          ))
      }
      <button
        data-testid="All-category-filter"
        onClick={ clearFilters }
        type="button"
      >
        All
      </button>

      {isCategory === true && initialRecipes
        .filter((_item, index) => index < magicNumber)

        .map((recipe, index) => (
          <Card
            photo={ recipe.strMealThumb || recipe.strDrinkThumb }
            index={ index }
            key={ recipe.idMeal || recipe.idDrink }
            title={ recipe.strMeal || recipe.strDrink }
          />
        ))}

      {isCategory === false && recipes
        .filter((_item, index) => index < magicNumber)

        .map((recipe, index) => (
          <Card
            photo={ recipe.strMealThumb || recipe.strDrinkThumb }
            index={ index }
            key={ recipe.idMeal || recipe.idDrink }
            title={ recipe.strMeal || recipe.strDrink }
          />
        ))}
    </div>

  );
}

Recipes.propTypes = {
  headerText: PropTypes.string.isRequired,
};

export default Recipes;
