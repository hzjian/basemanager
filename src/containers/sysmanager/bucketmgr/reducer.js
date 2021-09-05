/* jshint esversion: 6 */


  const initialState = {
    bucketlist:[],
    totalCount:0
  };
  
  export default (state = initialState,action)  => {
    switch (action.type) {
        case "system_manager_bucket_list_query_success":
          return Object.assign({}, state, {
            bucketlist: action.payload.bucketlist,
            totalCount: action.payload.totalCount,
          });     
      default:
        return state;
    }
  };
  