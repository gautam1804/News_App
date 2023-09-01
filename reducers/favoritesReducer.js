// reducers/favouritesReducer.js
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../actions/favoritesActions';

const initialState = [];

const favouritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return [...state, action.payload];
    case REMOVE_FAVORITE:
      return state.filter(article => article.id !== action.payload);
    default:
      return state;
  }
};

export default favouritesReducer;
