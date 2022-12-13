import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './styles/FavoriteRecipes.css';

const copyURL = require('clipboard-copy');

function FavoriteRecipes() {
  const responseFav = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [fav, setFav] = useState(responseFav);
  const [isCopied, setIsCopied] = useState('');

  const filterMeals = () => {
    const filterMeal = responseFav.filter((e) => e.type === 'meal');
    setFav(filterMeal);
  };

  const filterDrinks = () => {
    const filterDrink = responseFav.filter((e) => e.type === 'drink');
    setFav(filterDrink);
  };

  const filterAll = () => {
    setFav(responseFav);
  };

  const handleShare = (type, id) => {
    if (type === 'drink') {
      copyURL(`http://localhost:3000/drinks/${id}`);
      setIsCopied(id);
    } if (type === 'meal') {
      copyURL(`http://localhost:3000/meals/${id}`);
      setIsCopied(id);
    }
  };

  const handleFavorite = (id) => {
    const recoverFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newArr = recoverFav.filter((element) => element.id !== id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(newArr));
    setFav(newArr);
  };

  return (
    <div className="f-container">
      <Header headerText="Favorite Recipes" enableSearchButton={ false } />
      <div className="btn-container-filter">
        <button
          className="all-fav"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ filterAll }
        >
          All

        </button>
        <button
          className="meals-fav"
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ filterMeals }
        >
          Meals

        </button>
        <button
          className="drinks-fav"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ filterDrinks }
        >
          Drinks

        </button>
      </div>
      {
        fav
          .map((element, index) => {
            if (element.type === 'meal') {
              return (
                <div className="fav-container" key={ index }>
                  <Link to={ `/meals/${element.id}` }>
                    <img
                      className="img-fav"
                      data-testid={ `${index}-horizontal-image` }
                      src={ element.image }
                      alt={ element.name }
                    />
                  </Link>
                  <Link to={ `/meals/${element.id}` }>
                    <p
                      className="fav-title"
                      data-testid={ `${index}-horizontal-name` }
                    >
                      { element.name}
                    </p>
                  </Link>
                  <p
                    className="fav-category"
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { `${element.nationality} - ${element.category}` }
                  </p>
                  <div className="small-container">
                    <button
                      className="fav-fav"
                      type="button"
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      onClick={ () => handleFavorite(element.id) }
                      src="blackHeartIcon"
                    >
                      <img src={ blackHeartIcon } alt={ element.name } />
                    </button>
                    {
                      isCopied === element.id ? <p>Link copied!</p> : (
                        <button
                          className="share-fav"
                          type="button"
                          data-testid={ `${index}-horizontal-share-btn` }
                          onClick={ () => handleShare(element.type, element.id) }
                          src="shareIcon"
                        >
                          <img src={ shareIcon } alt={ element.name } />
                        </button>)
                    }
                  </div>
                </div>
              );
            }
            return (
              <div className="fav-container" key={ index }>
                <Link to={ `/drinks/${element.id}` }>
                  <img
                    className="img-fav"
                    data-testid={ `${index}-horizontal-image` }
                    src={ element.image }
                    alt={ element.name }
                  />
                </Link>
                <Link to={ `/drinks/${element.id}` }>
                  <p
                    className="fav-title"
                    data-testid={ `${index}-horizontal-name` }
                  >
                    { element.name}
                  </p>
                </Link>
                <p
                  className="fav-category"
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { element.alcoholicOrNot }
                </p>
                <div className="small-container">
                  <button
                    className="fav-fav"
                    type="button"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    onClick={ () => handleFavorite(element.id) }
                    src="blackHeartIcon"
                  >
                    <img src={ blackHeartIcon } alt={ element.name } />
                  </button>
                  {
                    isCopied === element.id ? <p>Link copied!</p> : (
                      <button
                        className="share-fav"
                        type="button"
                        data-testid={ `${index}-horizontal-share-btn` }
                        onClick={ () => handleShare(element.type, element.id) }
                        src="shareIcon"
                      >
                        <img src={ shareIcon } alt={ element.name } />
                      </button>
                    )
                  }
                </div>

              </div>
            );
          })
      }
    </div>
  );
}

export default FavoriteRecipes;
