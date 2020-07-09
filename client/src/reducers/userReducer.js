import {LOGIN_USER_FAIL,LOGIN_USER_SUCCESS, AUTH_FAIL,AUTH_SUCCESS, LOGOUT} from "./../actions/types"
const initState={
loading:true,
isAuthenticated:false,
userData:{},
error:[]
}
export default function(state= initState,action){
    switch(action.type){
        case LOGIN_USER_SUCCESS:
        console.log("login:",action.payload)
        return{
            ...state,
            loading:false,
            isAuthenticated:true
       //    userData:action.payload
        }
       case AUTH_SUCCESS:
       console.log("auth:",action.payload)

       return{
           ...state,
           isAuthenticated:true,
           loading:false,
           userData:action.payload || false
          
       }
       case LOGIN_USER_FAIL:
       case AUTH_FAIL:
        return{
          loading:false,
          ...state,
          isAuthenticated:false
         // error:action.payload
        } 
        case LOGOUT:
        return{
            ...state,
            loading:false
            
        }
        default:
        return state
    }
}