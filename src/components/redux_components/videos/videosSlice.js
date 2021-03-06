import { 
	createSlice,
	createAsyncThunk,
	createEntityAdapter
} from "@reduxjs/toolkit";

import {
	StatusData,
	videosRoute
} from '../../../api/ApiRoutes';
import {
	ClientBuilder
} from '../../../api/client';


const videosAdapter = createEntityAdapter({})

const initialState = videosAdapter.getInitialState({

	status:StatusData.idle,
	error:null
})

export const fetchVideos = createAsyncThunk(
	'FETCH_VIDEOS',
	async()=>{
		// console.log('video fetch ', videosRoute);
		const client = new ClientBuilder(videosRoute);
		let videoFetched = await client.fetchWithConfig();
		return videoFetched.videos
	}
)

const videosSlice = createSlice({
	name:'videos',
	initialState,
	reducers:{

	},
	extraReducers:{
		[fetchVideos.pending]:(state,action)=>{
			state.status = StatusData.loading
		},
		[fetchVideos.fulfilled]:(state,action)=>{
			state.status = StatusData.succeeded;
			// console.log('fetchVideos.fulfilled action.payload',action.payload);
			videosAdapter.upsertMany(state,action.payload);
		}
	}
})
export default videosSlice.reducer;

export const {
	selectAll:selectAllVideos,
	selectById:selectVideoById,
	selectIds:selectVideosIds
}=videosAdapter.getSelectors(state=>state.videos)