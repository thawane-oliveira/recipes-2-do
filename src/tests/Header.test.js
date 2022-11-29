import React from 'react';
import { render, screen, userEvent } from '@testing-library/react';
import App from '../App';

describe('Testes do Header', () => {
  it('Verifica se há um header com dois ícones, um deles tendo um botão. Ao clicar neste botão, o usuário deve ser direcionado para a página Profile', async () => {
    render(<App />);

    const button = screen.getByRole('button');

    userEvent.click(button);

    await waitFor(() => {
      const title = screen.getByRole('heading', { name: /profile/i, level: 1 });

      expect(title).toBeVisible();
    });
  });
});
