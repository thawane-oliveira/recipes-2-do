const requestMeal = async (searchText, typeOfSearch) => {
  if (typeOfSearch === 'first-letter-search') {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  if (typeOfSearch === 'ingredient-search') {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  if (typeOfSearch === 'name-search') {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
};

export default requestMeal;
