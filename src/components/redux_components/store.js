import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import  itemCounterReducer  from "./counter/itemCounterSlice";
import postsReducer from './posts/postSlice';
import videosReducer from './videos/videosSlice';
import usersReducer from './users/usersSlice';

import commentsReducer from './comments/commentSlice';


const loggerMiddleware = storeAPI => next => action =>{

  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', storeAPI.getState());
  return result;

}

export default configureStore({
	reducer:{
		itemCounter:itemCounterReducer,
		posts:postsReducer,
		videos:videosReducer,
		users:usersReducer,
		comments:commentsReducer,
	},
	middleware:(getDefaultMiddleware) =>
		getDefaultMiddleware().concat(loggerMiddleware)
});

