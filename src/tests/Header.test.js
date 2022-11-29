import React from 'react';
import { render, screen, userEvent } from '@testing-library/react';
import App from '../App';

describe('Testes do Header', () => {
  it('Verifica se há um header com dois ícones, um deles tendo um botão. Ao clicar neste botão, o usuário deve ser direcionado para a página Profile', async () => {
    render(<App />);

    const profileButton = screen.getByTestId('profile-button');

    userEvent.click(profileButton);

    await waitFor(() => {
      const title = screen.getByRole('heading', { name: /profile/i, level: 1 });

      expect(title).toBeVisible();
    });
  });

  it('Verifica se um input de pesquisa é exibido após clicar no botão de search', async () => {
    render(<App />);

    const searchButton = screen.getByTestId('search-button');

    userEvent.click(searchButton);

    await waitFor(() => {
      const searchInput = screen.getByTestId('search-input');

      expect(searchInput).toBeVisible();
    });
  });
});
