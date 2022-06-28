import { configureStore } from "@reduxjs/toolkit";
import itemCounterReducer from "../components/messages/counter/itemCounterSlice";
import postsReducer from "../components/PostList/postSlice";
import videosReducer from "../components/home/VideoComponent/videosSlice";
import usersReducer from "../components/profile/usersSlice";

import commentsReducer from "../components/comments/commentSlice";
import explorePostsReducer from "../components/explore/exploreSlice";

import searchDataReducer from "../components/explore/searchComponent/searchDataSlice";

import hashTagsReducer from "../components/hashTags/hashTagSlice";

import postsSameHashTagsReducer from "../components/PostList/postsWithSameHashTagsSlice.js";

import profilePostsReducer from "../components/profile/profilePostsSlice.js";

import { logm } from "../helpers/custom-logger";

const loggerMiddleware = (storeAPI) => (next) => (action) => {
  logm("dispatching", action);
  let result = next(action);
  logm("next state", storeAPI.getState());
  return result;
};

export default configureStore({
  reducer: {
    itemCounter: itemCounterReducer,
    posts: postsReducer,
    videos: videosReducer,
    users: usersReducer,
    comments: commentsReducer,
    explorePosts: explorePostsReducer,
    searchData: searchDataReducer,
    hashTags: hashTagsReducer,
    postsSameHashTags: postsSameHashTagsReducer,

    profilePosts: profilePostsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});
