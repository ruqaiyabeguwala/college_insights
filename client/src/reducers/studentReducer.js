import {GET_STUDENT_WITH_BRANCH_FAIL,GET_STUDENT_WITH_BRANCH_SUCCESS, 
    GET_STUDENT_FAIL,GET_STUDENT,GET_SINGLE_STUDENT} from "./../actions/types";


const initState={
    classStudent:[],
    student:[],
    singleStudent:{}
}
export default function(state=initState,action){
    switch(action.type){
        case GET_STUDENT_WITH_BRANCH_SUCCESS:
        return{
           ...state,
           classStudent:action.payload
        }
        case GET_STUDENT:
        return{
           ...state,
           student:action.payload
        }
        case GET_SINGLE_STUDENT:
        return{
            ...state,
            singleStudent:action.payload
         }

        case GET_STUDENT_WITH_BRANCH_FAIL:
        case GET_STUDENT_FAIL:
        return{
            ...state
        }
        default:
        return state

    }
}