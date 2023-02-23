import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESSFUL,
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
} from '../actions/users';

const initialState = {
  email: '',
  token: '',
  password: '',
  name: '',
  pending: true,
  success: false,
  isLoggedIn: false,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD: {
      return {
        ...state,
        email: action.email,
      };
    }
    case FORGOT_PASSWORD_SUCCESSFUL: {
      return {
        ...state,
        pending: false,
        success: true,
      };
    }
    default: {
      return state;
    }
    case REGISTER_USER: {
      return {
        ...state,
        email: action.email,
        password: action.password,
        name: action.name,
      };
    }
    case REGISTER_USER_SUCCESSFUL: {
      return {
        ...state,
        pending: false,
        success: true,
      };
    }
  }
};
