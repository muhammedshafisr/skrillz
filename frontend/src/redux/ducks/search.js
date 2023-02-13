export const SEARCH_IT = "SEARCH_IT";
const SET_SEARCH = "SET_SEARCH"

export const searchIt = (text, token) => ({
    type: SEARCH_IT,
    text,
    token
})

export const setSearch = (searchList) => ({
  type: SET_SEARCH,
  searchList
})

const initialState = {
    searchItems: [null]
}


// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
      case SET_SEARCH:
        const { searchList } = action;
        return { ...state, searchList };
      default:
        return state;
    }
  };