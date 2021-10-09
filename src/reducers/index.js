import { combineReducers } from "redux";
import customer from "./customer";
import charge from "./charge";
const rootReducer = combineReducers({
  customer,
  charge,
});

export default rootReducer;
