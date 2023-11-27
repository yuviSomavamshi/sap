import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import MessageReducer from "./MessageReducer";

const RootReducer = combineReducers({
  login: LoginReducer,
  message: MessageReducer
});

export default RootReducer;
