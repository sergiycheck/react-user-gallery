// use pagination state from and to here to fetch from NavBar component
// and additional fetches from searchComponent

import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

import {
  StatusData,
  // postsRoute,
  usersName,
  usersRoute,
} from "../../../api/ApiRoutes";

import { client } from "../../../api/client";

const searchDataAdapter = createEntityAdapter({});

const FetchIncrement = 5;

const initialState = searchDataAdapter.getInitialState({
  
  fetchedAllEntitiesLength: 0,
  status: StatusData.idle,
  error: null,

  searchQuery: "",
  fetchFrom: 0,
  fetchTo: FetchIncrement,
  
});

export const searchUsersPostsByUserName = createAsyncThunk(
  `searchData/${usersName}/searchForUsersPosts`,
  async ({from, to}, { getState }) => {

    // console.log(`from ${from}, to ${to}, query ${query} `);
    
    const { searchQuery } = getState().searchData;

    console.log(`searchQuery ${searchQuery}, from ${from}, to ${to} state`,getState());

    const response = await client.post(
      `${usersRoute}/searchForUsersPosts`,
      { searchUserName: searchQuery },
      {
        headers: {
          from: from,
          to: to,
        },
      }
    );
    console.log("response", response);

    const { posts, allPostsLength } = response;
    return { posts, allPostsLength };
  }
);

//TODO: separate slice for searches because of pagination ?
export const searchForUsersNames = createAsyncThunk(
  `${usersName}/searchForUsersNames`,
  async ({ query }) => {
    const response = await client.get(`${usersRoute}/searchForNames/${query}`);

    // console.log('response', response);
    if (response) return response.userNamesArr;
    return [];
  }
);

const searchDataSlice = createSlice({
  name: "searchData",
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      const { query } = action.payload;

      if(query !== state.searchQuery){
        state.fetchFrom = 0;
        state.fetchTo = FetchIncrement
      }

      state.searchQuery = query;
    },

    //dispatch this action after searchUsersPostsByUserName
    changePaginationPropsForSearchQuery(state, action) {
      const {query} = action.payload;

      if(query !== state.searchQuery){

        state.fetchFrom = 0;
        state.fetchTo = FetchIncrement
        return;
      }

      const { fetchTo } = state;
      state.fetchFrom = fetchTo;
      state.fetchTo = fetchTo + FetchIncrement;
      
    },

    changeSearchDataStatusToStartFetching(state, action) {
      if (state.status === StatusData.loading) return;
      const { newStatus } = action.payload;
      state.status = newStatus;
    },
    //dispatch this action when searching for other posts
    removeAllEntities(state, action){

      searchDataAdapter.removeAll(state);
      state.searchQuery = '';
      state.fetchedAllEntitiesLength = 0;
      state.fetchFrom = 0;
      state.fetchTo = FetchIncrement;
      state.status = StatusData.idle;
      state.error = null;
    }, 
  },
  extraReducers: {
    [searchUsersPostsByUserName.pending]: (state, action) => {
      state.status = StatusData.loading;
    },

    [searchUsersPostsByUserName.rejected]: (state, action) => {
      state.status = StatusData.succeeded;
    },
    [searchUsersPostsByUserName.fulfilled]: (state, action) => {
      state.status = StatusData.succeeded;

      const { posts, allPostsLength } = action.payload;

      state.fetchedAllEntitiesLength = allPostsLength;

      searchDataAdapter.upsertMany(state, posts);
    },
  },
});

export default searchDataSlice.reducer;

export const {
  changePaginationPropsForSearchQuery,
  setSearchQuery,
  
  changeSearchDataStatusToStartFetching,
  removeAllEntities,
  
} = searchDataSlice.actions;

export const {
  selectAll: selectAllSearchedPosts,
  selectById: selectSearchedPostById,
  selectIds: selectAllSearchedPostByIds,
} = searchDataAdapter.getSelectors((state) => state.searchData);

export const selectSearchDataAllEntitiesLength = (state) =>
  state.searchData.fetchedAllEntitiesLength;

export const selectSearchDataStatus = (state) => state.searchData.status;

export const selectSearchQuery = (state) => state.searchData.searchQuery;

export const selectFromAndToForPagination = createSelector(
  (state) => state.searchData.fetchFrom,
  (state) => state.searchData.fetchTo,
  (from, to) => {
    return { from, to };
  }
);
