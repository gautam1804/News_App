import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import favouritesReducer from './reducers/favouritesReducer';

const rootReducer = {
  auth: authReducer,
  favourites: favouritesReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
