import { useHistory } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';
import MerryGoRound from './MerryGoRound';
import './styles/style.css';
import Loading from './Loading';

function RecipeDetails() {
  const history = useHistory();
  const {
    recipeDetail,
    setRecipeDetail,
    ingredients,
    setIngredients,
    setRecommend,
    setLoading,
    loading,
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

  const redirectToProgress = () => {
    const recipeId = history.location.pathname;
    const splitedId = recipeId.split('/')[2];

    if (recipeId.includes('meals')) {
      history.push(`/meals/${splitedId}/in-progress`);
    }
    if (recipeId.includes('drinks')) {
      history.push(`/drinks/${splitedId}/in-progress`);
    }
  };

  useEffect(() => {
    const recipeId = history.location.pathname;
    const splitedId = recipeId.split('/')[2];
    const maxRecommendation = 6;

    const verifyPath = async () => {
      if (recipeId.includes('meals')) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${splitedId}`);
        const data = await response.json();
        setRecipeDetail(data.meals);
        ingredientsAndMeasures(data.meals);

        const response2 = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data2 = await response2.json();
        setRecommend(data2.drinks.slice(0, maxRecommendation));
        setLoading(false);
      }
      if (recipeId.includes('drinks')) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${splitedId}`);
        const data = await response.json();
        setRecipeDetail(data.drinks);
        ingredientsAndMeasures(data.drinks);

        const response2 = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data2 = await response2.json();
        setRecommend(data2.meals.slice(0, maxRecommendation));
        setLoading(false);
      }
    };
    verifyPath();
  }, []);

  return (
    <>

      {loading ? <Loading /> : (
        recipeDetail.map((item) => (
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
                  src={ item.strYoutube?.replace('watch?v=', 'embed/') } // verificado em: https://stackoverflow.com/questions/21607808/convert-a-youtube-video-url-to-embed-code
                />
              )
            }
            {loading ? <Loading /> : (<MerryGoRound />)}
          </div>
        )))}
      <div>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          onClick={ redirectToProgress }
        >
          Start Recipe
        </button>
        <button
          type="button"
          data-testid="share-btn"
        >
          Share Recipe
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favorite Recipe
        </button>
      </div>
    </>
  );
}

export default RecipeDetails;
