import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import AppProvider from '../context/AppProvider';
import renderWithRouter from '../services/renderWithRouter';

const emailId = 'email-input';
const passwordId = 'password-input';
const submitButtonId = 'login-submit-btn';

test('Testa se os elementos aparecem na tela', () => {
  render(
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

test('Testa se a pagina Login esta funcionando de acordo com o esperado', () => {
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

test('Testa se o botao redireciona para /meals', async () => {
  const { history } = renderWithRouter(
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

  const { location: { pathname } } = history;
  expect(pathname).toBe('/meals'); // Nao esta passando!
});
