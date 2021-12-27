import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

import { StatusData, postsRoute } from "../../api/ApiRoutes";

import { client } from "../../api/client";

import { logm } from "../../helpers/custom-logger";

const postsSameHashTagsAdapter = createEntityAdapter({});

const initialState = postsSameHashTagsAdapter.getInitialState({
  fetchedAllEntitiesLength: 0,
  status: StatusData.idle,
  error: null,
  currentPostId: null,
});

export const fetchPostsWithSameHashTags = createAsyncThunk(
  "explorePosts/sameHashTags",
  async ({ from, to, postId }) => {
    const response = await client.get(`${postsRoute}/postIdToFindSameHashTags=${postId}`, {
      headers: {
        from,
        to,
      },
    });

    logm("response ", response);

    const { posts, filteredPostsByHashTagsLength } = response;

    return { posts, filteredPostsByHashTagsLength };
  }
);

export const fetchSingleSameHashTagsPost = createAsyncThunk(`posts/fetchSingleSameHashTagsPost`, async ({ postId }) => {
  const response = await client.get(`${postsRoute}/single/${postId}`);

  const { fetchedPost, allPostsLength } = response;

  return { fetchedPost, allPostsLength };
});

const postsSameHashTagsSlice = createSlice({
  name: "postsSameHashTags",
  initialState,
  reducers: {
    changePostsSameHashTagsStatusToStartFetching(state, action) {
      if (state.status === StatusData.loading) return;

      const { newStatus } = action.payload;
      state.status = newStatus;
    },

    setCurrentPostId(state, action) {
      const { postId } = action.payload;
      state.currentPostId = postId;
    },

    resetState(state, action) {
      postsSameHashTagsAdapter.removeAll(state);
      state.error = null;
      state.fetchedAllEntitiesLength = 0;
      state.status = StatusData.idle;
      state.currentPostId = null;
    },
  },
  extraReducers: {
    [fetchPostsWithSameHashTags.pending]: (state, action) => {
      state.status = StatusData.loading;
    },

    [fetchPostsWithSameHashTags.rejected]: (state, action) => {
      state.status = StatusData.loading;
    },

    [fetchPostsWithSameHashTags.fulfilled]: (state, action) => {
      state.status = StatusData.succeeded;

      const { posts, filteredPostsByHashTagsLength } = action.payload;

      state.fetchedAllEntitiesLength = filteredPostsByHashTagsLength;
      postsSameHashTagsAdapter.upsertMany(state, posts);
    },

    [fetchSingleSameHashTagsPost.rejected]: (state, action) => {
      state.status = StatusData.idle;
    },
    [fetchSingleSameHashTagsPost.fulfilled]: (state, action) => {
      const { fetchedPost, allPostsLength } = action.payload;

      state.fetchedAllEntitiesLength = allPostsLength;

      postsSameHashTagsAdapter.upsertOne(state, fetchedPost);
    },
  },
});

export default postsSameHashTagsSlice.reducer;

export const { changePostsSameHashTagsStatusToStartFetching, resetState, setCurrentPostId } =
  postsSameHashTagsSlice.actions;

export const {
  selectAll: selectAllSameTagsPosts,
  selectById: selectSameTagsPostById,
  selectIds: selectSameTagsPostIds,
} = postsSameHashTagsAdapter.getSelectors((state) => state.postsSameHashTags);

export const selectFetchedAllSameTagsPostsLength = (state) => state.postsSameHashTags.fetchedAllEntitiesLength;

export const selectSameTagsPostsStatus = (state) => state.postsSameHashTags.status;

export const selectSameTagsPostsCurrentPostId = (state) => state.postsSameHashTags.currentPostId;
