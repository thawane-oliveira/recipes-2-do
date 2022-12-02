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

    const corbaRecipeDiv = await screen.findByTestId('0-recipe-card');
    userEvent.click(corbaRecipeDiv);

    // await waitForElementToBeRemoved(loading);
    await waitFor(() => {
      const firstCarousel = screen.getByTestId('0-recommendation-card');
      expect(firstCarousel).toBeVisible();
    });

    const startBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(startBtn);
  });

  it('Testa se ao entrar na rota /meals, é possível entrar na tela de detalhes de uma receita', async () => {
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
});
