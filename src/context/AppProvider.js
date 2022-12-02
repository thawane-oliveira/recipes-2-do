import PropTypes from 'prop-types';
import React, { useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import requestCocktail from '../services/requestCocktail';
import requestMeal from '../services/requestMeal';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [password, setPassword] = useState({
  });
  const [email, setEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [radioOption, setRadioOption] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [searchByFilter, setSearchByFilter] = useState({
    searchText: '',
    typeOfSearch: '',
  });
  const [path, setPath] = useState('');
  const [categories, setCategories] = useState([]);
  const [initialRecipes, setInitialRecipes] = useState([]);
  const [isCategory, setIsCategory] = useState(false);
  const [verifyCategory, setVerifyCategory] = useState('');
  const [recipeDetail, setRecipeDetail] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const minLength = 6;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(regex) && password.length > minLength) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  const history = useHistory();
  // verificado sobre uso de history no componente "pai" em: https://flaviocopes.com/react-router-uselocation-usehistory-undefined/

  const fetchAnswer = (fetch, url, id) => {
    if (fetch[url] === null) {
      const advice = 'Sorry, we haven\'t found any recipes for these filters.';
      global.alert(advice);
      return;
    }
    if (fetch[url].length === 1) {
      setRecipes(fetch[url]);
      const x = fetch[url][0][id];
      history.push(`/${url}/${x}`);
    } else if (fetch[url].length > 1) {
      setRecipes(fetch[url]);
    }
  };

  useEffect(() => {
    async function fetchApi() {
      const { searchText, typeOfSearch } = searchByFilter;
      if (searchText.length > 1 && typeOfSearch === 'first-letter-search') {
        global.alert('Your search must have only 1 (one) character');
        return;
      }
      if (path === '/drinks') {
        const fetch = await requestCocktail(searchText, typeOfSearch);
        fetchAnswer(fetch, 'drinks', 'idDrink');
      }
      if (path === '/meals') {
        const fetch = await requestMeal(searchText, typeOfSearch);
        fetchAnswer(fetch, 'meals', 'idMeal');
      }
    }
    fetchApi();
  }, [path, searchByFilter, history]);

  const infos = useMemo(() => ({
    password,
    setPassword,
    email,
    setEmail,
    isDisabled,
    searchInput,
    setSearchInput,
    radioOption,
    setRadioOption,
    searchByFilter,
    setSearchByFilter,
    recipes,
    setRecipes,
    path,
    setPath,
    categories,
    setCategories,
    initialRecipes,
    setInitialRecipes,
    isCategory,
    setIsCategory,
    verifyCategory,
    setVerifyCategory,
    recipeDetail,
    setRecipeDetail,
    ingredients,
    setIngredients,
  }), [
    email,
    isDisabled,
    password,
    searchInput,
    radioOption,
    searchByFilter,
    setSearchInput,
    recipes,
    setRecipes,
    path,
    setPath,
    categories,
    setCategories,
    initialRecipes,
    setInitialRecipes,
    isCategory,
    setIsCategory,
    verifyCategory,
    setVerifyCategory,
    recipeDetail,
    setRecipeDetail,
    ingredients,
    setIngredients,
  ]);

  return (
    <AppContext.Provider value={ infos }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default AppProvider;
