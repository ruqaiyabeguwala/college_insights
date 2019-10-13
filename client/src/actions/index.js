import {GET_STUDENT,GET_SINGLE_STUDENT,SEARCH_STUDENT,SEARCH_STUDENT_FAIL,
    GET_STUDENT_FAIL,GET_STUDENT_WITH_BRANCH_FAIL,GET_STUDENT_WITH_BRANCH_SUCCESS} from "./types"
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

export const searchStudent=(name)=>async dispatch=>{
    try{
     const res= await axios.get(`/search/${name}`)
     dispatch({
    type:SEARCH_STUDENT,
    payload:res.data
     })
    }
    catch(err){
console.error(err.message);
dispatch({
    type:SEARCH_STUDENT_FAIL
})
    }
}