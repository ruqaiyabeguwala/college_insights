import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form"
import studentReducer from "./studentReducer"

const rootReducer= combineReducers({
form:formReducer,
student:studentReducer
})

export default rootReducer;