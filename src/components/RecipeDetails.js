import { useHistory } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';

function RecipeDetails() {
  const history = useHistory();
  const {
    recipeDetail, setRecipeDetail, ingredients, setIngredients,
  } = useContext(AppContext);

  //   const ingredientsAndMeasures = (detailRecipe) => {
  //     let initialIngredient = 0;
  //     let lastIngredient = 0;
  //     let initialMeasure = 0;

  //     if (history.location.pathname.includes('meals')) {
  //       initialIngredient = Number('9');
  //       lastIngredient = Number('28');
  //       initialMeasure = Number('29');
  //     }

  //     if (history.location.pathname.includes('drinks')) {
  //       initialIngredient = Number('21');
  //       lastIngredient = Number('35');
  //       initialMeasure = Number('36');
  //     }

  //     const all = Object.values(detailRecipe[0]);

  //     for (let index = initialIngredient; index < lastIngredient; index += 1) {
  //       if (all[index] !== null && all[index] !== '') {
  //         allIngredient.push(all[index]);
  //       }
  //     }

  //     const lastMeasure = initialMeasure + allIngredient.length;
  //     for (let index2 = initialMeasure; index2 < lastMeasure; index2 += 1) {
  //       const value = all[index2] || 'Add to taste';
  //       allMeasure.push(value);
  //     }
  //     const allReqs = allIngredient.map((item, index) => `${item} - ${allMeasure[index]}`);
  //     setIngredients(allReqs);
  //   };

  const ingredientsAndMeasures = (detailRecipe) => {
    const all = Object.entries(detailRecipe[0]);
    const allIngredients = all
      .filter((item) => item[0].includes('strIngredient'))
      .filter((item) => (item[1] !== null && item[1] !== ''))
      .map((item) => item[1]);

    const allMeasures = all
      .filter((item) => item[0].includes('strMeasure'))
      .filter((item) => (item[1] !== null && item[1] !== ''))
      .map((item) => item[1]);

    const itens = allIngredients.map((item, index) => `${item} - ${allMeasures[index]}`);
    setIngredients(itens);
    // função acima feita depois de auxílio do Sumo na mentoria de 01/12, para a lógica de como pegar chaves e valores dos ingredientes/medidas
  };

  useEffect(() => {
    const recipeId = history.location.pathname;
    const splitedId = recipeId.split('/')[2];

    const verifyPath = async () => {
      if (recipeId.includes('meals')) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${splitedId}`);
        const data = await response.json();
        setRecipeDetail(data.meals);
        ingredientsAndMeasures(data.meals);
      }
      if (recipeId.includes('drinks')) {
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
            {
              item.strAlcoholic
                ? `${item.strCategory} - ${item.strAlcoholic}`
                : item.strCategory
            }
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
            history.location.pathname.includes('meals') && (
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

export default RecipeDetails;
