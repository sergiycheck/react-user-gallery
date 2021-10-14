import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import {
  usersName,
  usersRoute,
  StatusData,
  singleUserPageRoute,
} from "../../api/ApiRoutes";

import { client } from "../../api/client";

import { createSelector } from 'reselect';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  status: StatusData.idle,
  error: null,
  fetchedAllUsersLength: 0,
  followedUsersIds:[]
});


export const fetchSingleUser = createAsyncThunk(
  `${usersName}/fetchUser`,
  async (userId) => {
    const fetchUserUrl = singleUserPageRoute.replace(":userId", userId);
    const response = await client.get(fetchUserUrl);
    const {user, allUsersLength} = response;
    return {user, allUsersLength};
  }
);

export const fetchUsers = createAsyncThunk(
  `${usersName}/fetchUsers`,
  async ({ from, to }) => {

    const response = await client.get(usersRoute,{
      headers:{
        from,to
      }
    });
    
    const {users, allUsersLength} = response;
    return {users, allUsersLength};

  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changeUsersStatusToStartFetching(state, action){
      if (state.status === StatusData.loading) return;
      const { newStatus } = action.payload;
      state.status = newStatus;
    },
    subscribeToUser(state, action){
      const {userId} = action.payload;
      state.followedUsersIds.push(userId);
    },
    unsubscribeFromUser(state, action){
      const {userId} = action.payload;
      state.followedUsersIds = state.followedUsersIds.filter(id=> id!==userId);
    }
  },
  extraReducers: {
    
    [fetchUsers.pending]: (state, action) => {
      state.status = StatusData.loading;
    },
    
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = StatusData.succeeded;
      
      const {users, allUsersLength} = action.payload;
      state.fetchedAllUsersLength = allUsersLength;

      usersAdapter.upsertMany(state, users);
    },
    
    [fetchSingleUser.fulfilled]: (state, action) => {
      // state.status = StatusData.succeeded;

      const {user, allUsersLength} = action.payload;
      state.fetchedAllUsersLength = allUsersLength;

      usersAdapter.upsertOne(state, user);
    },

  },
});

export default usersSlice.reducer;

export const {
  changeUsersStatusToStartFetching,
  subscribeToUser,
  unsubscribeFromUser
} = usersSlice.actions;

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUsersIds,
} = usersAdapter.getSelectors((state) => state.users);

export const selectGlobalUsers = state => state.users;

// export const selectFetchedAllUsersLength = state => 
//   state.users.fetchedAllUsersLength;

// export const selectUsersStatus = state =>
//   state.users.status;


export const selectFetchedAllUsersLength = createSelector(
  selectGlobalUsers,
  (users) => users.fetchedAllUsersLength
);

export const selectUsersStatus = createSelector(
  selectGlobalUsers,
  users => users.status
);

export const selectFollowedUsersIds= createSelector(
  selectGlobalUsers,
  users => users.followedUsersIds
);







