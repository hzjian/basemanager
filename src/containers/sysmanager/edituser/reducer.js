/* jshint esversion: 6 */


const initialState = {

};

export default (state = initialState,action)  => {
  switch (action.type) {
    case "system_manager_user_update_query":
      return Object.assign({}, state, {
          page: action.payload.page,
      });
     
      case "system_manager_user_update_failure":
          return Object.assign({}, state, {
              error: action.payload.error
          });
    default:
      return state;
  }
};
