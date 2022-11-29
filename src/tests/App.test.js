import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import AppProvider from '../context/AppProvider';

test('Testa se os elementos aparecem na tela', () => {
  render(
    <AppProvider>
      <App />
    </AppProvider>,
  );

  const emailInput = screen.getByTestId('email-input');
  expect(emailInput).toBeInTheDocument();

  const passwordInput = screen.getByTestId('password-input');
  expect(passwordInput).toBeInTheDocument();

  const submitButton = screen.getByTestId('login-submit-btn');
  expect(submitButton).toBeInTheDocument();
});

test('Testa se a pagina Login esta funcionando de acordo com o esperado', () => {
  render(
    <AppProvider>
      <App />
    </AppProvider>,
  );

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const submitButton = screen.getByTestId('login-submit-btn');

  userEvent.type(emailInput, 'trybe@trybe.com');
  userEvent.type(passwordInput, '1234567');

  expect(submitButton).toBeEnabled();
});
