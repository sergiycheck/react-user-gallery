import {configureStore} from '@reduxjs/toolkit';
import { messageCouterReducer } from "./messageCounterSlice";


export default configureStore({
	reducer:{
		messageCounter:messageCouterReducer,
	},

})