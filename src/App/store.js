import {configureStore} from '@reduxjs/toolkit';
import  itemCounterReducer  from "../components/messages/counter/itemCounterSlice";
import postsReducer from '../components/PostList/postSlice';
import videosReducer from '../components/home/VideoComponent/videosSlice';
import usersReducer from '../components/profile/usersSlice';

import commentsReducer from '../components/comments/commentSlice';


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

