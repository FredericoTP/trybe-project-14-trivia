import Settings from "../pages/Settings";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

describe('Teste Settings', () => {
  test('é renderizado corretamente', () => {
    renderWithRouterAndRedux(<Settings />)
    const title = screen.getByTestId('settings-title');
    expect(title).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /página inicial/i });
    expect(link).toBeInTheDocument();

    const selectCategories = screen.getByRole('combobox', { name: /categories:/i })
    expect(selectCategories).toBeInTheDocument();
    expect(selectCategories).toHaveValue('any');

    const selectDifficulty = screen.getByRole('combobox', { name: /difficulty/i });
    expect(selectDifficulty).toBeInTheDocument();
    expect(selectDifficulty).toHaveValue('any');

    userEvent.selectOptions(selectDifficulty, 'hard');
    expect(selectDifficulty).toHaveValue('hard');

    userEvent.selectOptions(selectCategories, 'any');
    expect(selectCategories).toHaveValue('any');
  })
});