export const GET_FOLLOW = "GET_FOLLOW";
const SET_FOLLOW = "SET_FOLLOW";

export const getFollow = (id, token) => ({
    type: GET_FOLLOW,
    id,
    token
})

export const setFollow = (id, token) => ({
    type: SET_FOLLOW,
    id,
    token
})


