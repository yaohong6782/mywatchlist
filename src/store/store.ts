import { configureStore } from '@reduxjs/toolkit';
import mangaSlice from '../actions/mangaSlice';

const store = configureStore({
  reducer: {
    manga: mangaSlice,
    // Add other reducers here if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
