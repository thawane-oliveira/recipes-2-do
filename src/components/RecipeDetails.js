import { useHistory } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';
import MerryGoRound from './MerryGoRound';
import './styles/style.css';
import Loading from './Loading';
// import profileIcon from '../images/whiteHeartIcon.svg';
// import searchIcon from '../images/blackHeartIcon.svg';

function RecipeDetails() {
  const history = useHistory();
  const {
    recipeDetail, setRecipeDetail, ingredients, setIngredients,
    setRecommend, setLoading, loading,
    progress,
    setProgress } = useContext(AppContext);

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

  const verifyProgress = () => {
    const local = history.location.pathname;
    const splitedId = local.split('/')[2];

    const recoverl = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || {
      drinks: {
      },
      meals: {
      }, // deixando um objeto vazio por enquanto porque ainda não chegamos no requisito 40;
    };

    if (local.includes('meals')) {
      const verifying = Object.keys(recoverl.meals).includes(splitedId);
      setProgress(verifying);

      // const saveMeal = {
      //   drinks: {
      //     ...takeLocalRecipes.drinks,
      //   },
      //   meals: { ...takeLocalRecipes.meals,
      //     [splitedId]: ingredients,
      //   },
      // };

      // localStorage.setItem('inProgressRecipes', JSON.stringify(saveMeal));
    }
    if (local.includes('drinks')) {
      const verifying = Object.keys(recoverl.drinks).includes(splitedId);
      setProgress(verifying);

      // const saveDrink = {
      //   drinks: {
      //     ...takeLocalRecipes.drinks,
      //     [splitedId]: ingredients,
      //   },
      //   meals: {
      //     ...takeLocalRecipes.meals,
      //   },
      // };

      // localStorage.setItem('inProgressRecipes', JSON.stringify(saveDrink));
    }
  };

  const redirectRecipe = () => {
    const local = history.location.pathname;
    const splitedId = local.split('/')[2];

    if (local.includes('meals')) {
      history.push(`/meals/${splitedId}/in-progress`);
    }
    if (local.includes('drinks')) {
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
    verifyProgress();
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
            <button type="button">profileIcon</button>
            <img
              src={ item.strMealThumb || item.strDrinkThumb }
              data-testid="recipe-photo"
              alt={ item.strMealThumb || item.strDrinkThumb }
            />
            <ul>
              {ingredients.map((e, index) => (
                <li
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ Math.random() }
                >
                  {e}
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
          onClick={ redirectRecipe }
        >
          {progress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      </div>
      <div>
        <button
          type="button"
          data-testid="share-btn"
        >
          Share Recipe
        </button>
      </div>
      <div>
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
