import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/authReducer";
import favouritesReducer from "../reducers/favoritesReducer";


import '../styles/globals.css'; // Global styles

const rootReducer = combineReducers({
  auth: authReducer,
  favourites: favouritesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

function MyApp({ Component, pageProps }) {
  return (
    <>

  
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    </>
  );
}

export default MyApp;
