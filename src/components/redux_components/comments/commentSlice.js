
import { 
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	createSelector
} from "@reduxjs/toolkit";

import {
	StatusData,
	postsRoute
} from '../../../api/ApiRoutes';

import {
	ClientBuilder
} from '../../../api/client'


const commentsAdapter = createEntityAdapter({});
const initialState = commentsAdapter.getInitialState({
	status:StatusData.idle,
	error:null
})

//async thunks


export const fetchPostComments = createAsyncThunk(
	'FETCH_POST_COMMENTS',
	async( {postId, from, to} )=>{
		// console.log('fetchPostComments postId, {from to}', postId, {from, to});
		const client = new ClientBuilder(`${postsRoute}/${postId}/comments`);
		const response = await client
			.fetchWithConfig(null,{
				body:null,
				customHeaders:{
					from:from,
					to:to
				}
			});

		// console.log('got response',response);
		return response.comments;
	}
)



const commentsSlice = createSlice({
	name:'comments',
	initialState:initialState,
	reducers:{

	},
	extraReducers:{
		[fetchPostComments.pending] : (state, action) =>{
			state.status = StatusData.loading;
		},
		[fetchPostComments.fulfilled] : (state, action) =>{
			state.status = StatusData.succeeded;

			// console.log('got comments', action.payload);
			commentsAdapter.upsertMany(state, action.payload);
		}
	}

})

export default commentsSlice.reducer;
// export const {

// } = commentsSlice.actions;

export const {
	 selectById: selectCommentById,
	 selectAll: selectAllComments,
	 selectIds: selectCommentsIds
} = commentsAdapter.getSelectors(state=>state.comments);


export const selectCommentsByPostId = createSelector(
	[selectAllComments, (state,postId)=>{
		// console.log('calling selectCommentsByPostId input selector. commentId ', postId);
		return postId;
	}],
	(comments, postId) => {
		// console.log('calling selectCommentsByPostId second output selector. postId: ', postId)
		// console.log('posts ',[comments])
		return comments.filter(cmt=>cmt.post === postId);
	}
)