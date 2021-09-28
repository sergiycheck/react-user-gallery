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

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  status: StatusData.idle,
  error: null,
});


export const fetchSingleUser = createAsyncThunk(
  `${usersName}/fetchUser`,
  async (userId) => {
    const fetchUserUrl = singleUserPageRoute.replace(":userId", userId);
    // console.log('fetching user', url);

    const response = await client.get(fetchUserUrl);

    // console.log('got response', response);
    return response.user;
  }
);

export const fetchUsers = createAsyncThunk(
  `${usersName}/fetchUsers`,
  async () => {

    const response = await client.get(usersRoute);

    // console.log('got response',response);
    return response.users;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    
    [fetchUsers.pending]: (state, action) => {
      state.status = StatusData.loading;
    },
    
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = StatusData.succeeded;
      //state.userItems = state.userItems.concat(action.payload);
      // console.log('got users',action)
      usersAdapter.upsertMany(state, action.payload);
    },
    
    [fetchSingleUser.fulfilled]: (state, action) => {
      state.status = StatusData.succeeded;

      // console.log('got single user', action.payload);
      usersAdapter.upsertOne(state, action.payload);
    },

  },
});

export default usersSlice.reducer;

// export const selectAllUsers = (state) => state.users.userItems;
// export const selectUserById = (state,userId) =>
// 	state.users.userItems.find(user=>user.id === userId);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUsersIds,
} = usersAdapter.getSelectors((state) => state.users);


