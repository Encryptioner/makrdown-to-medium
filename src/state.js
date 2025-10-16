import { configureStore, createSlice } from '@reduxjs/toolkit';

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    content: '',
  },
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { setContent } = contentSlice.actions;

export const store = configureStore({
  reducer: contentSlice.reducer,
});
