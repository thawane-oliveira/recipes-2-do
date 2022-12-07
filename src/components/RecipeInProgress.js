import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import Loading from './Loading';
import './styles/style.css';
import CardProgress from './CardProgress';

const copy = require('clipboard-copy');

function RecipeInProgress() {
  const history = useHistory();
  const local = history.location.pathname;
  const splitedId = local.split('/')[2];
  const myLocal = local.includes('meals') ? 'meals' : 'drinks';

  const { recipeDetail, setRecipeDetail, ingredients, copied, setCopied, favorite,
    setFavorite, loading, setLoading, setIngredients, tickedIngredient,
    setTickedIngredient, completed, setCompleted } = useContext(AppContext);

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
  };

  const copyRecipePath = () => {
    copy(`http://localhost:3000${local.split('/in-')[0]}`);
    setCopied(true);
  };

  const verifyIfIsFavorite = () => {
    const recoverFav = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const verifying = recoverFav.some((item) => item.id === splitedId);
    setFavorite(verifying);
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
    const newFavObj = localFavRec.filter((it) => it.id !== splitedId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavObj));
  };

  const fillOrEmptyHeart = () => {
    const recoverFav = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favorite) {
      removeFromFavorite(recoverFav);
    } else {
      saveFavoriteRecipe(recoverFav);
    }
    verifyIfIsFavorite();
  };

  const redirectToDone = () => {
    const recoverDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];

    const { strTags, idMeal, idDrink, strArea, strCategory, strAlcoholic, strDrink,
      strMeal, strDrinkThumb, strMealThumb } = recipeDetail[0];

    const tag = strTags === null ? [] : strTags.split(',');

    const objDoneRecipe = {
      id: idMeal || idDrink,
      type: local.includes('meals') ? 'meal' : 'drink',
      nationality: strArea || '',
      category: strCategory || '',
      alcoholicOrNot: strAlcoholic || '',
      name: strDrink || strMeal,
      image: strDrinkThumb || strMealThumb,
      doneDate: new Date(),
      tags: tag,
    };

    const newDoneRecipe = [...recoverDone, objDoneRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipe));

    history.push('/done-recipes');
  };

  const returnLSProgressRecipes = () => JSON
    .parse(localStorage.getItem('inProgressRecipes')) || { drinks: {}, meals: {} };

  const verifyProgress = (newLocalStorage) => {
    const recoverInProgress = returnLSProgressRecipes();
    const saveRecipe = {
      ...recoverInProgress, [myLocal]: { [splitedId]: newLocalStorage },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(saveRecipe));
  };

  const retrieveLSProgressRecipes = () => {
    const locStor = returnLSProgressRecipes();
    const arrProgress = locStor[myLocal][splitedId] || [];
    const newObj = {};
    arrProgress.forEach((element) => {
      newObj[element] = true;
    });
    setTickedIngredient(newObj);
  };

  const verifyIngredient = (it) => {
    const newObj = tickedIngredient;

    newObj[it] = !newObj[it];
    setTickedIngredient(newObj);

    const newArr = Object.entries(newObj);
    const newLocStor = newArr.filter((item) => item[1] === true).map((item) => item[0]);
    const clickedItems = Object.values(newObj);

    const x = clickedItems.every((item) => item === true);
    if (clickedItems.length === ingredients.length && x === true) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
    verifyProgress(newLocStor);
  };

  const verifyPath = async () => {
    const urls = {
      meals: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
      drinks: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=',
    };

    const response = await fetch(`${urls[myLocal]}${splitedId}`);
    const data = await response.json();
    setRecipeDetail(data[myLocal]);
    ingredientsAndMeasures(data[myLocal]);
    setLoading(false);
  };

  useEffect(() => {
    verifyPath();
    verifyIfIsFavorite();
    retrieveLSProgressRecipes();
  }, []);

  return (
    <main>
      {loading ? <Loading /> : (
        recipeDetail.map((item) => (
          <CardProgress
            key={ Math.random() }
            title={ item.strMeal || item.strDrink }
            category={
              item.strAlcoholic
                ? `${item.strCategory} - ${item.strAlcoholic}`
                : item.strCategory
            }
            photo={ item.strMealThumb || item.strDrinkThumb }
            ing={ ingredients.map((it, index) => (

              <label
                key={ it }
                data-testid={ `${index}-ingredient-step` }
                htmlFor={ it }
              >
                <input
                  id={ it }
                  onChange={ () => verifyIngredient(it) }
                  checked={ tickedIngredient[it] }
                  type="checkbox"
                />
                {it}
              </label>
            )) }
            instructions={ item.strInstructions }
            shareBtn={ copied ? <p>Link copied! </p> : (
              <button
                data-testid="share-btn"
                onClick={ copyRecipePath }
                type="button"
              >
                <img src={ shareIcon } alt="share icon" />
              </button>
            ) }
            favBtn={
              <button
                data-testid="favorite-btn"
                onClick={ fillOrEmptyHeart }
                src={ favorite ? blackHeart : whiteHeart }
                type="button"
              >
                <img src={ favorite ? blackHeart : whiteHeart } alt="heart icon" />
              </button>
            }
            finishBtn={
              <button
                className="finish-btn"
                data-testid="finish-recipe-btn"
                disabled={ !completed }
                onClick={ redirectToDone }
                type="button"
              >
                Finish Recipe
              </button>
            }
          />
        ))
      )}
    </main>
  );
}

export default RecipeInProgress;
