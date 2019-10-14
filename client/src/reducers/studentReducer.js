import {GET_STUDENT_WITH_BRANCH_FAIL,GET_STUDENT_WITH_BRANCH_SUCCESS, 
    GET_STUDENT_FAIL,GET_STUDENT,GET_SINGLE_STUDENT,
     SET_ATTENDANCE,SET_ATTENDANCE_FAIL, SEARCH_STUDENT,SEARCH_STUDENT_FAIL} from "./../actions/types";


const initState={
    classStudent:[],
    student:[],
    singleStudent:{},
    search:[]
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

         case SET_ATTENDANCE:
         return{
             ...state,
            classStudent:state.classStudent.map(student=>student._id===action.payload.id?{...student,student:action.payload.student}:student),
            
         }
         case SEARCH_STUDENT:
         return{
             ...state,
            search:action.payload
         //   data:state.data.filter(post=>post._id!==action.payload)
         }
        case GET_STUDENT_WITH_BRANCH_FAIL:
        case GET_STUDENT_FAIL:
        case SET_ATTENDANCE_FAIL:
        case SEARCH_STUDENT_FAIL:
        return{
            ...state
        }
        default:
        return state

    }
}