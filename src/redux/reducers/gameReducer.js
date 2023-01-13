import { ADD_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  score: 0,
  questions: [],
  questionIndex: 0,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_QUESTIONS:
    return {
      ...state,
      questions: action.data,
    };
  default:
    return state;
  }
};

export default game;
