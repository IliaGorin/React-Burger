import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESSFUL,
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESSFUL,
  LOGIN_USER,
  LOGIN_USER_SUCCESSFUL,
  GET_USER_INFO,
  GET_USER_INFO_SUCCESSFUL,
  PATCH_USER_INFO,
  PATCH_USER_INFO_SUCCESSFUL,
  LOGOUT_USER_SUCCESSFUL,
  LOGOUT_USER,
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
        pending: true,
        success: false,
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
        pending: true,
        success: false,
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
    case RESET_PASSWORD: {
      return {
        ...state,
        pending: true,
        success: false,
        token: action.token,
      };
    }
    case RESET_PASSWORD_SUCCESSFUL: {
      return {
        ...state,
        pending: false,
        success: true,
      };
    }
    case LOGIN_USER: {
      return {
        ...state,
        pending: true,
        success: false,
        email: action.email,
        password: action.password,
      };
    }
    case LOGIN_USER_SUCCESSFUL: {
      return {
        ...state,
        pending: false,
        success: true,
        isLoggedIn: true,
      };
    }
    case GET_USER_INFO: {
      return {
        ...state,
        pending: true,
        success: false,
      };
    }
    case GET_USER_INFO_SUCCESSFUL: {
      return {
        ...state,
        email: action.email,
        name: action.name,
        isLoggedIn: true,
        pending: false,
        success: true,
      };
    }
    case PATCH_USER_INFO: {
      return {
        ...state,
        pending: true,
        success: false,
        email: action.email,
        name: action.name,
      };
    }
    case PATCH_USER_INFO_SUCCESSFUL: {
      return {
        ...state,
        success: true,
        pending: false,
      };
    }
    case LOGOUT_USER: {
      console.log(LOGOUT_USER);
      return {
        ...state,

        pending: true,
        success: false,
      };
    }
    case LOGOUT_USER_SUCCESSFUL: {
      console.log(LOGOUT_USER_SUCCESSFUL);
      return {
        ...state,
        user: '',
        email: '',
        password: '',
        isLoggedIn: false,
        pending: false,
        success: true,
      };
    }
  }
};
