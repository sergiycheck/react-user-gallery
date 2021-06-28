import {configureStore} from '@reduxjs/toolkit';
import  itemCounterReducer  from "./counter/itemCounterSlice";
import postsReducer from './posts/postSlice';
import videosReducer from './videos/videosSlice';


export default configureStore({
	reducer:{
		itemCounter:itemCounterReducer,
		posts:postsReducer,
		videos:videosReducer
	}
});

