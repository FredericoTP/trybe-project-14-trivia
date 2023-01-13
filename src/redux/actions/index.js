export const ADD_PERSON_INFO = 'ADD_PERSON_INFO';

export const addPersonInfo = (name, email) => ({
  type: ADD_PERSON_INFO,
  name,
  email,
});
