// src/store/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Redux Toolkit uses Immer internally, allowing us to write "mutating" syntax safely
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 10,
    history: []
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
      state.history.unshift(`+1 (New Value: ${state.value})`);
      if (state.history.length > 5) state.history.pop();
    },
    decrement: (state) => {
      state.value -= 1;
      state.history.unshift(`-1 (New Value: ${state.value})`);
      if (state.history.length > 5) state.history.pop();
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
      state.history.unshift(`+${action.payload} (New Value: ${state.value})`);
      if (state.history.length > 5) state.history.pop();
    },
    reset: (state) => {
      state.value = 0;
      state.history.unshift(`Reset to 0`);
    }
  }
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

export default counterSlice.reducer;
