import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import footerSlice from './footerSlice';
import businessSlice from './businessSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    footer: footerSlice,
    business: businessSlice,
  },
});
