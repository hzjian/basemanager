/* jshint esversion: 6 */

const initialState = {
};

export default (state = initialState,action)  => {
  switch (action.type) {
    case "system_manager_company_find_success":
      return Object.assign({}, state, {
          companyData: action.payload.companydData,
      });
      case "system_manager_company_save_success":
          return Object.assign({}, state, {
              id: action.payload.id
          }); 
      case "system_manager_company_save_failure":
          return Object.assign({}, state, {
              error: action.payload.error
          });
    default:
      return state;
  }
};
