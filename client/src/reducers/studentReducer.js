import {GET_STUDENT_WITH_BRANCH_FAIL,GET_STUDENT_WITH_BRANCH_SUCCESS, 
    GET_STUDENT_FAIL,GET_STUDENT,GET_SINGLE_STUDENT,
     SET_ATTENDANCE,SET_ATTENDANCE_FAIL, SEARCH_STUDENT,SEARCH_STUDENT_FAIL} from "./../actions/types";


const initState={
    classStudent:[],
    student:[],
    singleStudent:{},
    search:[],
    error:[],
    count:0,
    loading:true
}
export default function(state=initState,action){
    switch(action.type){
        case GET_STUDENT_WITH_BRANCH_SUCCESS:
        return{
           ...state,
           classStudent:action.payload,
           loading:false
        }
        case GET_STUDENT:
        return{
           ...state,
           student:action.payload.student,
           count:action.payload.count,
           avg:action.payload.avg,
           loading:false
        }
        case GET_SINGLE_STUDENT:
        return{
            ...state,
            singleStudent:action.payload,
            loading:false
         }

         case SET_ATTENDANCE:
         return{
             ...state,
         classStudent:state.classStudent.map(student=>student._id===action.payload.id?{...student,attendance:action.payload.attendance}:student),
         //   classStudent:[action.payload,...state.classStudent]
         //data:state.data.map(post=>post._id===action.payload.id?{...post,likes:action.payload.likes}:post),
         loading:false
         }

         case SEARCH_STUDENT:
         return{
             ...state,
            search:action.payload,
            loading:false
         }
        case GET_STUDENT_WITH_BRANCH_FAIL:
        case GET_STUDENT_FAIL:
        case SET_ATTENDANCE_FAIL:
        case SEARCH_STUDENT_FAIL:
        return{
            ...state,
            error:action.payload,
            loading:false
        }
        default:
        return state

    }
}