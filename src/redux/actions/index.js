export const ADD_PERSON_INFO = 'ADD_PERSON_INFO';
export const ADD_QUESTIONS = 'ADD_QUESTIONS';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const HANDLE_SCORE = 'HANDLE_SCORE';
export const HANDLE_ASSERTIONS = 'HANDLE_ASSERTIONS';
export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
export const CHANGE_DIFFICULTY = 'CHANGE_DIFFICULTY';

export const addPersonInfo = (name, email) => ({
  type: ADD_PERSON_INFO,
  name,
  email,
});

export const addQuestions = (data) => ({
  type: ADD_QUESTIONS,
  data,
});

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
  payload: 1,
});

export const handleScore = (score) => ({
  type: HANDLE_SCORE,
  score,
});

export const handleAssertions = () => ({
  type: HANDLE_ASSERTIONS,
});

export const setInitialState = () => ({
  type: SET_INITIAL_STATE,
});

export const changeCategory = (category) => ({
  type: CHANGE_CATEGORY,
  category,
});

export const changeDifficulty = (difficulty) => ({
  type: CHANGE_DIFFICULTY,
  difficulty,
});
