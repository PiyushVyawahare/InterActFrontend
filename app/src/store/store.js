import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk'
import auth from "./reducer";
import LoginReducer from "../pages/auth/store/reducer"

const rootReducer = combineReducers({
  auth: auth,
  login: LoginReducer,
});

// create a single store, this store will be provided to the top level react component
const store = createStore(rootReducer, applyMiddleware(thunk));

// window.myStore = store;

export default store;