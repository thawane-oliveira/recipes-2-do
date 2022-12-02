import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';

function RecipeDetails({ headerText }) {
  const history = useHistory();
  const {
    recipeDetail, setRecipeDetail, ingredients, setIngredients,
  } = useContext(AppContext);
  const allIngredient = [];
  const allMeasure = [];

  const ingredientsAndMeasures = (detailRecipe) => {
    let initialIngredient = 0;
    let lastIngredient = 0;
    let initialMeasure = 0;

    if (history.location.pathname.includes('meals')) {
      initialIngredient = Number('9');
      lastIngredient = Number('28');
      initialMeasure = Number('29');
    }

    if (history.location.pathname.includes('drinks')) {
      initialIngredient = Number('21');
      lastIngredient = Number('35');
      initialMeasure = Number('36');
    }

    const all = Object.values(detailRecipe[0]);

    for (let index = initialIngredient; index < lastIngredient; index += 1) {
      if (all[index] !== null && all[index] !== '') {
        allIngredient.push(all[index]);
      }
    }

    const lastMeasure = initialMeasure + allIngredient.length;
    for (let index2 = initialMeasure; index2 < lastMeasure; index2 += 1) {
      const value = all[index2] || 'Add to taste';
      allMeasure.push(value);
    }
    const allReqs = allIngredient.map((item, index) => `${item} - ${allMeasure[index]}`);
    setIngredients(allReqs);
  };

  useEffect(() => {
    const recipeId = history.location.pathname;
    const splitedId = recipeId.split('/')[2];

    const verifyPath = async () => {
      if (headerText === 'Meals') {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${splitedId}`);
        const data = await response.json();
        setRecipeDetail(data.meals);
        ingredientsAndMeasures(data.meals);
      }
      if (headerText === 'Drinks') {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${splitedId}`);
        const data = await response.json();
        setRecipeDetail(data.drinks);
        ingredientsAndMeasures(data.drinks);
      }
    };
    verifyPath();
  }, []);

  return (
    <>

      {recipeDetail.map((item) => (
        <div key={ item.strMeal || item.strDrink }>
          <h3 data-testid="recipe-title">{item.strMeal || item.strDrink}</h3>
          <h4 data-testid="recipe-category">
            {item.strAlcoholic ? `${item.strCategory} - ${item.strAlcoholic}` : item.strCategory}
          </h4>
          <img
            src={ item.strMealThumb || item.strDrinkThumb }
            data-testid="recipe-photo"
            alt={ item.strMealThumb || item.strDrinkThumb }
          />
          <ul>
            {ingredients.map((el, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ Math.random() }
              >
                {el}
              </li>
            ))}
          </ul>
          <p data-testid="instructions">{item.strInstructions}</p>
          {
            headerText === 'Meals' && (
              <iframe
                data-testid="video"
                title={ item.strMeal }
                width="420"
                height="315"
                src={ item.strYoutube?.replace('watch?v=', 'embed/') }
              />
            )
          }
        </div>
      ))}
    </>
  );
}

RecipeDetails.propTypes = {
  headerText: PropTypes.string.isRequired,
};

export default RecipeDetails;
