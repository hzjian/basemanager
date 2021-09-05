/* jshint esversion: 6 */


  const initialState = {
    companylist:[],
    totalCount:0
  };
  
  export default (state = initialState,action)  => {
    switch (action.type) {
        case "system_manager_company_list_query_success":
          return Object.assign({}, state, {
            companylist: action.payload.companylist,
            totalCount: action.payload.totalCount,
          });     
      default:
        return state;
    }
  };
  