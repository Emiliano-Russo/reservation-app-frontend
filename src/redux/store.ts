import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import footerSlice from './footerSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    footer: footerSlice,
  },
});
