import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import Card from './Card';
import Loading from './Loading';
import './styles/Recipes.css';

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
    verifyCategory,
    setVerifyCategory,
    setLoading,
    loading,
  } = useContext(AppContext);

  const magicNumber = 12;
  const maxButton = 5;

  // const settest = (allRecipes) => {
  //   const allCategories = [...new Set(allRecipes.map((item) => item.strCategory))].sort();
  //   setCategories(allCategories);
  // };

  const clearFilters = () => {
    setIsCategory(false);
    setRecipes(recipes);
  };

  const buttonFetch = async ({ target }) => {
    if (headerText === 'Meals') {
      const mealCategoryFilter = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.value}`);
      const mealData = await mealCategoryFilter.json();
      setInitialRecipes(mealData.meals);
      setIsCategory(true);
      setVerifyCategory(target.value);
      setLoading(false);
      if (verifyCategory === target.value) {
        setIsCategory(false);
        setRecipes(recipes);
      }
    }
    if (headerText === 'Drinks') {
      const drinkCategoryFilter = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.value}`);
      const drinkData = await drinkCategoryFilter.json();
      setInitialRecipes(drinkData.drinks);
      setIsCategory(true);
      setVerifyCategory(target.value);
      setLoading(false);
      if (verifyCategory === target.value) {
        setIsCategory(false);
        setRecipes(recipes);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      if (headerText === 'Meals') {
        const mealResponse = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const mealData = await mealResponse.json();
        setRecipes(mealData.meals);
        setLoading(false);

        const categoryMealResponse = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const categoryMealData = await categoryMealResponse.json();
        const mealDataArray = categoryMealData.meals.map((item) => item.strCategory);
        setCategories(mealDataArray);
        setLoading(false);
      } if (headerText === 'Drinks') {
        const drinkResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const drinkData = await drinkResponse.json();
        setRecipes(drinkData.drinks);
        setLoading(false);

        const categoryDrinkResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const categoryDrinkData = await categoryDrinkResponse.json();
        const drinkDataArray = categoryDrinkData.drinks.map((item) => item.strCategory);
        setCategories(drinkDataArray);
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [headerText, setCategories, setRecipes, setLoading]);

  return (
    <div className="recipes-container">
      <div className="filter-btn-container">
        { loading ? <Loading /> : (
          categories
            .filter((_item, index) => index < maxButton)

            .map((recipe) => (
              <button
                className="filter-btn"
                data-testid={ `${recipe}-category-filter` }
                key={ recipe }
                onClick={ buttonFetch }
                type="button"
                value={ recipe }
              >
                {recipe}
              </button>
            )))}
        <button
          className="button-all"
          data-testid="All-category-filter"
          onClick={ clearFilters }
          type="button"
        >
          All
        </button>
      </div>

      { loading ? <Loading /> : (
        isCategory === true && initialRecipes
          .filter((_item, index) => index < magicNumber)

          .map((recipe, index) => (
            <Card
              photo={ recipe.strMealThumb || recipe.strDrinkThumb }
              index={ index }
              key={ recipe.idMeal || recipe.idDrink }
              title={ recipe.strMeal || recipe.strDrink }
              id={ recipe.idMeal || recipe.idDrink }
              headerText={ headerText }
            />
          )))}

      { loading ? <Loading /> : (
        isCategory === false && recipes
          .filter((_item, index) => index < magicNumber)

          .map((recipe, index) => (
            <Card
              photo={ recipe.strMealThumb || recipe.strDrinkThumb }
              headerText={ headerText }
              index={ index }
              key={ recipe.idMeal || recipe.idDrink }
              id={ recipe.idMeal || recipe.idDrink }
              title={ recipe.strMeal || recipe.strDrink }
            />
          )))}
    </div>

  );
}

Recipes.propTypes = {
  headerText: PropTypes.string.isRequired,
};

export default Recipes;
