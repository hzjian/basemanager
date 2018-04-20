import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import auth from "../reducers/auth";
import alerts from "../reducers/alerts";
import { selectedUserTasksPage, userTasksByPage } from "../reducers/usertasks";
import { selectedUserMapPage,userMapByPage,drawAddMap } from "../reducers/map";
import { selectedUsersPage, usersByPage } from "../reducers/users";
import { selectedReposPage, reposByPage } from "../reducers/repos";
import { groupData } from "../reducers/groupReducer"

const logger = createLogger();
const rootReducer = combineReducers({
  auth,
  alerts,
  selectedUsersPage,
  usersByPage,
  selectedUserTasksPage,
  userTasksByPage,
  selectedReposPage,
  reposByPage,
    selectedUserMapPage,
    userMapByPage,
    drawAddMap,
    groupform:groupData
});

const initialState = {};

export default function configureStore() {
  let store;

  if (module.hot) {
    store = createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(thunkMiddleware, logger),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    );
  } else {
    store = createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(thunkMiddleware), f => f)
    );
  }

  return store;
}
