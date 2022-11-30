import PropTypes from 'prop-types';
import React, { useEffect, useState, useMemo } from 'react';
// import { useHistory, useLocation } from 'react-router-dom';
// import requestMeal from '../services/requestMeal';
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

  useEffect(() => {
    const minLength = 6;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(regex) && password.length > minLength) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  // const history = useHistory();

  // useEffect(() => {
  //   async function fetchApi() {
  //     const { searchText, typeOfSearch } = searchByFilter;
  //     if (pathname === '/drinks') {
  //       const fetch = await requestMeal(searchText, typeOfSearch);
  //       return fetch;
  //     }
  //     if (pathname === '/meals') {
  //       const fetch = await requestMeal(searchText, typeOfSearch);
  //       setRecipes(fetch);
  //       return fetch;
  //     }
  //     if (searchText.length > 1 && typeOfSearch === 'first-letter-search') {
  //       const advice = global.alert('Your search must have only 1 (one) character');
  //       return advice;
  //     }
  //   }
  //   fetchApi();
  // }, [searchByFilter]);

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
