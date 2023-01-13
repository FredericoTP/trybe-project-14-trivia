import {
  ADD_QUESTIONS, NEXT_QUESTION, HANDLE_SCORE, HANDLE_ASSERTIONS, SET_INITIAL_STATE,
} from '../actions';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
  questions: [],
  questionIndex: 0,
};

const player = (state = INITIAL_STATE, action) => {
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
  case HANDLE_SCORE:
    return {
      ...state,
      score: action.score,
    };
  case HANDLE_ASSERTIONS:
    return {
      ...state,
      assertions: (state.assertions + 1),
    };
  case SET_INITIAL_STATE:
    return {
      ...state,
      score: 0,
      assertions: 0,
      questions: [],
      questionIndex: 0,
    };
  default:
    return state;
  }
};

export default player;
