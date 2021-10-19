/* istanbul ignore file */

import { combineReducers } from "redux";
import invoiceReducer from "./invoiceReducer";
import loadingReducer from "./loadingReducer";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
  invoiceReducer,
  loadingReducer,
  errorReducer,
});

export default rootReducer;
