import React from 'react';
import { render, screen, userEvent } from '@testing-library/react';
import App from '../App';

describe('Testes do Header', () => {
  it('Verifica se há um header com dois ícones, um deles tendo um botão. Ao clicar neste botão, o usuário deve ser direcionado para a página Profile', async () => {
    render(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'gappy@soft.wet');
    userEvent.type(passwordInput, 123456);
    userEvent.click(loginButton);

    const profileButton = await screen.findByTestId('profile-button');

    userEvent.click(profileButton);

    const title = await screen.findByRole('heading', { name: /profile/i, level: 1 });

    expect(title).toBeVisible();
  });

  it('Verifica se um input de pesquisa é exibido após clicar no botão de search. Clicando no botão de novo, esse input deve sumir', async () => {
    render(<App />);

    const searchButton = screen.getByTestId('search-button');

    userEvent.click(searchButton);

    const searchInput = await screen.findByTestId('search-input');
    expect(searchInput).toBeVisible();

    userEvent.click(searchButton);

    expect(searchInput).not.toBeVisible();
  });
});
