import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import {
  StatusData,
  postsRoute,
  usersName,
  usersRoute,
} from "../../../api/ApiRoutes";

import { ClientBuilder } from "../../../api/client";

export const loadMorePostsScrollListenerEnum = {
  initial: "initial",
  set: "set",
  removed: "removed",
};

const postsAdapter = createEntityAdapter({
  // sortComparer:(postA, postB)=>
  // 	postB.date.localeCompare(postA.date)
});

const initialState = postsAdapter.getInitialState({
  searchedNamesAndIds: [],
  loadMorePostsScrollListener: loadMorePostsScrollListenerEnum.initial,
  fetchedAllEntitiesLength: 0,
  status: StatusData.idle,
  error: null,
});

export const addLikeToPost = createAsyncThunk("POST_LIKE", async ({ postId }) => {
    const client = new ClientBuilder(`fakeApi/posts/addLikeToPost`, {
      body: {
        postId: postId,
      },
      customHeaders: {},
    });
    const response = await client.fetchWithConfig();
    // console.log('response from server ', response);
    const post = response.result;
    return post;
  }
);

export const fetchPosts = createAsyncThunk("FETCH_POSTS", async ({ from, to }, { getState }) => {
    // console.log('getState passed as obj', getState);
    // const allPosts = selectAllPosts(getState());
    // console.log('all posts before fetch', allPosts);

    // console.log('posts fetch ', postsRoute);
    const client = new ClientBuilder(postsRoute);
    const response = await client.fetchWithConfig(null, {
      body: null,
      customHeaders: {
        from: from,
        to: to,
      },
    });
    const { posts, allPostsLength } = response;
    // console.log("all posts length", allPostsLength);

    // console.log('response  from server', response);
    // console.log('every post has user',posts.every(p=>p.userId))
    return { posts, allPostsLength };
  }
);

export const searchUsersPostsByUserName = createAsyncThunk(`${usersName}/searchForUsersPosts`, async ({ searchUserName }) => {
    const client = new ClientBuilder(`${usersRoute}/searchForUsersPosts`, {
      body: {
        searchUserName,
      },
    });
    const response = await client.fetchWithConfig();
    
    const models = response.posts.map(coll=>coll.models).flat();
    // console.log('models ', models);
    return models;
  }
);

export const searchForUsersNames = createAsyncThunk(`${usersName}/searchForUsersNames`, async ({ query }) => {
  const client = new ClientBuilder(`${usersRoute}/searchForNames/${query}`);
  const response = await client.fetchWithConfig();
  // console.log('response', response);
  if(response)
    return response.userNamesArr;
  return [];
})

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    changePostStatusToStartFetching(state, action) {
      // console.log('changePostStatusToStartFetching old status ', state.status);

      if (state.status === StatusData.loading) return;

      const { newStatus } = action.payload;
      state.status = newStatus;
      // console.log('changePostStatusToStartFetching post status changed ', state.status);
    },
    postAdded(state, action) {
      // console.log('adding post ', action.payload);

      postsAdapter.addOne(state, action.payload);
    },
    setLoadMorePostsScrollListener(state, action) {
      const { scrollMoreStatus } = action.payload;
      state.loadMorePostsScrollListener = scrollMoreStatus;
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = StatusData.loading;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = StatusData.succeeded;
      const { posts, allPostsLength } = action.payload;
      // console.log('fetchPosts.fulfilled action.payload',action.payload);
      state.fetchedAllEntitiesLength = allPostsLength;

      postsAdapter.upsertMany(state, posts);
    },
    [searchUsersPostsByUserName.pending]:(state,action)=>{
      state.status = StatusData.loading;
    },
    [searchUsersPostsByUserName.rejected]:(state,action)=>{
      state.status = StatusData.succeeded;
    },
    [searchUsersPostsByUserName.fulfilled]: (state, action) => {
      state.status = StatusData.succeeded;

      const posts = action.payload;
      const postsLength =  Array.from(posts).length;
      if(postsLength === 0 ){
        return;
      }

      postsAdapter.removeAll(state);
      state.loadMorePostsScrollListener = loadMorePostsScrollListenerEnum.removed;
      state.fetchedAllEntitiesLength = postsLength;
      postsAdapter.upsertMany(state, posts);
      
    },
    [searchForUsersNames.fulfilled]: (state, action) => {
      const namesAndIdsArr = action.payload;
      state.searchedNamesAndIds = namesAndIdsArr;
    },
    [addLikeToPost.fulfilled]: (state, action) => {
      state.status = StatusData.succeeded;

      // console.log('addLikeToPost.fulfilled action.payload.id', action.payload.id);

      const updatedPost = action.payload;
      const { id } = updatedPost;
      // const oldPost = selectPostById(state, id);//state is undefined
      const oldPost = state.entities[id];

      // console.log(`oldPost id ${oldPost.id}, oldPost likes ${oldPost.likeCount}`);
      // console.log(`updatedPost id ${updatedPost.id}, updatedPost likes ${updatedPost.likeCount}`);

      Object.assign(oldPost, updatedPost);
      // postsAdapter.updateOne(state, updatedPost)
    },
  },
});

export default postsSlice.reducer;

export const {
  changePostStatusToStartFetching,
  postAdded,
  setLoadMorePostsScrollListener,
} = postsSlice.actions;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);

export const selectFetchedAllPostsLength = (state) =>
  state.posts.fetchedAllEntitiesLength;

export const selectLoadMorePostsScrollListener = (state) =>
  state.posts.loadMorePostsScrollListener;

export const selectSearchedNamesAndIds = state => state.posts.searchedNamesAndIds;
