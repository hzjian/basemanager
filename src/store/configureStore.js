import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import auth from "../containers/login/reducer";
import { selectedUserTasksPage, userTasksByPage } from "../containers/taskmanager/tasklist/reducer";
import { groupData } from "../containers/sysmanager/groupmgr/reducer";
import { reducer as createtaskReducer} from '../containers/taskmanager/createtask';
import { reducer as usercontentReducer} from '../containers/usercontent';
import { reducer as headerReducer} from '../components/header';

const logger = createLogger();
const rootReducer = combineReducers({
    auth,
    selectedUserTasksPage,
    userTasksByPage,
    alerts:headerReducer,
    groupData:groupData,
    cTaskData: createtaskReducer,
    usercontent: usercontentReducer
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
