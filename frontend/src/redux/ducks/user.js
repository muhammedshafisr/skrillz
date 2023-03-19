export const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
const SETLOGIN_ERROR = "SETAUTH_ERROR";
const LOGOUT = "LOGOUT";
const REMOVE_ERROR = "REMOVE_ERROR";


export const getUser = (user) => ({
  type: GET_USER,
  user,
});

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const removeError = () => ({
  type: REMOVE_ERROR,
});

export const setLoginError = (error) => ({
  type: SETLOGIN_ERROR,
  error,
});

const initialError = {
  error: undefined,
};

const initialState = {
  user: undefined,
};

const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      initialState.user = user.user;
    }

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      const { user } = action;
      return { ...state, user };

    case LOGOUT:
      return {
        state: null,
        user: null,
      };
    default:
      return state;
  }
};

export function loginError(errors = initialError, action) {
  switch (action.type) {
    case SETLOGIN_ERROR:
      const { error } = action.error.response.data;
      return {
        ...errors,
        error,
      };

    case REMOVE_ERROR:
      return {
        ...errors,
        error: undefined,
      };

    default:
      return errors;
  }
}
