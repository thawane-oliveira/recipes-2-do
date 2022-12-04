import { useHistory } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';
import CardDetails from './CardDetails';
import './styles/style.css';
import Loading from './Loading';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipeDetails() {
  const history = useHistory();
  const local = history.location.pathname;
  const splitedId = local.split('/')[2];
  const {
    recipeDetail, setRecipeDetail, setIngredients,
    setRecommend, setLoading, loading,
    progress, setProgress, copied, setCopied,
    favorite, setFavorite, ingredients,
  } = useContext(AppContext);

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
      || {
        drinks: {
        },
        meals: {
        }, // deixando um objeto vazio por enquanto porque ainda não chegamos no requisito 40;
      };

    if (local.includes('meals')) {
      const verifying = Object.keys(recoverInProgress.meals).includes(splitedId);
      setProgress(verifying);

      // const saveMeal = {
      //   drinks: {
      //     ...takeLocalRecipes.drinks,
      //   },
      //   meals: { ...takeLocalRecipes.meals,
      //     [splitedId]: ingredients,
      //   },
      // };
      // const verify = recoverProgress.some(() => recoverProgress.meals.id === splitedId);
      // setProgress(verify);

      // localStorage.setItem('inProgressRecipes', JSON.stringify(saveMeal));
    }
    if (local.includes('drinks')) {
      const verifying = Object.keys(recoverInProgress.drinks).includes(splitedId);
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
    }
  };

  // const verifyIfIsDone = () => {
  //   const recoverDone = JSON.parse(localStorage.getItem('inProgressRecipes'))
  //   || { kakyoin: { } };
  //   if (recoverDone === true) {
  //     setCompleted(true);
  //   } // função inicial para receitas prontas/finalizadas, maiores implementações nos requisitos seguintes
  // };

  const redirectRecipe = () => {
    if (local.includes('meals')) {
      history.push(`/meals/${splitedId}/in-progress`);
    }
    if (local.includes('drinks')) {
      history.push(`/drinks/${splitedId}/in-progress`);
    }
  };

  const copyRecipePath = () => {
    const copiedUrl = `http://localhost:3000${local}`;
    copy(copiedUrl);
    setCopied(true);
  };

  const verifyIfIsFavorite = () => {
    const recoverFav = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    // http://cangaceirojavascript.com.br/array-includes-vs-array-some/
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
    verifyProgress();
    // verifyIfIsDone();
    verifyIfIsFavorite();
  }, []);

  return (
    <>
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
            video={ history.location.pathname.includes('meals') && (
              recipeDetail.map((i) => (i.strYoutube?.replace('watch?v=', 'embed/') // verificado em: https://stackoverflow.com/questions/21607808/convert-a-youtube-video-url-to-embed-code
              ))) }
          />
        )))}
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        onClick={ redirectRecipe }
      >
        {progress ? 'Continue Recipe' : 'Start Recipe'}
      </button>
      <div className="button-container">
        {copied ? <p>Link copied! </p> : (
          <button
            data-testid="share-btn"
            onClick={ copyRecipePath }
            type="button"
          >
            <img src={ shareIcon } alt="share icon" />
          </button>
        )}
        <button
          data-testid="favorite-btn"
          onClick={ fillOrEmptyHeart }
          src={ favorite ? blackHeart : whiteHeart }
          type="button"
        >
          <img src={ favorite ? blackHeart : whiteHeart } alt="heart icon" />
        </button>
      </div>
    </>
  );
}

export default RecipeDetails;
