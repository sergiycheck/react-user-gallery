import { 
	createSlice,
	createAsyncThunk,
	createEntityAdapter
} from "@reduxjs/toolkit";

import {
	StatusData,
	postsRoute
} from '../../../api/ApiRoutes';
import {
	ClientBuilder
} from '../../../api/client';

const postsAdapter = createEntityAdapter({
	sortComparer:(postA, postB)=>
		postA.date.localeCompare(postB.date)
});

const initialState = postsAdapter.getInitialState({

	status:StatusData.idle,
	error:null
})

export const fetchPosts = createAsyncThunk(
	'FETCH_POSTS',
	async()=>{
		console.log('posts fetch ', postsRoute);
		const client = new ClientBuilder(postsRoute)
		const response = await client.fetchWithConfig();
		const posts = response.posts
		console.log('every post has user',posts.every(p=>p.user))
		return posts;
	}
)
const postsSlice = createSlice({
	name:'posts',
	initialState,
	reducers:{

	},
	extraReducers:{
		[fetchPosts.pending]:(state,action)=>{
			state.status = StatusData.loading
		},
		[fetchPosts.fulfilled]:(state,action)=>{
			state.status = StatusData.succeeded;
			console.log
				('fetchPosts.fulfilled action.payload',action.payload);
			postsAdapter.upsertMany(state,action.payload);
		}
	}
})

export default postsSlice.reducer;

export const {
	selectAll:selectAllPosts,
	selectById:selectPostById,
	selectIds:selectPostIds
}=postsAdapter.getSelectors(state=>state.posts)