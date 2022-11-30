import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testes do Header', () => {
  it('Verifica se ao clicar no botão de search aparece um input de pesquisa. O outro botão da tela, de profile, deve redirecionar a rota inicial meals', async () => {
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

    const profileButton = await screen.findByTestId('profile-button');
    expect(profileButton).toBeVisible();

    const searchButton = await screen.findByTestId('search-button');

    userEvent.click(searchButton);

    const searchInput = await screen.findByTestId('search-input');
    expect(searchInput).toBeVisible();

    userEvent.click(searchButton);

    expect(searchInput).not.toBeVisible();

    userEvent.click(profileButton);

    const title = await screen.findByRole('heading', { name: /profile/i, level: 1 });

    expect(title).toBeVisible();
  });
});
