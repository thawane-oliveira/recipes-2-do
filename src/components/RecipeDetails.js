import { useHistory } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';
import CardDetails from './CardDetails';
import './styles/style.css';
import Loading from './Loading';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import './styles/RecipeDetails.css';

const copy = require('clipboard-copy');

function RecipeDetails() {
  const history = useHistory();
  const local = history.location.pathname;
  const splitedId = local.split('/')[2];
  const {
    recipeDetail, setRecipeDetail, setIngredients,
    setRecommend, setLoading, loading,
    progress, setProgress, copied, setCopied,
    favorite, setFavorite, ingredients, tickedIngredient,
  } = useContext(AppContext);

  const myLocal = local.includes('meals') ? 'meals' : 'drinks';

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
    const recoverInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { drinks: {}, meals: {} };
    const verifying = Object.keys(recoverInProgress[myLocal]).includes(splitedId);

    const saveRecipe = {
      ...recoverInProgress, [myLocal]: { [splitedId]: tickedIngredient },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(saveRecipe));
    setProgress(verifying);
  };

  const redirectRecipe = () => {
    verifyProgress();
    history.push(`/${myLocal}/${splitedId}/in-progress`);
  };

  const copyRecipePath = () => {
    copy(`http://localhost:3000${local}`);
    setCopied(true);
  };

  const verifyIfIsFavorite = () => {
    const recoverFav = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    // http://cangaceirojavascript.com.br/array-includes-vs-array-some/
    const verifying = recoverFav.some((item) => item.id === splitedId);
    if (verifying) { setFavorite(true); } else { setFavorite(false); }
  };

  const saveFavoriteRecipe = (localFavRec) => {
    const { idMeal, idDrink, strArea, strCategory, strAlcoholic, strDrink,
      strMeal, strDrinkThumb, strMealThumb } = recipeDetail[0];

    const objFavRecipe = {
      id: idMeal || idDrink,
      type: local.includes('meals') ? 'meal' : 'drink',
      nationality: strArea || '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic || '',
      name: strDrink || strMeal,
      image: strDrinkThumb || strMealThumb,
    };

    const newFavObj = [...localFavRec, objFavRecipe];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavObj));
  };

  const removeFromFavorite = (localFavRec) => {
    const verifying = localFavRec.filter((it) => it.id !== splitedId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(verifying));
  };

  const fillOrEmptyHeart = () => {
    const recoverFav = JSON.parse(localStorage.getItem('favoriteRecipes')) || []; // array vazio para não quebrar
    if (favorite === true) {
      removeFromFavorite(recoverFav);
    } else { saveFavoriteRecipe(recoverFav); }
    verifyIfIsFavorite();
  };

  useEffect(() => {
    const maxRecommendation = 6;

    const verifyPath = async () => {
      if (local.includes('meals')) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${splitedId}`);
        const data = await response.json();

        const response2 = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data2 = await response2.json();

        setRecipeDetail(data.meals);
        ingredientsAndMeasures(data.meals);
        setRecommend(data2.drinks.slice(0, maxRecommendation));
        setLoading(false);
      }
      if (local.includes('drinks')) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${splitedId}`);
        const data = await response.json();

        const response2 = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data2 = await response2.json();

        setRecipeDetail(data.drinks);
        ingredientsAndMeasures(data.drinks);
        setRecommend(data2.meals.slice(0, maxRecommendation));
        setLoading(false);
      }
    };
    verifyPath();
    verifyIfIsFavorite();
    verifyProgress();
  }, []);

  return (
    <main className="details-container">
      {loading ? <Loading /> : (
        recipeDetail.map((item) => (
          <CardDetails
            key={ item.strMeal || item.strDrink }
            title={ item.strMeal || item.strDrink }
            category={
              item.strAlcoholic
                ? `${item.strCategory} - ${item.strAlcoholic}`
                : item.strCategory
            }
            photo={ item.strMealThumb || item.strDrinkThumb }
            instructions={ item.strInstructions }
            ing={ ingredients.map((it, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ Math.random() }
              >
                {it}
              </li>
            )) }
            video={
              recipeDetail[0].strYoutube
                ? recipeDetail[0].strYoutube.replace('watch?v=', 'embed/')
                : ''
              // verificado em: https://stackoverflow.com/questions/21607808/convert-a-youtube-video-url-to-embed-code
            }
            buttons={
              <div className="button-container">
                {copied ? <p className="copied">Link copied! </p> : (
                  <button
                    className="share-button"
                    data-testid="share-btn"
                    onClick={ copyRecipePath }
                    type="button"
                  >
                    <img src={ shareIcon } alt="share icon" />
                  </button>
                )}
                <button
                  className="fav-button"
                  data-testid="favorite-btn"
                  onClick={ fillOrEmptyHeart }
                  src={ favorite ? blackHeart : whiteHeart }
                  type="button"
                >
                  <img src={ favorite ? blackHeart : whiteHeart } alt="heart icon" />
                </button>
              </div>
            }
          />
        )))}
      <div className="start-container">
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          onClick={ redirectRecipe }
        >
          {progress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      </div>
    </main>
  );
}

export default RecipeDetails;
