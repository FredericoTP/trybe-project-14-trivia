import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';

describe('rankingPage Tests', () => {
  test('se o botão redireciona para "/"', async () => {
    const { history } = renderWithRouterAndRedux(<Ranking />);
    const buttonHome = screen.getByTestId('btn-go-home');
    expect(buttonHome).toBeInTheDocument();
    userEvent.click(buttonHome)
    const { pathname } = history.location;
    expect(pathname).toBe("/");
  });

  test('se renderiza corretamente', () => {
    renderWithRouterAndRedux(<Ranking />);
    const title = screen.getByText('Ninguem jogou ainda')
    expect(title).toBeInTheDocument();
  });

  test('se renderiza o player no ranking', () => {
    const player = [{ name: 'Bia', email: 'test@test.com', score: 106 }];

    localStorage.setItem('players', JSON.stringify(player));
    renderWithRouterAndRedux(<Ranking />);
    const name = screen.getByTestId('player-name-0');
    const score = screen.getByTestId('player-score-0');
    const image = screen.getByTestId('player-image');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Bia');
    expect(score).toBeInTheDocument();
    expect(score).toHaveTextContent('106');
    expect(image).toBeInTheDocument();
  })

  test('se renderiza os players corretamente', () => {
    const player = [{ name: 'Bia', email: 'test@test.com', score: 106 }, { name: 'Pedro', email: 'test@test.com', score: 200 }];
    localStorage.setItem('players', JSON.stringify(player));
    renderWithRouterAndRedux(<Ranking />);
    const nameOne = screen.getByTestId('player-name-0');
    const scoreOne = screen.getByTestId('player-score-0');
    const nameTwo = screen.getByTestId('player-name-1');
    const scoreTwo = screen.getByTestId('player-score-1');
    const image = screen.getAllByTestId('player-image');
    expect(nameOne).toBeInTheDocument();
    expect(nameOne).toHaveTextContent('Pedro');
    expect(scoreOne).toBeInTheDocument();
    expect(scoreOne).toHaveTextContent('200');
    expect(nameTwo).toBeInTheDocument();
    expect(nameTwo).toHaveTextContent('Bia');
    expect(scoreTwo).toBeInTheDocument();
    expect(scoreTwo).toHaveTextContent('106');
    expect(image).toHaveLength(2);
  })
});