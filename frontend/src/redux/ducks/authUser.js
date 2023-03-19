export const AUTH_USER = "AUTH_USER";
const SETAUTH_USER = "SETAUTH_USER";
const SETAUTH_ERROR = "SETAUTH_ERROR";
const LOG_OUT = "LOG_OUT";
const REMOVE_AUTHERROR = "REMOVE_AUTHERROR";

export const authUser = (user) => ({
  type: AUTH_USER,
  user,
});

export const setAuthUser = (user) => ({
  type: SETAUTH_USER,
  user,
});

export const setAuthError = (error) => ({
  type: SETAUTH_ERROR,
  error,
});

export const removeAuthError = () => ({
  type: REMOVE_AUTHERROR,
});

const initialError = {
  errors: undefined,
};

const initialState = {
  user: undefined,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SETAUTH_USER:
      const { user } = action;
      return { ...state, user };
    case LOG_OUT:
      return { state: null, user: null };
    default:
      return state;
  }
};

export function error(errors = initialError, action) {
  switch (action.type) {
    case SETAUTH_ERROR:
      const { error } = action.error.response.data;
      return {
        ...errors,
        error,
      };

    case REMOVE_AUTHERROR:
      return {
        ...errors,
        error: undefined,
      };
    default:
      return errors;
  }
}
