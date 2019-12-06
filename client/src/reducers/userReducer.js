import {LOGIN_USER_FAIL,LOGIN_USER_SUCCESS, AUTH_FAIL,AUTH_SUCCESS, LOGOUT} from "./../actions/types"
const initState={
loading:true,
token:localStorage.getItem("token"),
isAuthenticated:false,
userData:[],
error:[]
}
export default function(state= initState,action){
    switch(action.type){
        case LOGIN_USER_SUCCESS:
        localStorage.setItem("token",action.payload)
        return{
            ...state,
            loading:false,
            token:action.payload
            
        }
       case AUTH_SUCCESS:
       return{
           ...state,
           token: localStorage.getItem("token"),
           isAuthenticated:true,
           loading:false,
           userData:action.payload
          
       }
       case LOGIN_USER_FAIL:
       case AUTH_FAIL:
       localStorage.removeItem('token')
        return{
          loading:false,
          token:null,
          ...state,
          error:action.payload
        } 
        case LOGOUT:
        localStorage.removeItem("token");
        return{
            ...state,
            loading:false,
            token:null
            
        }
        default:
        return state
    }
}