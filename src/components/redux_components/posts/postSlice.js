
import {useState} from 'react';

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

	// sortComparer:(postA, postB)=>
	// 	postB.date.localeCompare(postA.date)

	});

const initialState = postsAdapter.getInitialState({

	status:StatusData.idle,
	error:null
})

export const addLikeToPost = createAsyncThunk(
	'POST_LIKE',
	async({postId})=>{
		const client = new ClientBuilder(`fakeApi/posts/addLikeToPost`,
			{body:{
				postId:postId
			},customHeaders:{}});
		const response = await client.fetchWithConfig();
		console.log('response from server ', response);
		const post = response.result;
		return post;
	}
)


export const fetchPosts = createAsyncThunk(
	'FETCH_POSTS',
	async({from,to},{getState})=>{

		console.log('getState passed as obj', getState);
		const allPosts = selectAllPosts(getState());
		console.log('all posts before fetch', allPosts);

		console.log('posts fetch ', postsRoute);
		const client = new ClientBuilder(postsRoute);
		const response = await client.fetchWithConfig(null,
			{body:null,
				customHeaders:{
					from:from,
					to:to
		}});
		const posts = response;

		console.log('response  from server', response);
		console.log('every post has user',posts.every(p=>p.userId))
		return posts;

	}
)
const postsSlice = createSlice({
	name:'posts',
	initialState,
	reducers:{
		changePostStatusToStartFetching(state,action){
			console.log(
				'changePostStatusToStartFetching old status ', state.status);
			
			if(state.status == StatusData.loading)
				return;
			
			const { newStatus } = action.payload;
			state.status = newStatus;
			console.log(
				'changePostStatusToStartFetching post status changed ', state.status);
		},
		postAdded(state, action){
			console.log('adding post ', action.payload);

			postsAdapter.addOne(state, action.payload)
		}

	},
	extraReducers:{
		[fetchPosts.pending]:(state,action)=>{
			state.status = StatusData.loading;
		},

		[fetchPosts.fulfilled]:(state,action)=>{
			state.status = StatusData.succeeded;

			console.log
				('fetchPosts.fulfilled action.payload',action.payload);

			postsAdapter.upsertMany(state,action.payload);
		},
		[addLikeToPost.fulfilled] : ( state, action ) => {
			state.status = StatusData.succeeded;

			console.log('addLikeToPost.fulfilled action.payload.id', action.payload.id);
			
			const updatedPost = action.payload;
			const {id} = updatedPost;
			// const oldPost = selectPostById(state, id);//state is undefined
			const oldPost = state.entities[id];
			
			console.log(`oldPost id ${oldPost.id}, oldPost likes ${oldPost.likeCount}`);
			console.log(`updatedPost id ${updatedPost.id}, updatedPost likes ${updatedPost.likeCount}`);

			Object.assign(oldPost, updatedPost);
			// postsAdapter.updateOne(state, updatedPost)

		}
	}
})

export default postsSlice.reducer;

export const {
	changePostStatusToStartFetching,
	postAdded
} = postsSlice.actions;

export const {
	selectAll:selectAllPosts,
	selectById:selectPostById,
	selectIds:selectPostIds
}=postsAdapter.getSelectors(state=>state.posts)