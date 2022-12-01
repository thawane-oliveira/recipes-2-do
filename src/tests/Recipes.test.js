import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

const email = 'email-input';
const password = 'password-input';
const loginBtn = 'login-submit-btn';
const userEmail = 'trybe@trybe.com';

describe('Testes do componente Recipes', () => {
  it('Testa se ao entrar na rota /meals, são exibidas opções de comida e 5 botões de categorias', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const loginButton = screen.getByTestId(loginBtn);

    userEvent.type(emailInput, userEmail);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    expect(history.location.pathname).toBe('/meals');

    const initialRecipeImg = await screen.findByTestId('0-card-img');
    expect(initialRecipeImg).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');
    expect(initialRecipeImg).toHaveAttribute('alt', 'Corba');

    const beefButton = await screen.findByTestId('Beef-category-filter');
    const breakfastButton = await screen.findByTestId('Breakfast-category-filter');
    const chickenButton = await screen.findByTestId('Chicken-category-filter');
    const dessertButton = await screen.findByTestId('Dessert-category-filter');
    const goatButton = await screen.findByTestId('Goat-category-filter');

    userEvent.click(beefButton);
    userEvent.click(breakfastButton);
    userEvent.click(chickenButton);
    userEvent.click(dessertButton);
    userEvent.click(goatButton);
  });

  it('Testa se ao entrar na rota /drinks, são exibidas opções de bebidas e 5 botões de categorias', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const loginButton = screen.getByTestId(loginBtn);

    userEvent.type(emailInput, userEmail);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkButton);

    const drinkTitle = screen.getByRole('heading', { name: /drinks/i });
    expect(drinkTitle).toBeVisible();

    expect(history.location.pathname).toBe('/drinks');

    const initialRecipeImg = await screen.findByTestId('0-card-img');
    expect(initialRecipeImg).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');
    expect(initialRecipeImg).toHaveAttribute('alt', 'GG');

    // const ordinaryButton = screen.getByTestId('Ordinary Drink-category-filter');
    const cocktailButton = await screen.findByTestId('Cocktail-category-filter');
    const shakeButton = await screen.findByTestId('Shake-category-filter');
    const otherButton = await screen.findByTestId('Other/Unknown-category-filter');
    const cocoaButton = await screen.findByTestId('Cocoa-category-filter');

    // userEvent.click(ordinaryButton);
    userEvent.click(cocktailButton);
    userEvent.click(shakeButton);
    userEvent.click(otherButton);
    userEvent.click(cocoaButton);
  }, 100000);
});
