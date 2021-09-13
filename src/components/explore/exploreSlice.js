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


const explorePostsAdapter = createEntityAdapter({});

const initialState = explorePostsAdapter.getInitialState({
  fetchedAllEntitiesLength: 0,
  status: StatusData.idle,
  error: null,
});

export const fetchExplorePosts = createAsyncThunk(
  "explorePosts/fetchPosts",
  async ({ from, to }, { getState }) => {
      
    const response = await client.get(postsRoute, {
      headers: {
        from: from,
        to: to,
      },
    });

    const { posts, allPostsLength } = response;
    return { posts, allPostsLength };
  }
);


// export const searchUsersPostsByUserName = createAsyncThunk(
//   `posts/${usersName}/searchForUsersPosts`,
//   async ({ searchUserName }) => {
//     // console.log(`fetch post  searchUsersPostsByUserName ${searchUserName}...`);

//     const response = await client.post(`${usersRoute}/searchForUsersPosts`, {searchUserName});

//     const models = response.posts.map((coll) => coll.models).flat();
//     // console.log('models ', models);
//     return models;
//   }
// );

const explorePostsSlice = createSlice({
  name: "explorePosts",
  initialState,
  reducers: {
    changeExplorePostStatusToStartFetching(state, action) {

      if (state.status === StatusData.loading) return;

      const { newStatus } = action.payload;
      state.status = newStatus;

    }
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

    // [searchUsersPostsByUserName.pending]: (state, action) => {
    //   state.status = StatusData.loading;
    // },

    // [searchUsersPostsByUserName.rejected]: (state, action) => {
    //   state.status = StatusData.succeeded;
    // },

    // [searchUsersPostsByUserName.fulfilled]: (state, action) => {
    //   state.status = StatusData.succeeded;

    //   const posts = action.payload;
    //   const postsLength = Array.from(posts).length;

    //   state.fetchedAllEntitiesLength = postsLength;

    //   explorePostsAdapter.setAll(state, posts);
    // }
  },
});

export default explorePostsSlice.reducer;

export const {
  changeExplorePostStatusToStartFetching,
} = explorePostsSlice.actions;

export const {
  selectAll: selectAllExplorePosts,
  selectById: selectExplorePostById,
  selectIds: selectExplorePostIds,
} = explorePostsAdapter.getSelectors((state) => state.explorePosts);

export const selectFetchedAllExplorePostsLength = (state) =>
  state.explorePosts.fetchedAllEntitiesLength;

export const selectExplorePostsStatus = (state) => 
	state.explorePosts.status;


