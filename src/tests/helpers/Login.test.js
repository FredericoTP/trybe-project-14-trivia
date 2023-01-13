import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux'
import Login from '../../pages/Login'

describe('loginPage Tests', () => {

  test('se a loginPage possui todos imputs', () => {
    renderWithRouterAndRedux(<Login />);
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const button = screen.getByTestId('btn-play');
    const buttonSettings = screen.getByTestId('btn-settings');
    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(buttonSettings).toBeInTheDocument();
  });

  test('se preenchidos os campos, botão fica habilitado.', () => {
    renderWithRouterAndRedux(<Login />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const button = screen.getByTestId('btn-play');
    userEvent.type(inputName, 'reginaldo');
    userEvent.type(inputEmail, 'teste123@teste.com');
    expect(button).not.toBeDisabled();
  });

  test('se o button "play" existe e te leva para /Game', async () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const button = screen.getByTestId('btn-play');
    userEvent.type(inputName, 'reginaldo');
    userEvent.type(inputEmail, 'teste123@teste.com');
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/game')
    });
  })

  test('se o button "Settings" existe e te leva para /settings', async () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    const buttonSettings = screen.getByTestId('btn-settings');
    expect(buttonSettings).toBeInTheDocument();
    userEvent.click(buttonSettings)
    const { pathname } = history.location;
    expect(pathname).toBe("/");
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/settings')
    });
  });

});