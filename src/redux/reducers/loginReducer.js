import { ADD_PERSON_INFO, SET_INITIAL_STATE } from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_PERSON_INFO:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case SET_INITIAL_STATE:
    return {
      ...state,
      name: '',
      gravatarEmail: '',
    };
  default:
    return state;
  }
};

export default login;
