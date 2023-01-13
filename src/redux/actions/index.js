export const ADD_PERSON_INFO = 'ADD_PERSON_INFO';
export const ADD_QUESTIONS = 'ADD_QUESTIONS';

export const addPersonInfo = (name, email) => ({
  type: ADD_PERSON_INFO,
  name,
  email,
});

export const addQuestions = (data) => ({
  type: ADD_QUESTIONS,
  data,
});
