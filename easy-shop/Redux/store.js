// import {createStore, combineReducers, applyMiddleware} from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

// const reducers=combineReducers({
//     //cartReduces
// })

// const store=createStore(
//     reducers,
//     composeWithDevTools(applyMiddleware(thunkMiddleWare))
// )
// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
// import your reducers
import cartItems from "./Reducers/cartItem";

// Kombinujemo sve reducere
const rootReducer = combineReducers({
  cartItems, // dodaj ostale reducere ovdje ako imaš
});

// Kreiramo store koristeći RTK
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware(); // thunk je već uključeno po defaultu
    if (__DEV__) {
      // logger dodajemo samo u dev modu
      middleware.push(logger);
    }
    return middleware;
  },
  devTools: __DEV__, // Redux DevTools uključen samo u development
});

export default store;
