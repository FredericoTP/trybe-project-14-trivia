import Game from "../pages/Game";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitFor } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import questions from "./helpers/mockQuestions";

const spyOnClearInterval = jest.spyOn(window, 'clearInterval');

describe('Teste página Game', () => {
  test('Se a página é renderizada', () => {
    const initialState = {
      login: { name: 'Bia', email: 'test@test.com' },
      player: { score: 110, assertions: 2, questions: [], questionIndex: 0 },
    };
    renderWithRouterAndRedux(<Game />, initialState);
    const name = screen.getByTestId('header-player-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Bia')
  })

  test('teste se Game está funcionando', async () => {
    const mockApi = {
      "response_code": 0,
      "response_message": "Token Generated Successfully!",
      "token": "f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    }
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(questions)
        .mockReturnValueOnce(mockApi)
    });

    const { history } = renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId('input-player-name')
    const email = screen.getByTestId('input-gravatar-email')
    const buttonPlay = screen.getByTestId('btn-play')

    userEvent.type(name, 'Bia')
    userEvent.type(email, 'test@test.com')
    userEvent.click(buttonPlay)
    await waitFor(() => {
      expect(history.location.pathname).toBe('/game')
    })

    expect(global.fetch).toHaveBeenCalledTimes(2)

    const score = await screen.findByTestId('header-score');
    const questionCategory = await screen.findByTestId('question-category');
    const questionText = await screen.findByTestId('question-text');
    const correctAnswer = await screen.findByTestId('correct-answer');
    expect(score).toHaveTextContent('0');
    expect(questionCategory).toHaveTextContent('Entertainment: Video Games');
    expect(questionText).toHaveTextContent('Which of these TrackMania environments was NOT in the original game?');
    expect(correctAnswer).toHaveTextContent('Bay');

    userEvent.click(correctAnswer);
    expect(correctAnswer).toBeDisabled();

    const btnNext = await screen.findByTestId('btn-next');
    expect(btnNext).toBeInTheDocument();

    userEvent.click(btnNext);
    const correctAnswerTwo = await screen.findByTestId('correct-answer');
    const questionTextTwo = await screen.findByTestId('question-text');
    const scoreTwo = await screen.findByTestId('header-score');
    expect(questionTextTwo).toHaveTextContent('Who&#039;s the voice actor for Thrall in the Warcraft game series?');
    expect(correctAnswerTwo).toHaveTextContent('Chris Metzen');
    expect(scoreTwo).toHaveTextContent('100');

    userEvent.click(correctAnswerTwo);
    const btnNextTwo = await screen.findByTestId('btn-next');
    expect(btnNextTwo).toBeInTheDocument();

    userEvent.click(btnNextTwo);
    const correctAnswerThree = await screen.findByText('Portugal');
    userEvent.click(correctAnswerThree);

    const btnNextThree = await screen.findByTestId('btn-next');
    expect(btnNextThree).toBeInTheDocument();
    userEvent.click(btnNextThree);
    const correctAnswerFour = await screen.findByText('Time');
    userEvent.click(correctAnswerFour);

    const btnNextFour = await screen.findByTestId('btn-next');
    expect(btnNextFour).toBeInTheDocument();
    userEvent.click(btnNextFour);
    const correctAnswerFive = await screen.findByText('John Von Neumann');
    userEvent.click(correctAnswerFive);

    const btnNextFive = await screen.findByTestId('btn-next');
    expect(btnNextFive).toBeInTheDocument();
    userEvent.click(btnNextFive);
    const feedback = await screen.findByTestId('feedback-text');
    expect(feedback).toBeInTheDocument();
    expect(history.location.pathname).toBe('/feedback')
  });

  jest.setTimeout(10000)

  test('Testa o timer de Game', async () => {
    const mockApi = {
      "response_code": 0,
      "response_message": "Token Generated Successfully!",
      "token": "f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    }
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(questions)
        .mockReturnValueOnce(mockApi)
    });

    const { history } = renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId('input-player-name')
    const email = screen.getByTestId('input-gravatar-email')
    const buttonPlay = screen.getByTestId('btn-play')

    userEvent.type(name, 'Bia')
    userEvent.type(email, 'test@test.com')
    userEvent.click(buttonPlay)
    await waitFor(() => {
      expect(history.location.pathname).toBe('/game')
    })

    expect(global.fetch).toHaveBeenCalledTimes(2)

    const timer = await screen.findByRole('heading', { level: 4 })
    expect(timer).toBeInTheDocument();
    expect(timer).toHaveTextContent('30');

    await new Promise((r) => setTimeout(r, 5000));

    expect(timer).toHaveTextContent('26');

    expect(spyOnClearInterval).toHaveBeenCalled();
  })

  jest.setTimeout(32000)

  test('Testa o timer de Game', async () => {
    const mockApi = {
      "response_code": 0,
      "response_message": "Token Generated Successfully!",
      "token": "f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    }
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(questions)
        .mockReturnValueOnce(mockApi)
    });

    const { history } = renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId('input-player-name')
    const email = screen.getByTestId('input-gravatar-email')
    const buttonPlay = screen.getByTestId('btn-play')

    userEvent.type(name, 'Bia')
    userEvent.type(email, 'test@test.com')
    userEvent.click(buttonPlay)
    await waitFor(() => {
      expect(history.location.pathname).toBe('/game')
    })

    expect(global.fetch).toHaveBeenCalledTimes(2)

    const timer = await screen.findByRole('heading', { level: 4 })
    expect(timer).toBeInTheDocument();
    expect(timer).toHaveTextContent('30');

    await new Promise((r) => setTimeout(r, 31000));

    expect(timer).toHaveTextContent('0');

    expect(spyOnClearInterval).toHaveBeenCalled();
  })

  test('Testa o timer de Game, resposta incorreta', async () => {
    const mockApi = {
      "response_code": 0,
      "response_message": "Token Generated Successfully!",
      "token": "f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    }
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(questions)
        .mockReturnValueOnce(mockApi)
    });

    const { history } = renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId('input-player-name')
    const email = screen.getByTestId('input-gravatar-email')
    const buttonPlay = screen.getByTestId('btn-play')

    userEvent.type(name, 'Bia')
    userEvent.type(email, 'test@test.com')
    userEvent.click(buttonPlay)
    await waitFor(() => {
      expect(history.location.pathname).toBe('/game')
    })

    expect(global.fetch).toHaveBeenCalledTimes(2)

    const timer = await screen.findByRole('heading', { level: 4 })
    expect(timer).toBeInTheDocument();
    expect(timer).toHaveTextContent('30');

    const btnWrong = await screen.findByTestId('wrong-answer-1');
    userEvent.click(btnWrong);

    expect(spyOnClearInterval).toHaveBeenCalled();
  })
})