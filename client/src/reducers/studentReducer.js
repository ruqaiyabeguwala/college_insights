import {GET_STUDENT_WITH_BRANCH_FAIL,GET_STUDENT_WITH_BRANCH_SUCCESS, 
    GET_STUDENT_FAIL,GET_STUDENT,GET_SINGLE_STUDENT,
     SET_ATTENDANCE,SET_ATTENDANCE_FAIL,SORT_STUDENT_BY_BRANCH,SORT_STUDENT_FAIL_BRANCH, SEARCH_STUDENT,SEARCH_STUDENT_FAIL,SEARCH_STUDENT_FAIL_BRANCH, SEARCH_STUDENT_BY_BRANCH} from "./../actions/types";
import update from "react-addons-update" 

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
         classStudent:state.classStudent.map(student=>student._id===action.payload._id?action.payload:student),
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

         case SEARCH_STUDENT_BY_BRANCH:
         return{
             ...state,
             search:state.classStudent.filter(st=>st.name==action.payload),
             loading:false
         }
         case SORT_STUDENT_BY_BRANCH:
         console.log("term"+action.payload)
       const sortByKey = key => (a, b) =>{return isNaN(a)? ((a[key].toLowerCase() > b[key].toLowerCase())?1 : -1):(a[key]>b[key]?1:-1)}
         return{
             ...state,
             classStudent: state.classStudent.slice().sort(sortByKey(action.payload))
            // classStudent:state.classStudent.sort(student=>)
         }
        case GET_STUDENT_WITH_BRANCH_FAIL:
        case SEARCH_STUDENT_FAIL_BRANCH:
        case GET_STUDENT_FAIL:
        case SET_ATTENDANCE_FAIL:
        case SEARCH_STUDENT_FAIL:
        case SORT_STUDENT_FAIL_BRANCH:
        return{
            ...state,
            error:action.payload,
            loading:false
        }
        default:
        return state

    }
}