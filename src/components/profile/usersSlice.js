import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

import { usersName, usersRoute, StatusData, singleUserPageRoute } from "../../api/ApiRoutes";

import { client } from "../../api/client";

import { createSelector } from "reselect";

const usersAdapter = createEntityAdapter();

const currentUserForAppId = "knownId";

const initialState = usersAdapter.getInitialState({
  status: StatusData.idle,
  error: null,
  fetchedAllUsersLength: 0,

  currentUserForAppStatus: StatusData.idle,
  currentUserForApp: null,
});

export const fetchSingleUser = createAsyncThunk(`${usersName}/fetchUser`, async (userId) => {
  return await requestForSingleUser(userId);
});

export const fetchUsers = createAsyncThunk(`${usersName}/fetchUsers`, async ({ from, to }) => {
  const response = await client.get(usersRoute, {
    headers: {
      from,
      to,
    },
  });

  const { users, allUsersLength } = response;
  return { users, allUsersLength };
});

export const fetchSingleUserForApp = createAsyncThunk(`${usersName}/fetchSingleUserForApp`, async () => {
  const result = await requestForSingleUser(currentUserForAppId);
  return result;
});

async function requestForSingleUser(userId) {
  const fetchUserUrl = singleUserPageRoute.replace(":userId", userId);
  const response = await client.get(fetchUserUrl);
  const { user, allUsersLength } = response;
  return { user, allUsersLength };
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changeUsersStatusToStartFetching(state, action) {
      if (state.status === StatusData.loading) return;
      const { newStatus } = action.payload;
      state.status = newStatus;
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.status = StatusData.loading;
    },

    [fetchUsers.fulfilled]: (state, action) => {
      state.status = StatusData.succeeded;

      const { users, allUsersLength } = action.payload;
      state.fetchedAllUsersLength = allUsersLength;

      usersAdapter.upsertMany(state, users);
    },

    [fetchSingleUser.fulfilled]: (state, action) => {
      // state.status = StatusData.succeeded;

      const { user, allUsersLength } = action.payload;
      state.fetchedAllUsersLength = allUsersLength;

      usersAdapter.upsertOne(state, user);
    },

    [fetchSingleUserForApp.pending]: (state, action) => {
      state.currentUserForAppStatus = StatusData.loading;
    },
    [fetchSingleUserForApp.rejected]: (state, action) => {
      state.currentUserForAppStatus = StatusData.failed;
    },
    [fetchSingleUserForApp.fulfilled]: (state, action) => {
      state.currentUserForAppStatus = StatusData.succeeded;
      const { user } = action.payload;
      state.currentUserForApp = user;
    },
  },
});

export default usersSlice.reducer;

export const { changeUsersStatusToStartFetching } = usersSlice.actions;

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUsersIds,
} = usersAdapter.getSelectors((state) => state.users);

export const selectGlobalUsers = (state) => state.users;

export const selectFetchedAllUsersLength = createSelector(selectGlobalUsers, (users) => users.fetchedAllUsersLength);

export const selectUsersStatus = createSelector(selectGlobalUsers, (users) => users.status);

export const selectSingleUserForApp = createSelector(selectGlobalUsers, (users) => users.currentUserForApp);

export const selectSingleUserForAppStatus = createSelector(selectGlobalUsers, (users) => users.currentUserForAppStatus);
