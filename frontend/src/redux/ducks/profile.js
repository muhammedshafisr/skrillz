export const ADD_COVER = "ADD_COVER";
export const UPDATE_COVER = "UPDATE_COVER";
export const REMOVE_COVER = "REMOVE_COVER";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const REMOVE_IMAGE = "REMOVE_IMAGE";

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