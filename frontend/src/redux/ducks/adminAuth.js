export const AUTH_ADMIN = "AUTH_ADMIN";
const SETAUTH_ADMIN = "SETAUTH_ADMIN";
const SETADMINAUTH_ERROR = "SETADMINAUTH_ERROR";
const LOG_OUT = "LOG_OUT";

export const authAdmin = (admin) => ({
  type: AUTH_ADMIN,
  admin,
});

export const setAuthAdmin = (admin) => ({
  type: SETAUTH_ADMIN,
  admin,
});

export const setAdminAuthError = (error) => ({
  type: SETADMINAUTH_ERROR,
  error,
});

const initialError = {
  errors: undefined,
};

const initialState = {
  admin: undefined,
};

const admin = JSON.parse(localStorage.getItem('admin'))

    if (admin) {
      initialState.admin = admin.admin;
    }

export default (state = initialState, action) => {
  switch (action.type) {
    case SETAUTH_ADMIN:
      const { admin } = action;
      return { ...state, admin };
    case LOG_OUT:
      return { state: null, admin: null };
    default:
      return state;
  }
};

export function adminError(errors = initialError, action) {
  switch (action.type) {
    case SETADMINAUTH_ERROR:
      const { error } = action.error;
      return {
        ...errors,
        error,
      };
    default:
      return errors;
  }
}
