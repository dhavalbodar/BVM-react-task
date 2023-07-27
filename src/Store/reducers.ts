import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice'; // Import your counterSlice reducer here
import candidateReducer from './Slices/candidateSlice';

const rootReducer = combineReducers({
  auth: authReducer, // Add other reducers if you have more slices
  candidate: candidateReducer
});

export default rootReducer;