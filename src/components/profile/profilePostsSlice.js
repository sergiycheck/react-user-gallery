import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { userPostsRoute, StatusData, usersRoute, subscribeRelationsRoute } from "../../api/ApiRoutes";

import { client } from "../../api/client";
import { createSelector } from 'reselect';


const profilePostsAdapter = createEntityAdapter();

const initialState = profilePostsAdapter.getInitialState({
  status: StatusData.idle,
  error: null,

  fetchedAllEntitiesLength: 0,

  currentUserId: null,

  followingRelationsStatus:StatusData.idle,
  userFollowingRelations:[],
  userFollowersRelations:[],
  followAndUnFollowRequestsStatus:StatusData.idle,

});

const sliceName = `profilePosts`;

export const fetchUserProfilePosts = createAsyncThunk(
  `${sliceName}/fetchUserProfilePosts`,
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
  `${sliceName}/fetchSingleUserProfilePost`,
  async ({ userId, postId }) => {
    let url = userPostsRoute.replace(":userId", userId);

    const response = await client.get(`${url}/single/${postId}`);

    const { fetchedPost, allPostsLength } = response;

    return { fetchedPost, allPostsLength };
  }
);

export const fetchSubscribeRelationsForUser = createAsyncThunk(
  `${sliceName}/fetchSubscribeRelationsForUser`,
  async({userId})=>{

    const response = await client.get(`${subscribeRelationsRoute}/getUserSubscribeRelations/${userId}`);

    const {
      userFollowingRelations,
      userFollowersRelations
    } = response;
    return {
      userFollowingRelations,
      userFollowersRelations
    }
  }
)

export const followUserFetchPost = createAsyncThunk(
  `${sliceName}/followUser`,
  async ({userIdToFollow} ,{getState}) =>{

    const { currentUserForApp } = getState().users;
    const response = await client.post(`${usersRoute}/followUser`,{
      currentUserId: currentUserForApp.id,
      userIdToFollow: userIdToFollow
    });

    const {
      userFollowersRelations
     } = response;
    return {userFollowersRelations};
  }
);

//TODO: unite followUserFetchPost, unfollowUserFetchPost
export const unFollowUserFetchPost = createAsyncThunk(
  `${sliceName}/unFollowUser`,
  async({userIdToUnFollow}, {getState})=>{
    const { currentUserForApp } = getState().users;

    const response = await client.post(`${usersRoute}/unFollowUser`,{
      currentUserId: currentUserForApp.id,
      userIdToUnFollow: userIdToUnFollow
    });

    const {
      userFollowersRelations
     } = response;
    return {userFollowersRelations};

  }
);


const profilePostsReducer = createSlice({
  name: `${sliceName}`,
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

      state.followingRelationsStatus = StatusData.idle;
      state.userFollowingRelations = [];
      state.userFollowersRelations = [];
      state.followAndUnFollowRequestsStatus = StatusData.idle;
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

    [fetchSubscribeRelationsForUser.pending]:(state, action) => {
      state.followingRelationsStatus = StatusData.loading;
    },
    [fetchSubscribeRelationsForUser.fulfilled]:(state, action) => {
      state.followingRelationsStatus = StatusData.succeeded;

      const {
        userFollowingRelations,
        userFollowersRelations
      } = action.payload;

      state.userFollowingRelations = [
        ...state.userFollowingRelations,
        ...userFollowingRelations
      ];
      state.userFollowersRelations = [
        ...state.userFollowersRelations,
        ...userFollowersRelations
      ];
    },
    [followUserFetchPost.pending]:(state, action) => {
      state.followAndUnFollowRequestsStatus = StatusData.loading;
    },
    [followUserFetchPost.fulfilled]:(state, action) => {
      state.followAndUnFollowRequestsStatus = StatusData.succeeded;
      const {
        userFollowersRelations
      } = action.payload;

       state.userFollowersRelations = [
        ...state.userFollowersRelations,
        ...userFollowersRelations
      ];

    },
    [unFollowUserFetchPost.pending]:(state, action) => {
      state.followAndUnFollowRequestsStatus = StatusData.loading;
    },
    [unFollowUserFetchPost.fulfilled]:(state, action) => {
      state.followAndUnFollowRequestsStatus = StatusData.succeeded;
      const {
        userFollowersRelations
      } = action.payload;

       state.userFollowersRelations = [
        ...userFollowersRelations
      ];

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

export const selectGlobalProfilePosts = state => state.profilePosts;

export const selectFetchedAllProfilePostsLength = (state) =>
  state.profilePosts.fetchedAllEntitiesLength;

export const selectProfilePostsStatus = (state) => state.profilePosts.status;

export const selectProfilePostsCurrentUserId = (state) =>
  state.profilePosts.currentUserId;

  // followingRelationsStatus:StatusData.idle,
  // followAndUnFollowRequestsStatus:StatusData.idle,
  // userFollowingRelations:[],
  // userFollowersRelations:[]

export const selectFollowingRelationsStatus = createSelector(
  selectGlobalProfilePosts,
  profilePosts => profilePosts.followingRelationsStatus
);

export const selectFollowAndUnFollowRequestsStatus = createSelector(
  selectGlobalProfilePosts,
  profilePosts => profilePosts.followAndUnFollowRequestsStatus
);

export const selectUserFollowersAndFollowingRelations = createSelector(
  (state)=> selectGlobalProfilePosts(state),
  (profilePosts) => {
    const {userFollowersRelations, userFollowingRelations} = profilePosts;
    return {userFollowersRelations, userFollowingRelations} 
  }
);
