import {GET_STUDENT,GET_SINGLE_STUDENT,SEARCH_STUDENT,SEARCH_STUDENT_FAIL,
    GET_STUDENT_FAIL,GET_STUDENT_WITH_BRANCH_FAIL,
    GET_STUDENT_WITH_BRANCH_SUCCESS,SET_ATTENDANCE,SET_ATTENDANCE_FAIL,
    SET_ALERT,REMOVE_ALERT, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL,AUTH_FAIL,AUTH_SUCCESS, GET_COUNT, GET_COUNT_FAIL, LOGOUT} from "./types"
import axios from "axios";
import uuid from "uuid"
import  setAuthToken from "./../utils/setAuthToken";



export const loadUser=()=>async dispatch=>{

    if(localStorage.token)
    setAuthToken(localStorage.token)
    try{
         const res=await axios.get("/auth")
         dispatch({
             type:AUTH_SUCCESS,
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
         dispatch({
             type:AUTH_FAIL,
             payload: {msg:err.response.statusText,type:err.response.status}
         })
        
    }
}


//set alert for transactions
export const setAlert=(msg,type)=>dispatch=>{
    const id = uuid.v4();
    dispatch({
        type:SET_ALERT,
        payload:{type,msg,id}
    })

    setTimeout(
        ()=>dispatch({
           type:REMOVE_ALERT,
           payload:id
        }),5000
        
        )
}
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
     const res= await axios.get(`/student/auth/${id}`)
     dispatch({
    type:GET_SINGLE_STUDENT,
    payload:{student:res.data.student,count:res.data.count}
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


//search for a stduent with name
export const searchStudent=(name)=>async dispatch=>{
    try{
     
      const res= await axios.get(`/search/${name}`)
      console.log(res.data)
     dispatch({
    type:SEARCH_STUDENT,
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
    type:SEARCH_STUDENT_FAIL,
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
    payload:{id,attendance:res.data}
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


export const loginUser=(user)=>async dispatch=>{
    try{
    const res=await axios.post("/auth/login",user);
    dispatch({
        type:LOGIN_USER_SUCCESS,
        payload:res.data
    })
    dispatch(loadUser())
    
    }
    catch(err){
        console.error(err.message)
        const errors=err.response.data.errors;
        if(errors){
            errors.forEach(err=>{
          dispatch(setAlert(err.msg,"danger"))
            })
        }
        dispatch({
            type:LOGIN_USER_FAIL,

           payload: {msg:err.response.statusText,type:err.response.status}
        })
    }
}

export const logout=()=>dispatch=>{
    dispatch({
        type:LOGOUT
    })
}