import { ADD_QUESTIONS, NEXT_QUESTION } from '../actions';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
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
  case NEXT_QUESTION:
    return {
      ...state,
      questionIndex: (state.questionIndex + action.payload),
    };
  default:
    return state;
  }
};

export default game;
