import {GET_SINGLE_STUDENT,GET_STUDENT,GET_STUDENT_FAIL,GET_STUDENT_WITH_BRANCH_FAIL,
    GET_STUDENT_WITH_BRANCH_SUCCESS,SET_ATTENDANCE,SET_ATTENDANCE_FAIL}  from "./types"
import axios from "axios";
import {setAlert} from "./index"
//get student with particular branch and year
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
const errors=err.response.data.errors;
if(errors){
    errors.forEach(err=>{
  dispatch(setAlert(err.msg,"danger"))
    })
}
dispatch({
    type:GET_STUDENT_WITH_BRANCH_FAIL,
    payload: {msg:err.response.statusText,status:err.response.status}
})
    }
}

//get all students
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
const errors=err.response.data.errors;
if(errors){
    errors.forEach(err=>{
  dispatch(setAlert(err.msg,"danger"))
    })
}
dispatch({
    type:GET_STUDENT_FAIL,
    payload: {msg:err.response.statusText,type:err.response.status}
})
    }
}

//get full student details
export const getStudent=(id)=>async dispatch=>{
    try{
     const res= await axios.get(`/student/use/detail/${id}`)
     console.log(id);
     dispatch({
    type:GET_SINGLE_STUDENT,
    payload:res.data
     })
    }
    catch(err){
        const errors=err.response.data.errors;
        if(errors){
            errors.forEach(err=>{
          dispatch(setAlert(err.msg,"danger"))
            })
        }
console.error(err.message);
dispatch({
    type:GET_STUDENT_FAIL,
    payload: {msg:err.response.statusText,type:err.response.status}
})
    }
}

//enter attendance
export const setAttendance=(id,present,date)=>async dispatch=>{
    try{
        const p={
            present: present,
            feedDate:date
        }
     const res= await axios.put(`/student/${id}`,p)
    // console.log(present)
     dispatch({
    type:SET_ATTENDANCE,
    payload:res.data
     })

     dispatch(setAlert("attendance added","success"))
    }
    catch(err){
console.error(err.message);
dispatch({
    type:SET_ATTENDANCE_FAIL,
    payload: {msg:err.response.statusText,type:err.response.status}
})
    }
}


