import React from 'react';
import { screen, cleanup, act, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import { mockDrinkById, mockDrinksRecomendations } from './mockDrinks';
import { mockMealById, mockMealsRecomendations } from './mockMeals';
// import mockMeals from './mockMeals';
// import mockMealsCategory from './mockMealsCategory';

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const meals52997 = '/meals/52977';

describe('Testes do componente Recipes', () => {
  it('Testa se ao entrar na rota /meals, é possível entrar na tela de detalhes de uma receita', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce(
      { json: jest.fn().mockResolvedValue(mockMealById) },
    );
    global.fetch.mockResolvedValueOnce(
      { json: jest.fn().mockResolvedValue(mockMealsRecomendations) },
    );

    const { history } = renderWithRouter(
      <App />,
    );

    act(() => {
      history.push(meals52997);
    });

    const loading = screen.getAllByRole('heading', { name: /loading.../i, level: 1 });
    expect(loading[0]).toBeVisible();
    await waitForElementToBeRemoved(loading[0]);

    const firstCarousel = await screen.findByTestId('1-recommendation-card');
    expect(firstCarousel).toBeVisible();

    const startBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(startBtn);

    expect(history.location.pathname).toBe('/meals/52977/in-progress');
  });

  it('Testa se ao entrar na rota /drinks, é possível entrar na tela de detalhes de uma receita', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce(
      { json: jest.fn().mockResolvedValue(mockDrinkById) },
    );
    global.fetch.mockResolvedValueOnce(
      { json: jest.fn().mockResolvedValue(mockDrinksRecomendations) },
    );

    const { history } = renderWithRouter(
      <App />,
    );

    act(() => {
      history.push('drinks/15977');
    });

    const loading = screen.getAllByRole('heading', { name: /loading.../i, level: 1 });
    expect(loading[0]).toBeVisible();
    await waitForElementToBeRemoved(loading[0]);

    await waitFor(() => {
      const firstCarousel = screen.getByTestId('2-recommendation-card');
      expect(firstCarousel).toBeVisible();
    });

    const startBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(startBtn);

    expect(history.location.pathname).toBe('/drinks/15977/in-progress');
  });

  it('Testa se há um botão de copiar/compartilhar receita', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce(
      { json: jest.fn().mockResolvedValue(mockMealById) },
    );
    global.fetch.mockResolvedValueOnce(
      { json: jest.fn().mockResolvedValue(mockMealsRecomendations) },
    );

    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: () => { },
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

  it('Testa se há um botão de favoritar receita, favoritando e desfavoritando um item na rota drinks', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce(
      { json: jest.fn().mockResolvedValue(mockDrinkById) },
    );
    global.fetch.mockResolvedValueOnce(
      { json: jest.fn().mockResolvedValue(mockDrinksRecomendations) },
    );

    const { history } = renderWithRouter(
      <App />,
    );

    act(() => {
      history.push('/drinks/15997');
    });

    const loading = screen.getAllByRole('heading', { name: /loading.../i, level: 1 });
    expect(loading[0]).toBeVisible();
    await waitForElementToBeRemoved(loading[0]);

    // await waitFor(() => {
    const firstCarousel = await screen.findByTestId('0-recommendation-card');
    expect(firstCarousel).toBeVisible();
    // });

    const favoriteBtn = screen.getByTestId('favorite-btn');

    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', 'blackHeartIcon.svg');

    userEvent.click(favoriteBtn);
  });

  it('Testa se há um botão de favoritar receita, favoritando e desfavoritando um item na rota meals', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce(
      { json: jest.fn().mockResolvedValue(mockMealById) },
    );
    global.fetch.mockResolvedValueOnce(
      { json: jest.fn().mockResolvedValue(mockMealsRecomendations) },
    );

    const { history } = renderWithRouter(
      <App />,
    );

    act(() => {
      history.push(meals52997);
    });

    const loading = screen.getAllByRole('heading', { name: /loading.../i, level: 1 });
    expect(loading[0]).toBeVisible();
    await waitForElementToBeRemoved(loading[0]);

    const firstCarousel = await screen.findByTestId('0-recommendation-card');
    expect(firstCarousel).toBeVisible();

    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');

    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', 'blackHeartIcon.svg');

    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
  });
});
