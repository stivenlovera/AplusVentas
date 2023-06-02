import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storeReducer from './Slice';
export const storeToken = configureStore({
    reducer: storeReducer
});
