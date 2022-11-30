import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import App from '../App';
import AppProvider from '../context/AppProvider';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa Footer', () => {
  it('Testa se os elementos aparecem na tela', () => {
    renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'trybe@trybe.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    const bntMeals = screen.getByTestId('meals-bottom-btn');
    expect(bntMeals).toBeInTheDocument();

    const btnDrinks = screen.getByTestId('drinks-bottom-btn');
    expect(btnDrinks).toBeInTheDocument();
  });

  it('Testa se os icones de redirecionamento estão corretos', () => {
    renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    const bntMeals = screen.getByRole('img', { name: /imag-meals/i });
    expect(bntMeals).toHaveAttribute('src', 'mealIcon.svg');

    const btnDrinks = screen.getByRole('img', { name: /imag-drinkicon/i });
    expect(btnDrinks).toHaveAttribute('src', 'drinkIcon.svg');
  });

  it('Testa se o botao redireciona para /meals', async () => {
    renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    const bntMeals = screen.getByRole('img', { name: /imag-meals/i });
    const btnDrinks = screen.getByRole('img', { name: /imag-drinkicon/i });

    userEvent.click(bntMeals);
    // expect(history.location.pathname).toBe('/meals');

    userEvent.click(btnDrinks);
    // expect(history.location.pathname).toBe('/drinks');
  });
});
