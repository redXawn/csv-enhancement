import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer/index";

let composeEnhancers = null;
/* istanbul ignore next */
if (process.env.NODE_ENV === "production") {
  composeEnhancers = compose;
} else {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(thunk))(createStore);

const store = createStoreWithMiddleware(rootReducer);

export default store;
