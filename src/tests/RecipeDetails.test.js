import React from 'react';
import { screen, cleanup, act, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
// import mockMeals from './mockMeals';
// import mockMealsCategory from './mockMealsCategory';

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe('Testes do componente Recipes', () => {
  it('Testa se ao entrar na rota /meals, é possível entrar na tela de detalhes de uma receita', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    act(() => {
      history.push('/meals');
    });

    const drinkTitle = screen.getByRole('heading', { name: /meals/i });
    expect(drinkTitle).toBeVisible();

    const loading = screen.getAllByRole('heading', { name: /loading.../i, level: 1 });
    expect(loading[0]).toBeVisible();
    await waitForElementToBeRemoved(loading[0]);

    const ggRecipeDiv = await screen.findByTestId('0-recipe-card');
    userEvent.click(ggRecipeDiv);

    // await waitForElementToBeRemoved(loading);
    await waitFor(() => {
      const firstCarousel = screen.getByTestId('0-recommendation-card');
      expect(firstCarousel).toBeVisible();
    });

    const startBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(startBtn);
  });

  it('Testa se ao entrar na rota /drinks, é possível entrar na tela de detalhes de uma receita', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    act(() => {
      history.push('/drinks');
    });

    const drinkTitle = screen.getByRole('heading', { name: /drinks/i });
    expect(drinkTitle).toBeVisible();

    const loading = screen.getAllByRole('heading', { name: /loading.../i, level: 1 });
    expect(loading[0]).toBeVisible();
    await waitForElementToBeRemoved(loading[0]);

    const ggRecipeDiv = await screen.findByTestId('0-recipe-card');
    userEvent.click(ggRecipeDiv);

    // await waitForElementToBeRemoved(loading);
    await waitFor(() => {
      const firstCarousel = screen.getByTestId('0-recommendation-card');
      expect(firstCarousel).toBeVisible();
    });

    const startBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(startBtn);
  });

  it('Testa se há um botão de copiar/compartilhar receita', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: () => {},
      },
    }); // https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest

    const { history } = renderWithRouter(
      <App />,
    );

    act(() => {
      history.push('/meals/52977');
    });

    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeVisible();
    userEvent.click(shareBtn);

    const copyText = await screen.findByText('Link copied!');
    expect(copyText).toBeVisible();
  });

  it('Testa se há um botão de favoritar receita', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    act(() => {
      history.push('/meals/52977');
    });

    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');

    // const recoverFav = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    // const bigMacArr = { id: '53013', type: 'meal', nationality: 'American', category: 'Beef', alcoholicOrNot: '', name: 'Big Mac', image: 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg' };

    // const newFavRecipe = [...recoverFav, bigMacArr];
    // localStorage.setItem('favoriteRecipes', JSON.stringify(newFavRecipe));

    // JSON.parse(localStorage.getItem('favoriteRecipes'));

    // // expect(fav).toHaveLength(1);

    // userEvent.click(favoriteBtn);

    expect(favoriteBtn).toBeVisible();
  });
});
