export const GET_FOLLOWERS = "GET_FOLLOWERS";
export const GET_FOLLOW = "GET_FOLLOW";
export const GET_UNFOLLOW = "GET_UNFOLLOW"
const SET_FOLLOW = "SET_FOLLOW";


export const getFollow = (id, token) => ({
    type: GET_FOLLOW,
    id,
    token
})

export const getUnFollow = (id, token) => ({
    type: GET_UNFOLLOW,
    id,
    token
})

export const getFollowers = (token) => ({
  type: GET_FOLLOWERS,
  token
})

export const setFollow = (followers) => ({
    type: SET_FOLLOW,
    followers
})

const initialFollowList = {
    followers: null
}


// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialFollowList, action) => {
    switch (action.type) {
      case SET_FOLLOW:
        const { followers } = action;
        return { ...state, followers };
      default: return state
    }
  };