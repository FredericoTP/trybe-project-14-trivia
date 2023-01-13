export const ADD_PERSON_INFO = 'ADD_PERSON_INFO';
export const ADD_QUESTIONS = 'ADD_QUESTIONS';
export const NEXT_QUESTION = 'NEXT_QUESTION';

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
