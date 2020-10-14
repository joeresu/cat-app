import {combineReducers} from "redux";
import {sessionReducer} from "redux-react-session";
import cats from "./catsReducer";

const appReducer = combineReducers({
  session: sessionReducer,
  cats
});

const rootReducer = (state, action) => {
  let newState = state;
  return appReducer(newState, action);
};

export default rootReducer;
