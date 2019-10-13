import {GET_STUDENT,GET_SINGLE_STUDENT,SEARCH_STUDENT,SEARCH_STUDENT_FAIL,
    GET_STUDENT_FAIL,GET_STUDENT_WITH_BRANCH_FAIL,
    GET_STUDENT_WITH_BRANCH_SUCCESS,SET_ATTENDANCE,SET_ATTENDANCE_FAIL} from "./types"
import axios from "axios";

export const getStudentWithBranch=(branch,year)=>async dispatch=>{
    try{
     const res= await axios.get(`/student/${branch}/${year}`)
     dispatch({
    type:GET_STUDENT_WITH_BRANCH_SUCCESS,
    payload:res.data
     })
    }
    catch(err){
console.error(err.message);
dispatch({
    type:GET_STUDENT_WITH_BRANCH_FAIL
})
    }
}
export const getStudents=()=>async dispatch=>{
    try{
     const res= await axios.get(`/student/`)
     dispatch({
    type:GET_STUDENT,
    payload:res.data
     })
    }
    catch(err){
console.error(err.message);
dispatch({
    type:GET_STUDENT_FAIL
})
    }
}

export const getStudent=(id)=>async dispatch=>{
    try{
     const res= await axios.get(`/student/${id}`)
     dispatch({
    type:GET_SINGLE_STUDENT,
    payload:res.data
     })
    }
    catch(err){
console.error(err.message);
dispatch({
    type:GET_STUDENT_FAIL
})
    }
}

export const searchStudent=({name})=>async dispatch=>{
    try{
      
     dispatch({
    type:SEARCH_STUDENT,
    payload:name
     })
    }
    catch(err){
console.error(err.message);
dispatch({
    type:SEARCH_STUDENT_FAIL
})
    }
}


export const setAttendance=(id,present)=>async dispatch=>{
    try{
     const res= await axios.put(`/student/${id}`,present)
     dispatch({
    type:SET_ATTENDANCE,
    payload:res.data
     })
    }
    catch(err){
console.error(err.message);
dispatch({
    type:SET_ATTENDANCE_FAIL
})
    }
}