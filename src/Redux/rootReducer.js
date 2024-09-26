import { combineReducers } from "redux";
import user from "./Reducers/user";
import photographer from "./Reducers/photographer";
import filter from "./Reducers/filter";
import grid from "./Reducers/grid";

const createRootReducer = () =>
  combineReducers({
    user,
    photographer,
    filter,
    grid,
  });

export default createRootReducer;
