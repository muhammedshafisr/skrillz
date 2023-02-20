export const IS_USER = "IS_USER";
const SET_IS_USER = "SET_IS_USER"

export const isUser = (token) => ({
  type: IS_USER,
  token,
});

export const setIsUser = (isUser) => ({
    type: SET_IS_USER,
    isUser
});

const initialState = {
    isUser: "Active"
};


export default (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_USER:
      const { isUser } = action;
      return { ...state, isUser };

    default:
      return state;
  }
};