
import { 
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	createSelector
} from "@reduxjs/toolkit";

import {
	StatusData,
	postsRoute,
	commentsRoute
} from '../../api/ApiRoutes';

import {
	client
} from '../../api/client'


const commentsAdapter = createEntityAdapter({});
const initialState = commentsAdapter.getInitialState({
	status:StatusData.idle,
	error:null
})

export const fetchPostComments = createAsyncThunk(
	'comments/fetchCommentsForPost',
	async( {postId, from, to} )=>{

		const response = await client.get(`${postsRoute}/${postId}/comments`,{
			headers:{
				from:from,
				to:to
			}
		});

		return response.comments;
	}
)

export const addNewComment = createAsyncThunk(
	'comments/addNewComment',
	async({ postId, text },{getState}) => {

		const { currentUserForApp } = getState().users;

		const response = await client.post(`${commentsRoute}/addNew`, {postId, text, userId:currentUserForApp.id });

		return response.addedComment;
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
			commentsAdapter.upsertMany(state, action.payload);
		},
		[addNewComment.pending]: (state, action)=>{
			state.status = StatusData.loading;
		},
		[addNewComment.fulfilled]: (state, action)=>{
			state.status = StatusData.succeeded;
			const fetchedComment = action.payload;
			const {postId} = fetchedComment;
			// delete fetchedComment.postId;
			const comment = {
				...fetchedComment,
				post:postId
			};
			commentsAdapter.addOne(state, comment);
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

export const selectCommentsStatus = (state) => state.comments.status;

export const selectCommentsByPostId = createSelector(
	[selectAllComments, (state,postId)=>{
		// console.log('calling selectCommentsByPostId input selector. commentId ', postId);
		return postId;
	}],
	(comments, postId) => {
		// console.log('calling selectCommentsByPostId second output selector. postId: ', postId)
		// console.log('posts ',[comments])
		return comments.filter(cmt=>cmt.postId === postId);
	}
)