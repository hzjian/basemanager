/* jshint esversion: 6 */

  const initialState = {
    groupuserlist:[],
    totalCount:0
  };
  
  export default (state = initialState,action)  => {
    switch (action.type) {
        case "system_manager_user_query_success":
          return Object.assign({}, state, {
            groupuserlist: action.payload.groupuserlist,
            totalCount: action.payload.totalCount,
          });  
        case "system_manager_user_update_success" :
          return Object.assign({}, state, {
              userinfo: action.payload.userinfo,
              groupuserlist : state.groupuserlist.map((item) =>{
                if(item && action.payload.userinfo && item.userName === action.payload.userinfo.userName)
                {
                  item.userCnname = action.payload.userinfo.userCnname;
                  item.userEmail = action.payload.userinfo.userEmail;
                }
                return item;
              })
          });  
        case "system_manager_user_add_success":
            return Object.assign({}, state, {
                userinfo: action.payload.userinfo,
                groupuserlist: state.groupuserlist.concat(action.payload.userinfo)
            });     
      default:
        return state;
    }
  };
  