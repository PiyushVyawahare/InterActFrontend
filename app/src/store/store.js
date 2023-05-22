import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk'
import setUserDetails from "./reducer";

const rootReducer = combineReducers({
  setUserDetails,
});

// create a single store, this store will be provided to the top level react component
const store = createStore(rootReducer, applyMiddleware(thunk));

// window.myStore = store;

export default store;