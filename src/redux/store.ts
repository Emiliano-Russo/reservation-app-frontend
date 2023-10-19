import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import footerSlice from './footerSlice';
import businessSlice from './businessSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    footer: footerSlice,
    business: businessSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
