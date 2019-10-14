import {GET_STUDENT,GET_SINGLE_STUDENT,SEARCH_STUDENT,SEARCH_STUDENT_FAIL,
    GET_STUDENT_FAIL,GET_STUDENT_WITH_BRANCH_FAIL,
    GET_STUDENT_WITH_BRANCH_SUCCESS,SET_ATTENDANCE,SET_ATTENDANCE_FAIL,
    SET_ALERT,REMOVE_ALERT} from "./types"
import axios from "axios";
import uuid from "uuid"

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
dispatch({
    type:GET_STUDENT_WITH_BRANCH_FAIL
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
dispatch({
    type:GET_STUDENT_FAIL
})
    }
}

//get full student details
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
dispatch({
    type:SEARCH_STUDENT_FAIL
})
    }
}

//enter attendance
export const setAttendance=(id,present)=>async dispatch=>{
    try{
        const p={
            present: present
        }
     const res= await axios.put(`/student/${id}`,p)
     console.log(present)
     dispatch({
    type:SET_ATTENDANCE,
    payload:{id,attendance:res.data}
     })

     dispatch(setAlert("attendance added","success"))
    }
    catch(err){
console.error(err.message);
dispatch({
    type:SET_ATTENDANCE_FAIL
})
    }
}