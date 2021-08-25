import {configureStore} from '@reduxjs/toolkit';
import  itemCounterReducer  from "./counter/itemCounterSlice";
import postsReducer from './posts/postSlice';
import videosReducer from './videos/videosSlice';
import usersReducer from './users/usersSlice';

import commentsReducer from './comments/commentSlice';

export default configureStore({
	reducer:{
		itemCounter:itemCounterReducer,
		posts:postsReducer,
		videos:videosReducer,
		users:usersReducer,
		comments:commentsReducer,
		
	}
});

