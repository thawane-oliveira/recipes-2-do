import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

const emailId = 'email-input';
const passwordId = 'password-input';
const submitButtonId = 'login-submit-btn';
const profileBtn = 'profile-button';

describe('Testes do componente Profile', () => {
  it('Verifica se há um botão que direciona para a rota de receitas favoritas', async () => {
    renderWithRouter(
      <App />,
    );

    const emailInput = screen.getByTestId(emailId);
    const passwordInput = screen.getByTestId(passwordId);
    const submitButton = screen.getByTestId(submitButtonId);

    userEvent.type(emailInput, 'trybe@trybe.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(submitButton);

    const profileButton = await screen.findByTestId(profileBtn);
    userEvent.click(profileButton);

    const favButton = await screen.findByTestId('profile-favorite-btn');

    userEvent.click(favButton);
    userEvent.click(profileButton);
  });

  it('Verifica se há um botão que direciona para a rota de receitas feitas', async () => {
    renderWithRouter(
      <App />,
    );

    const emailInput = screen.getByTestId(emailId);
    const passwordInput = screen.getByTestId(passwordId);
    const submitButton = screen.getByTestId(submitButtonId);

    userEvent.type(emailInput, 'teste@trybe.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(submitButton);

    const profileButton = await screen.findByTestId(profileBtn);
    userEvent.click(profileButton);

    const doneButton = await screen.findByTestId('profile-done-btn');

    userEvent.click(doneButton);
    userEvent.click(profileButton);
  });

  it('Verifica se há um botão que desloga o usuário', async () => {
    renderWithRouter(
      <App />,
    );

    const emailInput = screen.getByTestId(emailId);
    const passwordInput = screen.getByTestId(passwordId);
    const submitButton = screen.getByTestId(submitButtonId);

    userEvent.type(emailInput, 't234@trybe.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(submitButton);

    const profileButton = await screen.findByTestId(profileBtn);
    userEvent.click(profileButton);

    const logoutBtn = await screen.findByTestId('profile-logout-btn');

    userEvent.click(logoutBtn);
  });
});
