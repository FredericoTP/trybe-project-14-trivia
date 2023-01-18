import React from 'react';
import { screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';
describe('feedbackPage Tests', () => {
  test('se a feedbackPage possui todos imputs', () => {
    const initialState = {
      login: { name: 'Bia', email: 'test@test.com' },
      player: { score: 110, assertions: 2 },
    };

    renderWithRouterAndRedux(<Feedback />, initialState);
    const inputImg = screen.getByTestId('header-profile-picture');
    const inputName = screen.getByTestId('header-player-name');
    const score = screen.getByTestId('header-score');
    const inputFeedback = screen.getByTestId('feedback-text');
    expect(inputImg).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(score).toBeInTheDocument();
    expect(inputFeedback).toBeInTheDocument();
  });

  test('se o button "play again" te retorna para "/".', async () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);
    const buttonPlayAgain = screen.getByTestId('btn-play-again');
    expect(buttonPlayAgain).toBeInTheDocument();
    userEvent.click(buttonPlayAgain)
    const { pathname } = history.location;
    expect(pathname).toBe("/");
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/')
    });
  });

  test('se o button "ranking" te retorna para "/ranking".', async () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);
    const buttonRanking = screen.getByTestId('btn-ranking');
    expect(buttonRanking).toBeInTheDocument();
    userEvent.click(buttonRanking)
    const { pathname } = history.location;
    expect(pathname).toBe("/");
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/rankings')
    });
  });
});