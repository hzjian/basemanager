/* jshint esversion: 6 */

const initialState = {
  bktData:null
};

export default (state = initialState,action)  => {
  switch (action.type) {
    case "system_manager_bucket_find_success":
      return Object.assign({}, state, {
        bktData: action.payload.bktData,
      });
    case "system_manager_bucket_save_success":
      return Object.assign({}, state, {
          fieldlist: action.payload.fieldlist,
          totalCount: action.payload.totalCount
      }); 
    case "system_manager_bucket_save_failure":
      return Object.assign({}, state, {
          error: action.payload.error
      });
    default:
      return state;
  }
};
