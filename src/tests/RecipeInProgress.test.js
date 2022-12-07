import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import DoneRecipes from '../components/DoneRecipes';

const mockName = 'Kumpir';
const mockImg = 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg';

const bigMacImg = 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg';

const drinksFilterId = 'filter-by-drink-btn';

const recipeImageId = '0-horizontal-image';
const recipeNameId = '0-horizontal-name';

const drinkRecipeId = '3-horizontal-name';
const drinkFavBtnId = '3-horizontal-favorite-btn';

const clipboardMsg = 'Link copied!';

const dataFinal = '2022-12-07T01:34:45.469Z';

const mockRecipes = [
  {
    id: '52978',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: mockName,
    image: mockImg,
    tags: ['Pasta', 'Curry'],
    doneDate: dataFinal,
  },
  {
    id: '53013',
    type: 'meal',
    nationality: 'American',
    category: 'Beef',
    alcoholicOrNot: '',
    name: 'Big Mac',
    image: bigMacImg,
    tags: ['Pasta', 'Curry'],
    doneDate: dataFinal,
  },
  {
    id: '53065',
    type: 'meal',
    nationality: 'Japanese',
    category: 'Seafood',
    alcoholicOrNot: '',
    name: 'Sushi',
    image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
    tags: ['Pasta', 'Curry'],
    doneDate: dataFinal,
  },
  {
    id: '17203',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Alcoholic',
    name: 'Kir',
    image: 'https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg',
    tags: ['IBA', 'ContemporanyClassic'],
    doneDate: dataFinal,
  },
];

describe('Testes do componente Done Recipes', () => {
  beforeEach(() => {
    global.localStorage.setItem('doneRecipes', JSON.stringify(mockRecipes));
  });

  it('Verifica os elementos do componente', () => {
    renderWithRouter(
      <DoneRecipes />,
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
      <DoneRecipes />,
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
      <DoneRecipes />,
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
      <DoneRecipes />,
    );

    const drinkRecipe = screen.getByTestId(drinkRecipeId);
    const drinksFilter = screen.getByTestId(drinksFilterId);

    userEvent.click(drinksFilter);

    expect(drinkRecipe.innerHTML).toBe('Kir');
  });

  it('Verifica os elementos do card de um Drink', () => {
    renderWithRouter(
      <DoneRecipes />,
    );

    const drinkTopText = screen.getByTestId('3-horizontal-top-text');
    expect(drinkTopText.innerHTML).toBe('Alcoholic');

    const drinkImage = screen.getByTestId('3-horizontal-image');
    expect(drinkImage).toHaveProperty('src', 'https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg');

    const drinkName = screen.getByTestId(drinkRecipeId);
    expect(drinkName.innerHTML).toBe('Kir');

    const favoriteBtn = screen.getByTestId(drinkFavBtnId);
    expect(favoriteBtn).toHaveAttribute('src', 'blackHeartIcon');
    expect(favoriteBtn.innerHTML).toBe('<img src="blackHeartIcon.svg" alt="Kir">');

    const shareBtn = screen.getByTestId('3-horizontal-share-btn');
    expect(shareBtn).toHaveAttribute('src', 'shareIcon');
    expect(shareBtn.innerHTML).toBe('<img src="shareIcon.svg" alt="Kir">');

    const tagOne = screen.getByTestId('3-IBA-horizontal-tag');
    const tagTwo = screen.getByTestId('3-ContemporanyClassic-horizontal-tag');

    expect(tagOne).toBeVisible();
    expect(tagTwo).toBeVisible();
  });

  it('Verifica o filtro All', () => {
    renderWithRouter(
      <DoneRecipes />,
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
      <DoneRecipes />,
    );

    const recipeImg = screen.getByTestId(recipeImageId);
    userEvent.click(recipeImg);

    expect(history.location.pathname).toBe('/meals/52978');
  });

  it('Verifica botao de desfavoritar para uma bebida', () => {
    renderWithRouter(
      <DoneRecipes />,
    );

    const favoriteBtn = screen.getByTestId(drinkFavBtnId);

    userEvent.click(favoriteBtn);
  });

  it('Verifica botao de desfavoritar para uma comida', () => {
    renderWithRouter(
      <DoneRecipes />,
    );

    const favoriteMealBtn = screen.getByTestId(drinkFavBtnId);

    userEvent.click(favoriteMealBtn);
  });

  it('Verifica clipboard e botão de compartilhar', () => {
    let clipData;

    global.navigator.clipboard = {
      writeText: jest.fn((data) => {
        clipData = data;
      }),
    };

    renderWithRouter(
      <DoneRecipes />,
    );

    const drinkShareBtn = screen.getByTestId('3-horizontal-share-btn');
    const mealShareBtn = screen.getByTestId('1-horizontal-share-btn');
    userEvent.click(mealShareBtn);

    expect(clipData).toContain('http://localhost:3000/meals/53013');
    expect(screen.getByText(clipboardMsg)).toBeInTheDocument();

    userEvent.click(drinkShareBtn);

    expect(clipData).toContain('http://localhost:3000/drinks/17203');
    expect(screen.getByText(clipboardMsg)).toBeInTheDocument();
  });
});
