import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { reducer as loginRecucer} from "../containers/login";
import { reducer as headerReducer} from '../components/header';
import { reducer as bucketmgrReducer } from '../containers/sysmanager/bucketmgr';
import { reducer as groupUserReducer } from '../containers/sysmanager/usermgr';
import { reducer as editBucketReducer } from '../containers/sysmanager/editbucket';
import { reducer as addUserReducer } from '../containers/sysmanager/adduser';

import { reducer as companymgrReducer } from '../containers/sysmanager/companymgr';
import { reducer as editCompanyReducer } from '../containers/sysmanager/editcompany';

const logger = createLogger();
const rootReducer = combineReducers({
    auth:loginRecucer,
    alerts:headerReducer,
    bucketData:bucketmgrReducer,
    groupUserData:groupUserReducer,
    editBucketData:editBucketReducer,
    addUserData: addUserReducer,
    companyData:companymgrReducer,
    editCompanyData: editCompanyReducer,

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
