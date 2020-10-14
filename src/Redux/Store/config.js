import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {createLogger} from "redux-logger";
import {sessionService} from "redux-react-session";
import ReduxThunk from "redux-thunk";
import rootReducer from "../Reducers";

let middleware = [ReduxThunk];

const logger = createLogger({
  predicate: (getState, action) => false,
  collapsed: true,
});

middleware = [...middleware, logger];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

sessionService.initSessionService(store);

export default store;
