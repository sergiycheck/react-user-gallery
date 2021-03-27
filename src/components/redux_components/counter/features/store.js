import {configureStore} from '@reduxjs/toolkit';
import  itemCounterReducer  from "./itemCounterSlice";


export default configureStore({
	reducer:{
		itemCounter:itemCounterReducer,
	}
});