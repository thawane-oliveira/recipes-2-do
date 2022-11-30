import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testes do SearchBar', () => {
  it('Verifica se ', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');
    const { pathname } = history.location;
    expect(pathname).toBe('/');

    userEvent.type(emailInput, 'gappy@soft.wet');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    const searchButton = await screen.findByTestId('search-button');
    userEvent.click(searchButton);

    const searchInput = await screen.findByTestId('search-input');
    expect(searchInput).toBeVisible();
    userEvent.type(searchInput, 'chicken');

    const ingredientRadio = await screen.findByTestId('ingredient-search-radio');
    expect(ingredientRadio).toBeInTheDocument();
    userEvent.click(ingredientRadio);

    const filterSearchButton = await screen.findByTestId('exec-search-btn');
    userEvent.click(filterSearchButton);
  });
});
