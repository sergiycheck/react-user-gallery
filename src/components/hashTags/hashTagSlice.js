import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import { postsRoute, StatusData } from "../../api/ApiRoutes";

import { client } from "../../api/client";

const hashTagAdapter = createEntityAdapter({});
const initialState = hashTagAdapter.getInitialState({
  status: StatusData.idle,
  error: null,
});

export const fetchHashTags = createAsyncThunk(`posts/fetchPostHashTags`, async ({ postId }) => {
  const response = await client.get(`${postsRoute}/${postId}/hashTags`);
  const { hashTags } = response;
  return { hashTags };
});

const hashTagsSlice = createSlice({
  name: "hashTags",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchHashTags.pending]: (state, action) => {
      state.status = StatusData.loading;
    },
    [fetchHashTags.rejected]: (state, action) => {
      state.status = StatusData.succeeded;
    },
    [fetchHashTags.fulfilled]: (state, action) => {
      state.status = StatusData.succeeded;
      const { hashTags } = action.payload;
      hashTagAdapter.upsertMany(state, hashTags);
    },
  },
});

export default hashTagsSlice.reducer;

export const {
  selectAll: selectAllHashTags,
  selectById: selectHashTagById,
  selectIds: selectHashTagsIds,
} = hashTagAdapter.getSelectors((state) => state.hashTags);

export const selectHashTagsByPostId = createSelector(
  [
    selectAllHashTags,
    (state, postId) => {
      return postId;
    },
  ],
  (hashTags, postId) => {
    return hashTags.filter((ht) => Array.from(ht.posts).includes(postId));
  }
);
