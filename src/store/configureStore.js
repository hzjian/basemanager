import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { reducer as loginRecucer} from "../containers/login";
import { reducer as tasklistReducer} from "../containers/taskmanager/tasklist";
import { reducer as taskfieldReducer} from "../containers/taskmanager/taskfield";
import { reducer as createTaskReducer} from '../containers/taskmanager/createtask';
import { reducer as modifyTaskReducer} from '../containers/taskmanager/modifytask';
import { reducer as usercontentReducer} from '../containers/usercontent';
import { reducer as mapDataReducer} from '../containers/usercontent/mapcomponent';
import { reducer as headerReducer} from '../components/header';
import { reducer as infoBoxReducer} from '../containers/usercontent/popup';
import { reducer as userTaskReducer} from '../containers/usercontent/mapcomponent/toolbar/tasktable';
import { reducer as drawRecucer} from '../containers/usercontent/mapcomponent/toolbar/drawmanager';
import { reducer as refLayerReducer } from '../containers/taskmanager/reflayer';
import { reducer as taskUserReducer } from '../containers/taskmanager/taskuser'

import { reducer as groupmgrReducer } from '../containers/sysmanager/groupmgr';
import { reducer as groupUserReducer } from '../containers/sysmanager/groupuser';
import { reducer as groupMemberReducer } from '../containers/groupmanager/groupmember'
import { reducer as groupKernelReducer } from '../containers/groupmanager/groupkernel';
import { reducer as addKernelReducer } from '../containers/groupmanager/addkernel';
import { reducer as kernelFieldReducer } from '../containers/groupmanager/kernelfield';
import { reducer as kernelFeatureReducer } from '../containers/groupmanager/kernelfeature';
import { reducer as groupDictReducer } from '../containers/groupmanager/groupdict';
import { reducer as dictItemReducer } from '../containers/groupmanager/dictitem';
import { reducer as editUserReducer } from '../containers/sysmanager/edituser';
import { reducer as addUserReducer } from '../containers/sysmanager/adduser';
import { reducer as refLayerFieldReducer}  from '../containers/taskmanager/reflayerfield';

const logger = createLogger();
const rootReducer = combineReducers({
    auth:loginRecucer,
    taskData:tasklistReducer,
    alerts:headerReducer,
    createTaskData: createTaskReducer,
    modifyTaskData: modifyTaskReducer,
    usercontent: usercontentReducer,
    mapData: mapDataReducer,
    infoData: infoBoxReducer,
    usertaskData : userTaskReducer,
    drawData: drawRecucer,
    fieldData:taskfieldReducer,
    refData:refLayerReducer,
    taskUserData:taskUserReducer,
    groupData:groupmgrReducer,
    groupUserData:groupUserReducer,
    groupMemberData:groupMemberReducer,
    groupKernelData: groupKernelReducer,
    addKernelData: addKernelReducer,
    kernelFieldData: kernelFieldReducer,
    feaListData: kernelFeatureReducer,
    dictListData: groupDictReducer,
    dictItemData: dictItemReducer,
    editUserData:editUserReducer,
    addUserData: addUserReducer,
    refLayerFieldData:refLayerFieldReducer,
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
