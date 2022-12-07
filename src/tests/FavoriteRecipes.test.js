import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import FavoriteRecipes from '../components/FavoriteRecipes';

/* afterEach(() => {
  jest.clearAllMocks();
  cleanup();
}); */

const mockName = 'Kumpir';
const mockImg = 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg';

const bigMacImg = 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg';

const drinksFilterId = 'filter-by-drink-btn';

const recipeImageId = '0-horizontal-image';
const recipeNameId = '0-horizontal-name';

const drinkRecipeId = '3-horizontal-name';
const drinkFavBtnId = '3-horizontal-favorite-btn';

const clipboardMsg = 'Link copied!';

const mockRecipes = [
  {
    id: '52978',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: mockName,
    image: mockImg,
  },
  {
    id: '53013',
    type: 'meal',
    nationality: 'American',
    category: 'Beef',
    alcoholicOrNot: '',
    name: 'Big Mac',
    image: bigMacImg,
  },
  {
    id: '53065',
    type: 'meal',
    nationality: 'Japanese',
    category: 'Seafood',
    alcoholicOrNot: '',
    name: 'Sushi',
    image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
  },
  {
    id: '14610',
    type: 'drink',
    nationality: '',
    category: 'Shot',
    alcoholicOrNot: 'Alcoholic',
    name: 'ACID',
    image: 'https://www.thecocktaildb.com/images/media/drink/xuxpxt1479209317.jpg',
  },
];

describe('Testes do componente Favorite Recipes', () => {
  beforeEach(() => {
    global.localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));
  });

  it('Verifica os elementos do componente', () => {
    renderWithRouter(
      <FavoriteRecipes />,
    );

    const mealsFilter = screen.getByTestId('filter-by-meal-btn');
    expect(mealsFilter).toBeInTheDocument();

    const drinksFilter = screen.getByTestId(drinksFilterId);
    expect(drinksFilter).toBeInTheDocument();

    const filterAll = screen.getByTestId('filter-by-all-btn');
    expect(filterAll).toBeInTheDocument();

    const recipeTopText = screen.getByTestId('0-horizontal-top-text');
    expect(recipeTopText).toBeInTheDocument();

    const recipeImage = screen.getByTestId(recipeImageId);
    expect(recipeImage).toBeInTheDocument();

    const recipeName = screen.getByTestId(recipeNameId);
    expect(recipeName).toBeInTheDocument();

    const favoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();

    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();
  });

  it('Verifica o filtro Meals', () => {
    renderWithRouter(
      <FavoriteRecipes />,
    );

    const mealsFilter = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(mealsFilter);

    const firstRecipe = screen.getByTestId(recipeNameId);
    const secondRecipe = screen.getByTestId('1-horizontal-name');
    const thirdRecipe = screen.getByTestId('2-horizontal-name');

    expect(firstRecipe).toBeInTheDocument();
    expect(secondRecipe).toBeInTheDocument();
    expect(thirdRecipe).toBeInTheDocument();
  });

  it('Verifica os elementos do card de uma Meal', () => {
    renderWithRouter(
      <FavoriteRecipes />,
    );

    const recipeTopText = screen.getByTestId('0-horizontal-top-text');
    expect(recipeTopText.innerHTML).toBe('Turkish - Side');

    const recipeImage = screen.getByTestId(recipeImageId);
    expect(recipeImage).toHaveProperty('src', mockImg);

    const recipeName = screen.getByTestId(recipeNameId);
    expect(recipeName.innerHTML).toBe(mockName);

    const favoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', 'blackHeartIcon');
    expect(favoriteBtn.innerHTML).toBe('<img src="blackHeartIcon.svg" alt="Kumpir">');

    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(shareBtn).toHaveAttribute('src', 'shareIcon');
    expect(shareBtn.innerHTML).toBe('<img src="shareIcon.svg" alt="Kumpir">');
  });

  it('Verifica o filtro Drinks', () => {
    renderWithRouter(
      <FavoriteRecipes />,
    );

    const drinkRecipe = screen.getByTestId(drinkRecipeId);
    const drinksFilter = screen.getByTestId(drinksFilterId);

    userEvent.click(drinksFilter);

    expect(drinkRecipe.innerHTML).toBe('ACID');
  });

  it('Verifica os elementos do card de um Drink', () => {
    renderWithRouter(
      <FavoriteRecipes />,
    );

    const drinkTopText = screen.getByTestId('3-horizontal-top-text');
    expect(drinkTopText.innerHTML).toBe('Alcoholic');

    const drinkImage = screen.getByTestId('3-horizontal-image');
    expect(drinkImage).toHaveProperty('src', 'https://www.thecocktaildb.com/images/media/drink/xuxpxt1479209317.jpg');

    const drinkName = screen.getByTestId(drinkRecipeId);
    expect(drinkName.innerHTML).toBe('ACID');

    const favoriteBtn = screen.getByTestId(drinkFavBtnId);
    expect(favoriteBtn).toHaveAttribute('src', 'blackHeartIcon');
    expect(favoriteBtn.innerHTML).toBe('<img src="blackHeartIcon.svg" alt="ACID">');

    const shareBtn = screen.getByTestId('3-horizontal-share-btn');
    expect(shareBtn).toHaveAttribute('src', 'shareIcon');
    expect(shareBtn.innerHTML).toBe('<img src="shareIcon.svg" alt="ACID">');
  });

  it('Verifica o filtro All', () => {
    renderWithRouter(
      <FavoriteRecipes />,
    );

    const drinksFilter = screen.getByTestId('filter-by-drink-btn');
    const filterAll = screen.getByTestId('filter-by-all-btn');

    userEvent.click(drinksFilter);
    userEvent.click(filterAll);

    const mealRecipe = screen.getByTestId(recipeNameId);
    const drinkRecipe = screen.getByTestId(drinkRecipeId);

    expect(mealRecipe).toBeInTheDocument();
    expect(drinkRecipe).toBeInTheDocument();
  });

  it('Verifica o funcionamento das rotas ao clicar na imagem da receita', () => {
    const { history } = renderWithRouter(
      <FavoriteRecipes />,
    );

    const recipeImg = screen.getByTestId(recipeImageId);
    userEvent.click(recipeImg);

    expect(history.location.pathname).toBe('/meals/52978');
  });

  it('Verifica botao de desfavoritar para uma bebida', () => {
    renderWithRouter(
      <FavoriteRecipes />,
    );

    const favoriteBtn = screen.getByTestId(drinkFavBtnId);

    const recipeName = screen.getByTestId(drinkRecipeId);
    userEvent.click(favoriteBtn);

    expect(recipeName).not.toBeInTheDocument();

    const mockLocalStorage = JSON.parse(global.localStorage.getItem('favoriteRecipes'));

    expect(mockLocalStorage).toEqual([{
      alcoholicOrNot: '',
      category: 'Side',
      id: '52978',
      image: mockImg,
      name: 'Kumpir',
      nationality: 'Turkish',
      type: 'meal' },
    {
      alcoholicOrNot: '',
      category: 'Beef',
      id: '53013',
      image: bigMacImg,
      name: 'Big Mac',
      nationality: 'American',
      type: 'meal' },
    {
      alcoholicOrNot: '',
      category: 'Seafood',
      id: '53065',
      image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
      name: 'Sushi',
      nationality: 'Japanese',
      type: 'meal',
    }]);
  });

  it('Verifica botao de desfavoritar para uma comida', () => {
    renderWithRouter(
      <FavoriteRecipes />,
    );

    const favoriteBtn = screen.getByTestId(drinkFavBtnId);

    const recipeName = screen.getByTestId(drinkRecipeId);
    userEvent.click(favoriteBtn);

    expect(recipeName).not.toBeInTheDocument();

    const mealFavBtn = screen.getByTestId('2-horizontal-favorite-btn');

    const mealName = screen.getByTestId('2-horizontal-name');
    userEvent.click(mealFavBtn);

    expect(mealName).not.toBeInTheDocument();

    const mockLocalStorage = JSON.parse(global.localStorage.getItem('favoriteRecipes'));

    expect(mockLocalStorage).toEqual([{
      alcoholicOrNot: '',
      category: 'Side',
      id: '52978',
      image: mockImg,
      name: 'Kumpir',
      nationality: 'Turkish',
      type: 'meal' },
    {
      alcoholicOrNot: '',
      category: 'Beef',
      id: '53013',
      image: bigMacImg,
      name: 'Big Mac',
      nationality: 'American',
      type: 'meal' },
    ]);
  });

  it('Verifica clipboard e botao de compartilhar', () => {
    let clipData;

    global.navigator.clipboard = {
      writeText: jest.fn((data) => {
        clipData = data;
      }),
    };

    renderWithRouter(
      <FavoriteRecipes />,
    );

    const drinkShareBtn = screen.getByTestId('3-horizontal-share-btn');
    const mealShareBtn = screen.getByTestId('1-horizontal-share-btn');
    userEvent.click(mealShareBtn);

    expect(clipData).toContain('http://localhost:3000/meals/53013');
    expect(screen.getByText(clipboardMsg)).toBeInTheDocument();

    userEvent.click(drinkShareBtn);

    expect(clipData).toContain('http://localhost:3000/drinks/14610');
    expect(screen.getByText(clipboardMsg)).toBeInTheDocument();
  });
});
