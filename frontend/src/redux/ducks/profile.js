export const GET_PROFILE = "GET_PROFILE";
const SET_PROFILE = "SET_PROFILE";
export const ADD_COVER = "ADD_COVER";
export const UPDATE_COVER = "UPDATE_COVER";
export const REMOVE_COVER = "REMOVE_COVER";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const REMOVE_IMAGE = "REMOVE_IMAGE";

export const getProfile = (token) => ({
  type: GET_PROFILE,
  token
})

export const setProfile = (videos) => ({
  type: SET_PROFILE,
  videos
})

export const addCover = (path, token) => ({
  type: ADD_COVER,
  path,
  token,
});

export const updateCover = (path, token) => ({
  type: UPDATE_COVER,
  path,
  token,
});

export const removeCover = (token) => ({
  type: REMOVE_COVER,
  token,
});

export const updateProfile = (data, token) => ({
  type: UPDATE_PROFILE,
  data,
  token
});


export const removeImage = (token) => ({
  type: REMOVE_IMAGE,
  token
});

// const initialState = {
//   videos: null
// }

// eslint-disable-next-line import/no-anonymous-default-export
// export default (state = initialState, action) => {
//   switch (action.type) {
//     case SET_PROFILE:
//       const { videos } = action;
//       return { ...state, videos };

//     default:
//       return state;
//   }
// };