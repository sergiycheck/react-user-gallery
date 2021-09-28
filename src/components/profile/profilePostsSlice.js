import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { userPostsRoute, StatusData } from "../../api/ApiRoutes";

import { client } from "../../api/client";

const profilePostsAdapter = createEntityAdapter();

const initialState = profilePostsAdapter.getInitialState({
  status: StatusData.idle,
  error: null,
  fetchedAllEntitiesLength: 0,
  currentUserId: null,
});

export const fetchUserProfilePosts = createAsyncThunk(
  "profilePosts/fetchUserProfilePosts",
  async ({ from, to, userId }, { getState }) => {
    let url = userPostsRoute.replace(":userId", userId);

    const response = await client.get(url, {
      headers: {
        from: from,
        to: to,
      },
    });

    const { posts, allPostsLength } = response;
    return { posts, allPostsLength };
  }
);

export const fetchSingleUserProfilePost = createAsyncThunk(
  `profilePosts/fetchSingleUserProfilePost`,
  async ({ userId, postId }) => {
    let url = userPostsRoute.replace(":userId", userId);

    const response = await client.get(`${url}/single/${postId}`);

    const { fetchedPost, allPostsLength } = response;

    return { fetchedPost, allPostsLength };
  }
);

const profilePostsReducer = createSlice({
  name: "profilePosts",
  initialState,
  reducers: {
    changeProfilePostsStatusToStartFetching(state, action) {
      if (state.status === StatusData.loading) return;

      const { newStatus } = action.payload;
      state.status = newStatus;
    },

    setCurrentUser(state, action) {
      const { userId } = action.payload;
      state.currentUserId = userId;
    },

    resetAllEntities(state, action) {
      profilePostsAdapter.removeAll(state);

      state.status = StatusData.idle;
      state.error = null;
      state.fetchedAllEntitiesLength = 0;
      state.currentUserId = null;

    },
  },
  extraReducers: {
    [fetchUserProfilePosts.pending]: (state, action) => {
      state.status = StatusData.loading;
    },
    [fetchUserProfilePosts.fulfilled]: (state, action) => {
      state.status = StatusData.succeeded;
      const { posts, allPostsLength } = action.payload;

      state.fetchedAllEntitiesLength = allPostsLength;
      profilePostsAdapter.upsertMany(state, posts);
    },

    [fetchSingleUserProfilePost.pending]: (state, action) => {
      state.status = StatusData.loading;
    },
    [fetchSingleUserProfilePost.rejected]: (state, action) => {
      state.status = StatusData.idle;
    },
    [fetchSingleUserProfilePost.fulfilled]: (state, action) => {
      const { fetchedPost, allPostsLength } = action.payload;

      state.fetchedAllEntitiesLength = allPostsLength;

      profilePostsAdapter.upsertOne(state, fetchedPost);
    },
  },
});

export default profilePostsReducer.reducer;

export const {
  changeProfilePostsStatusToStartFetching,
  resetAllEntities,
  setCurrentUser,
} = profilePostsReducer.actions;

export const {
  selectAll: selectAllProfilePosts,
  selectById: selectProfilePostById,
  selectIds: selectProfilePostIds,
} = profilePostsAdapter.getSelectors((state) => state.profilePosts);

export const selectFetchedAllProfilePostsLength = (state) =>
  state.profilePosts.fetchedAllEntitiesLength;

export const selectProfilePostsStatus = (state) => state.profilePosts.status;

export const selectProfilePostsCurrentUserId = (state) =>
  state.profilePosts.currentUserId;
