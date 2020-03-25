import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form"
import studentReducer from "./studentReducer"
import alertReducer from "./alertReducer"
import userReducer from "./userReducer"
import {LOGOUT} from "./../actions/types"


const appReducer= combineReducers({
form:formReducer,
student:studentReducer,
alert:alertReducer,
user:userReducer
})
const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
      state = undefined
    }
  
    return appReducer(state, action)
  }
  
  export default rootReducer;