import { createSlice } from '@reduxjs/toolkit';

export const itemCounterSlice = createSlice({
  
  name: 'itemCounter',

  initialState: {
    value: 0,
  },

  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const {
	 increment, 
	 decrement, 
	 incrementByAmount } = itemCounterSlice.actions;

//selector
export const selectItemCount = state => state.itemCounter.value;

export default itemCounterSlice.reducer;