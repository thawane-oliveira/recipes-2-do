const requestCocktail = async () => {
  const url = 'https://xablau.com';

  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};

export default requestCocktail;
