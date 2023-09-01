// actions/favouritesActions.js
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";

export const addFavorite = (article) => ({
  type: ADD_FAVORITE,
  payload: article,
});

export const removeFavorite = (articleId) => ({
  type: REMOVE_FAVORITE,
  payload: articleId,
});

