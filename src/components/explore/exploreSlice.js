import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

import { StatusData, postsRoute } from "../../api/ApiRoutes";

import { client } from "../../api/client";

const explorePostsAdapter = createEntityAdapter({});

const initialState = explorePostsAdapter.getInitialState({
  fetchedAllEntitiesLength: 0,
  status: StatusData.idle,
  error: null,
});

export const fetchExplorePosts = createAsyncThunk("explorePosts/fetchPosts", async ({ from, to }, { getState }) => {
  const response = await client.get(postsRoute, {
    headers: {
      from: from,
      to: to,
    },
  });

  const { posts, allPostsLength } = response;
  return { posts, allPostsLength };
});

export const fetchSingleExplorePost = createAsyncThunk(`posts/fetchSingleExplorePost`, async ({ postId }) => {
  const response = await client.get(`${postsRoute}/single/${postId}`);

  const { fetchedPost, allPostsLength } = response;

  return { fetchedPost, allPostsLength };
});

const explorePostsSlice = createSlice({
  name: "explorePosts",
  initialState,
  reducers: {
    changeExplorePostStatusToStartFetching(state, action) {
      if (state.status === StatusData.loading) return;

      const { newStatus } = action.payload;
      state.status = newStatus;
    },
  },
  extraReducers: {
    [fetchExplorePosts.pending]: (state, action) => {
      state.status = StatusData.loading;
    },

    [fetchExplorePosts.fulfilled]: (state, action) => {
      state.status = StatusData.succeeded;
      const { posts, allPostsLength } = action.payload;

      state.fetchedAllEntitiesLength = allPostsLength;
      explorePostsAdapter.upsertMany(state, posts);
    },

    [fetchSingleExplorePost.pending]: (state, action) => {
      state.status = StatusData.loading;
    },
    [fetchSingleExplorePost.rejected]: (state, action) => {
      state.status = StatusData.idle;
    },
    [fetchSingleExplorePost.fulfilled]: (state, action) => {
      const { fetchedPost, allPostsLength } = action.payload;

      state.fetchedAllEntitiesLength = allPostsLength;

      explorePostsAdapter.upsertOne(state, fetchedPost);
    },
  },
});

export default explorePostsSlice.reducer;

export const { changeExplorePostStatusToStartFetching } = explorePostsSlice.actions;

export const {
  selectAll: selectAllExplorePosts,
  selectById: selectExplorePostById,
  selectIds: selectExplorePostIds,
} = explorePostsAdapter.getSelectors((state) => state.explorePosts);

export const selectFetchedAllExplorePostsLength = (state) => state.explorePosts.fetchedAllEntitiesLength;

export const selectExplorePostsStatus = (state) => state.explorePosts.status;
