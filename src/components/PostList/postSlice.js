import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import {
  StatusData,
  postsRoute,
  // usersName,
  // usersRoute,
} from "../../api/ApiRoutes";

import { client } from "../../api/client";

//TODO: fetch only posts that user subscribed to them

const postsAdapter = createEntityAdapter({
  // sortComparer:(postA, postB)=>
  // 	postB.date.localeCompare(postA.date)
});

const initialState = postsAdapter.getInitialState({
  fetchedAllEntitiesLength: 0,
  status: StatusData.idle,
  error: null,
});

export const addLikeToPost = createAsyncThunk(
  "posts/addLikeToPost",
  async ({ postId }) => {
    const response = await client.post(`${postsRoute}/addLikeToPost`, {
      postId: postId,
    });

    const post = response.result;
    // return {id: post.id, changes: {...post}};
    return post;
  }
);

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ from, to }, { getState }) => {
    
    const { currentUserForApp } = getState().users;

    const response = await client.post(
      `${postsRoute}/postsForCurrentUserForTheApp`,
      { currentUserId: currentUserForApp.id },
      {
        headers: {
          from: from,
          to: to,
        },
      }
    );

    const { posts, allPostsLength } = response;

    return { posts, allPostsLength };
  }
);

export const fetchAllPostsLengthForUser = createAsyncThunk(
  "posts/fetchAllPostsLengthForUser",
  async (_, { getState }) => {
    
    const { currentUserForApp } = getState().users;

    const response = await client.post(
      `${postsRoute}/getNewAllPostsLengthForUser`,
      { currentUserId: currentUserForApp.id }
    );

    const { allPostsLength } = response;

    return { allPostsLength };
  }
);

export const fetchSinglePost = createAsyncThunk(
  `posts/fetchSinglePost`,
  async ({ postId }) => {
    const response = await client.get(`${postsRoute}/single/${postId}`);

    const { fetchedPost, allPostsLength } = response;

    return { fetchedPost, allPostsLength };
  }
);
//TODO: fetch only that posts that currentUserForTheApp subscribed to

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    changePostStatusToStartFetching(state, action) {

      if (state.status === StatusData.loading) return;

      const { newStatus } = action.payload;
      state.status = newStatus;
    },
    postAdded(state, action) {

      postsAdapter.addOne(state, action.payload);
    },
    deleteUnfollowedUserPostsFromSlice(state, action){

      const {unFollowedUserId} = action.payload;

      const arrOfEntitiesIdToRemove = Object.values(state.entities)
      .filter(entity=>{
        return entity.userId === unFollowedUserId
      }).map(entity=>entity.id);

      postsAdapter.removeMany(state, arrOfEntitiesIdToRemove);
    }
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = StatusData.loading;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = StatusData.succeeded;
      const { posts, allPostsLength } = action.payload;
      state.fetchedAllEntitiesLength = allPostsLength;
      postsAdapter.upsertMany(state, posts);
    },
    [fetchAllPostsLengthForUser.pending]: (state, action) => {
      state.status = StatusData.loading;
    },
    [fetchAllPostsLengthForUser.fulfilled]: (state, action) => {
      state.status = StatusData.succeeded;
      const { allPostsLength } = action.payload;
      state.fetchedAllEntitiesLength = allPostsLength;
    },

    [fetchSinglePost.rejected]: (state, action) => {
      state.status = StatusData.idle;
    },
    [fetchSinglePost.fulfilled]: (state, action) => {
      const { fetchedPost, allPostsLength } = action.payload;
      state.fetchedAllEntitiesLength = allPostsLength;
      postsAdapter.upsertOne(state, fetchedPost);
    },

    [addLikeToPost.fulfilled]: (state, action) => {

      const updatedPost = action.payload;
      const { id } = updatedPost;

      const oldPost = state.entities[id];

      Object.assign(oldPost, updatedPost);
      //TODO: refactor with updateOne
      // postsAdapter.updateOne(state, updatedPost)
    },
  },
});

export default postsSlice.reducer;

export const { changePostStatusToStartFetching, postAdded,deleteUnfollowedUserPostsFromSlice } =
  postsSlice.actions;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);

export const selectFetchedAllPostsLength = (state) =>
  state.posts.fetchedAllEntitiesLength;
