export const GET_COMMUNITY =  "GET_COMMUNITY";
const SET_COMMUNITY = "SET_COMMUNITY";
export const REMOVE_COMMUNITY = "REMOVE_COMMUNITY";
export const ADD_TO_COMMUNITY = "ADD_TO_COMMUNITY";
export const REMOVE_FROM_COMMUNITY = "REMOVE_FROM_COMMUNITY";
export const SET_CHAT = "SET_CHAT";
export const SET_MEMBERS = "SET_MEMBERS";


export const getCommunity = (token) => ({
    type: GET_COMMUNITY,
    token
});

export const setCommunity = (communities) => ({
    type: SET_COMMUNITY,
    communities
});

export const removeCommunity = (token) => ({
    type: REMOVE_COMMUNITY,
    token
});

export const addToCommunity = (token) => ({
    type: ADD_TO_COMMUNITY,
    token
});

export const removeFromCommunity = (token) => ({
    type: REMOVE_FROM_COMMUNITY,
    token
});

export const setChat = (chats) => ({
    type: SET_CHAT,
    chats
})
export const setMembers = (members) => ({
    type: SET_MEMBERS,
    members
})

const initialCommunityList = {
    communities: null,
    chats: null
};


// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialCommunityList, action) => {
    switch (action.type) {
      case SET_COMMUNITY:
        const { communities } = action;
        return { ...state, communities };
      case SET_CHAT:
        const { chats } = action;
        return { ...state, chats };
      case SET_MEMBERS:
        const { members } = action;
        state.chats[0].members = members;
        console.log(state)
        return { ...state };
      default: return state
    }
  };