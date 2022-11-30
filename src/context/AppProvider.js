import PropTypes from 'prop-types';
import React, { useEffect, useState, useMemo } from 'react';
import requestCocktail from '../services/requestCocktail';
import requestMeal from '../services/requestMeal';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [password, setPassword] = useState('');
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

  useEffect(() => {
    const minLength = 6;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(regex) && password.length > minLength) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  useEffect(() => {
    async function fetchApi() {
      const { searchText, typeOfSearch } = searchByFilter;
      if (searchText.length > 1 && typeOfSearch === 'first-letter-search') {
        const advice = global.alert('Your search must have only 1 (one) character');
        return advice;
      }
      if (path === '/drinks') {
        const fetch = await requestCocktail(searchText, typeOfSearch);
        return fetch;
      }
      if (path === '/meals') {
        const fetch = await requestMeal(searchText, typeOfSearch);
        console.log('fetch', fetch);
        setRecipes(fetch);
        return fetch;
      }
    }
    fetchApi();
  });

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
