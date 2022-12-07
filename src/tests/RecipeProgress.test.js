import React from 'react';
import { screen, cleanup, act, waitForElementToBeRemoved, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import { mockMealById } from './mockMeals';
import { mockDrinkById } from './mockDrinks';

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const url = '/meals/52977/in-progress';
const urlDrinks = '/drinks/15997/in-progress';
const favBtn = 'favorite-btn';
const whiteIcon = 'whiteHeartIcon.svg';

describe('Testes do componente Recipe In Progress', () => {
  it('Testa se há um botão de copiar/compartilhar receita', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch
      .mockResolvedValueOnce(
        { json: jest.fn().mockResolvedValue(mockMealById) },
      );

    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: () => { },
      },
    });

    const { history } = renderWithRouter(
      <App />,
    );

    act(() => {
      history.push(url);
    });

    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeVisible();
    userEvent.click(shareBtn);

    const copyText = await screen.findByText('Link copied!');
    expect(copyText).toBeVisible();
  });

  it('Testa se há um botão de favoritar receita, favoritando e desfavoritando um item na rota meals', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce(
      { json: jest.fn().mockResolvedValue(mockMealById) },
    );

    const { history } = renderWithRouter(
      <App />,
    );

    act(() => {
      history.push(url);
    });

    const loading = screen.getByRole('heading', { name: /loading.../i, level: 1 });
    expect(loading).toBeVisible();
    await waitForElementToBeRemoved(loading);

    const favoriteBtn1 = screen.getByTestId(favBtn);

    fireEvent.click(favoriteBtn1);
    expect(favoriteBtn1).toHaveAttribute('src', whiteIcon);

    const favoriteBtn2 = await screen.findByTestId(favBtn);
    fireEvent.click(favoriteBtn2);
    expect(favoriteBtn2).toHaveAttribute('src', 'blackHeartIcon.svg');

    fireEvent.click(favoriteBtn2);
    expect(favoriteBtn1).toHaveAttribute('src', whiteIcon);
  });

  it('Testa se há checkbox na mesma quantidade de ingredientes. Se todas forem clicadas, o botão finish recipe é ativado', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce(
      { json: jest.fn().mockResolvedValue(mockMealById) },
    );

    const { history } = renderWithRouter(
      <App />,
    );

    act(() => {
      history.push(url);
    });

    const loading = screen.getByRole('heading', { name: /loading.../i, level: 1 });
    expect(loading).toBeVisible();
    await waitForElementToBeRemoved(loading);

    const allInput = screen.getAllByRole('checkbox');
    expect(allInput).toHaveLength(13);

    allInput.forEach((input) => userEvent.click(input));

    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishBtn).toBeEnabled();
    userEvent.click(finishBtn);
  });

  it('Testa a página de meals se há checkbox na mesma quantidade de ingredientes e clicar em todas as checkboxes', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce(
      { json: jest.fn().mockResolvedValue(mockMealById) },
    );

    const { history } = renderWithRouter(
      <App />,
    );

    act(() => {
      history.push(url);
    });

    const loading = screen.getByRole('heading', { name: /loading.../i, level: 1 });
    expect(loading).toBeVisible();
    await waitForElementToBeRemoved(loading);

    const allInput = screen.getAllByRole('checkbox');
    expect(allInput).toHaveLength(13);

    allInput.forEach((input) => userEvent.click(input));
  });

  it('Testa a página de drinks de maneira completa, rodando todos os testes feitos separadamente na rota meals em um único teste', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce(
      { json: jest.fn().mockResolvedValue(mockDrinkById) },
    );

    const { history } = renderWithRouter(
      <App />,
    );

    act(() => {
      history.push(urlDrinks);
    });

    const loading = screen.getByRole('heading', { name: /loading.../i, level: 1 });
    expect(loading).toBeVisible();
    await waitForElementToBeRemoved(loading);

    const allInput = screen.getAllByRole('checkbox');
    expect(allInput).toHaveLength(3);

    allInput.forEach((input) => userEvent.click(input));

    const favoriteBtn1 = screen.getByTestId(favBtn);

    fireEvent.click(favoriteBtn1);
    expect(favoriteBtn1).toHaveAttribute('src', whiteIcon);

    const favoriteBtn2 = await screen.findByTestId(favBtn);
    fireEvent.click(favoriteBtn2);
    expect(favoriteBtn2).toHaveAttribute('src', 'blackHeartIcon.svg');

    fireEvent.click(favoriteBtn2);
    expect(favoriteBtn1).toHaveAttribute('src', whiteIcon);

    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishBtn).toBeEnabled();
    userEvent.click(finishBtn);

    // act(() => {
    //   history.push(url);
    // });

    // expect(allInput).toHaveLength(3);

    // const finishBtn = await screen.findByTestId('finish-recipe-btn');
    // expect(finishBtn).toBeEnabled();
    // userEvent.click(finishBtn);
  });
});
