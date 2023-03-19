export const VIEW_VIDEO = "VIEW_VIDEO";
export const LIKE_VIDEO = "LIKE_VIDEO";
export const DELETE_VIDEO = "DELETE_VIDEO";
const SET_VIDEOS = "SET_VIDEOS";
const SET_VIEW_VIDEO = "SET_VIEW_VIDEO";
const RANDOM_VIDEO = "RANDOM_VIDEO";
const SET_LIKE = "SET_LIKE";
const SET_DIS_LIKE = "SET_DIS_LIKE";
const SET_LIKED_VIDEOS = "SET_LIKED_VIDEOS";
const SET_HISTORY = "SET_HISTORY";
const SET_COMMENTS = "SET_COMMENTS";

export const viewVideo = (id, userId) => ({
  type: VIEW_VIDEO,
  id,
  userId
});

export const likeVideo = (token, id) => ({
  type: LIKE_VIDEO,
  token,
  id,
});

export const deleteVideo = (token, id) => ({
  type: DELETE_VIDEO,
  token,
  id,
});

export const setVideos = (video) => ({
  type: SET_VIDEOS,
  video,
});

export const setViewVideo = (video) => ({
  type: SET_VIEW_VIDEO,
  video
});

export const setRandomVideos = (randomVideos) => ({
  type: RANDOM_VIDEO,
  randomVideos
});

export const setLike = (totalLikes) => ({
  type: SET_LIKE,
  totalLikes
})

export const setDisLike = (totalLikes) => ({
  type: SET_DIS_LIKE,
  totalLikes
})

export const setLikedVideos = (videos) => ({
  type: SET_LIKED_VIDEOS,
  videos
})

export const setHistory = (videos) => ({
  type: SET_HISTORY,
  videos
})

export const setComments = (comments) => ({
  type: SET_COMMENTS,
  comments
})

const initialState = {
  myVideos: null,
  likedVideos: null,
  videoSingleView: null,
  randomVideos: null,
  history: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_VIDEOS:
      let { myVideos, likedVideos } = action.video;
      return { ...state, myVideos, likedVideos };
      case SET_VIEW_VIDEO:
        const { video } = action;
        return { ...state, videoSingleView: video }
      case RANDOM_VIDEO:
        const { randomVideos } = action;
        return { ...state, randomVideos}
      case SET_LIKE:
        state.videoSingleView.likes = true;
        state.videoSingleView.disLikes = false;
        state.videoSingleView.totalLikes = action.totalLikes;
        return{...state}
      case SET_DIS_LIKE:
        state.videoSingleView.disLikes = true;
        state.videoSingleView.likes = false;
        state.videoSingleView.totalLikes = action.totalLikes;
        return{...state}
      case SET_LIKED_VIDEOS:
        const { videos } = action;
        return({...state, likedVideos: videos})
      case SET_HISTORY:
        const history = action.videos;
        return({ ...state, history});
      case SET_COMMENTS:
        state.videoSingleView.comments = action.comments;
        return({ ...state });
    default:
      return state;
  }
};
