import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import AppProvider from '../context/AppProvider';
import renderWithRouter from '../services/renderWithRouter';

const emailId = 'email-input';
const passwordId = 'password-input';
const submitButtonId = 'login-submit-btn';

describe('Testes do Login', () => {
  it('Testa se os elementos aparecem na tela', () => {
    renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    const emailInput = screen.getByTestId(emailId);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId(passwordId);
    expect(passwordInput).toBeInTheDocument();

    const submitButton = screen.getByTestId(submitButtonId);
    expect(submitButton).toBeInTheDocument();
  });

  it('Testa se a pagina Login esta funcionando de acordo com o esperado', () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    const emailInput = screen.getByTestId(emailId);
    const passwordInput = screen.getByTestId(passwordId);
    const submitButton = screen.getByTestId(submitButtonId);

    userEvent.type(emailInput, 'trybe@trybe.com');
    userEvent.type(passwordInput, '1234567');

    expect(submitButton).toBeEnabled();
  });

  it('Testa se o botao redireciona para /meals', async () => {
    renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    const emailInput = screen.getByTestId(emailId);
    const passwordInput = screen.getByTestId(passwordId);
    const submitButton = screen.getByTestId(submitButtonId);

    userEvent.type(emailInput, 'trybe@trybe.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(submitButton);
  });
});
