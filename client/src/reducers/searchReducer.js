import { SEARCH_STUDENT, SEARCH_STUDENT_FAIL } from "../actions/types";

const initState={
   student
}
export default function(state=initState,action){
    switch(action.type){
        case SEARCH_STUDENT:
        return{
           ...state,
           student:action.payload
        }
        case SEARCH_STUDENT_FAIL:
        return{
            ...state
        }
        default:
        return state;
    }
}