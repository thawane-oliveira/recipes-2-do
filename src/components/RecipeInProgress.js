import { useContext, useEffect, useState } from 'react';
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

  const { recipeDetail, setRecipeDetail, ingredients,
    copied, setCopied, favorite, setFavorite,
    loading, setLoading, setIngredients,
    tickedIngredient, setTickedIngredient,
  } = useContext(AppContext);

  const [cboxIngredient, setCboxIngredient] = useState({});

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
    const copiedUrl = `http://localhost:3000${local.split('/in-')[0]}`;
    copy(copiedUrl);
    setCopied(true);
  };

  const verifyIfIsFavorite = () => {
    const recoverFav = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const verifying = recoverFav.some((item) => item.id === splitedId);

    if (verifying) { setFavorite(true); } else { setFavorite(false); }
  };

  const saveFavoriteRecipe = (localFavRec) => {
    const objFavRecipe = {
      id: recipeDetail[0].idMeal || recipeDetail[0].idDrink,
      type: local.includes('meals') ? 'meal' : 'drink',
      nationality: recipeDetail[0].strArea || '',
      category: recipeDetail[0].strCategory,
      alcoholicOrNot: recipeDetail[0].strAlcoholic || '',
      name: recipeDetail[0].strDrink || recipeDetail[0].strMeal,
      image: recipeDetail[0].strDrinkThumb || recipeDetail[0].strMealThumb,
    };
    const newFavRecipe = [...localFavRec, objFavRecipe];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavRecipe));
  };

  const removeFromFavorite = (localFavRec) => {
    const verifying = localFavRec.filter((it) => it.id !== splitedId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(verifying));
  };

  const fillOrEmptyHeart = () => {
    const recoverFav = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favorite === true) {
      removeFromFavorite(recoverFav);
    } else { saveFavoriteRecipe(recoverFav); }
    verifyIfIsFavorite();
  };

  const redirectToDone = () => {
    history.push('/done-recipes');
  };

  const verifyProgress = () => {
    const recoverInProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      drinks: {
      },
      meals: {
      },
    };

    if (local.includes('meals')) {
      const saveMeal = {
        drinks: {
          ...recoverInProgress.drinks,
        },
        meals: { ...recoverInProgress.meals,
          [splitedId]: tickedIngredient,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(saveMeal));
    }
    if (local.includes('drinks')) {
      const saveDrink = {
        drinks: {
          ...recoverInProgress.drinks,
          [splitedId]: tickedIngredient,
        },
        meals: {
          ...recoverInProgress.meals,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(saveDrink));
    }
  };

  const verifyIngredient = (it) => {
    const newObj = cboxIngredient;

    newObj[it] = !newObj[it];
    setCboxIngredient(newObj);
    verifyProgress();
  };

  useEffect(() => {
    const verifyPath = async () => {
      if (local.includes('meals')) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${splitedId}`);
        const data = await response.json();

        setRecipeDetail(data.meals);
        ingredientsAndMeasures(data.meals);
        setLoading(false);
      }
      if (local.includes('drinks')) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${splitedId}`);
        const data = await response.json();

        setRecipeDetail(data.drinks);
        ingredientsAndMeasures(data.drinks);
        setLoading(false);
      }
    };
    verifyPath();
    verifyIfIsFavorite();

    const myObj = {};
    ingredients.forEach((item) => {
      myObj[item] = false;
    });

    setCboxIngredient(myObj);
  }, []);

  return (
    <main>
      { loading ? <Loading /> : (
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
                  checked={ cboxIngredient[it] }
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
                data-testid="finish-recipe-btn"
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
