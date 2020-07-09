import {GET_STUDENT_WITH_BRANCH_FAIL,GET_STUDENT_WITH_BRANCH_SUCCESS, 
    GET_STUDENT_FAIL,GET_STUDENT,GET_SINGLE_STUDENT,
     SET_ATTENDANCE,SET_ATTENDANCE_FAIL,SORT_STUDENT_BY_BRANCH,SORT_STUDENT_FAIL_BRANCH, SEARCH_STUDENT,SEARCH_STUDENT_FAIL,SEARCH_STUDENT_FAIL_BRANCH, SEARCH_STUDENT_BY_BRANCH} from "./../actions/types";
     
const initState={
    classStudent:[],
    student:[],
    singleStudent:{},
    search:[],
    error:[],
    count:0,
    loading:true,
    isAscending:false
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
           student:action.payload,
           count:action.payload.length,
           avg:action.payload.reduce((tot,student)=> tot+(student.total/action.payload.length),0).toFixed(2),
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
             classStudent:state.classStudent.map(student=>student._id==action.payload._id?action.payload:student),
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
             search:state.classStudent.filter(st=>st.name.toLowerCase().includes(action.payload)),
             loading:false
         }
         case SORT_STUDENT_BY_BRANCH:
         let compare=""
         if(!state.isAscending)
          compare=(a,b)=>a.name < b.name? -1:(a.name > b.name?1:0)
         else{
        compare=(a,b)=>a.name < b.name? 1:(a.name > b.name?-1:0)
         }  
         return{
             ...state,
             classStudent: state.classStudent.sort(compare),
             isAscending:!state.isAscending
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