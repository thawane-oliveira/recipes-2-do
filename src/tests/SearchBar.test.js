import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

const searchBtn = 'search-button';
const searchInpt = 'search-input';
const applyFtr = 'exec-search-btn';
const nameSearch = 'name-search-radio';

describe('Testes do SearchBar', () => {
  it('Verifica se todos os botões e inputs são passíveis de clique ou escrita', async () => {
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

    const searchButton = await screen.findByTestId(searchBtn);
    userEvent.click(searchButton);

    const searchInput = await screen.findByTestId(searchInpt);
    expect(searchInput).toBeVisible();
    userEvent.type(searchInput, 'chicken');

    const ingredientRadio = await screen.findByTestId('ingredient-search-radio');
    expect(ingredientRadio).toBeInTheDocument();
    userEvent.click(ingredientRadio);

    const filterSearchButton = await screen.findByTestId(applyFtr);
    userEvent.click(filterSearchButton);
  });

  it('Verifica se ao digitar mais de uma letra na bsuca por first letter é exibido um aviso/alert', async () => {
    renderWithRouter(
      <App />,
    );
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'gappy@soft.wet');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);

    const searchButton = await screen.findByTestId(searchBtn);
    userEvent.click(searchButton);

    const firstLetterRadio = await screen.findByTestId('first-letter-search-radio');
    userEvent.click(firstLetterRadio);

    const searchInput = await screen.findByTestId(searchInpt);
    expect(searchInput).toBeVisible();
    userEvent.type(searchInput, 'ch');

    const filterSearchButton = await screen.findByTestId(applyFtr);
    userEvent.click(filterSearchButton);
  });

  it('Verifica se ao digitar o nome de uma receita/ingrediente que aparece só em uma receita, o usuário é direcionado para a tela de detalhes', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    act(() => {
      history.push('/drinks');
    });

    const searchButton = await screen.findByTestId(searchBtn);
    userEvent.click(searchButton);

    const nameRadio = await screen.findByTestId(nameSearch);
    userEvent.click(nameRadio);

    const searchInput = await screen.findByTestId(searchInpt);
    userEvent.type(searchInput, 'Tomato Tang');

    const filterSearchButton = await screen.findByTestId(applyFtr);
    userEvent.click(filterSearchButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/12726');
    });
  });

  it('Verifica se ao digitar algum ingrediente/nome que não conste na API, retorna um alert', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    act(() => {
      history.push('/meals');
    });

    const searchButton = await screen.findByTestId(searchBtn);
    userEvent.click(searchButton);

    const nameRadio = await screen.findByTestId(nameSearch);
    userEvent.click(nameRadio);

    const searchInput = await screen.findByTestId(searchInpt);
    userEvent.type(searchInput, 'guava');

    const filterSearchButton = await screen.findByTestId(applyFtr);
    userEvent.click(filterSearchButton);
  });

  it('x', async () => {
    const { history } = renderWithRouter(
      <App />,
    );

    act(() => {
      history.push('/meals');
    });

    const searchButton = await screen.findByTestId(searchBtn);
    userEvent.click(searchButton);

    const nameRadio = await screen.findByTestId(nameSearch);
    userEvent.click(nameRadio);

    const searchInput = await screen.findByTestId(searchInpt);
    userEvent.type(searchInput, 'egg');

    const filterSearchButton = await screen.findByTestId(applyFtr);
    userEvent.click(filterSearchButton);

    await waitFor(() => {
      userEvent.click(searchButton);
      const ingredientRadio = screen.getByTestId('ingredient-search-radio');
      userEvent.click(ingredientRadio);
    });

    userEvent.type(searchInput, 'guava');

    userEvent.click(filterSearchButton);

    await waitFor(() => {
      userEvent.click(searchButton);
      const firstLetter = screen.getByTestId('first-letter-search-radio');
      userEvent.click(firstLetter);
    });

    userEvent.type(searchInput, 'a');

    userEvent.click(filterSearchButton);
  });
});
