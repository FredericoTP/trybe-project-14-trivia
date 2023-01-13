import { ADD_PERSON_INFO } from '../actions';

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
  default:
    return state;
  }
};

export default login;
