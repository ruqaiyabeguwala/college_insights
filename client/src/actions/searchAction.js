import {SEARCH_STUDENT,SEARCH_STUDENT_FAIL,
   SORT_STUDENT_BY_BRANCH,SORT_STUDENT_FAIL_BRANCH, 
      SEARCH_STUDENT_BY_BRANCH, SEARCH_STUDENT_FAIL_BRANCH} from "./types"
import axios from "axios";
import {setAlert} from "./index"

//search for a stduent with name
export const searchStudent=(name)=>async dispatch=>{
    try{
      const res= await axios.get(`/search/${name}`)
     dispatch({
    type:SEARCH_STUDENT,
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
    type:SEARCH_STUDENT_FAIL,
    payload: {msg:err.response.statusText,type:err.response.status}
})
    }
}

//search by branch
export const searchByBranch=(value)=> dispatch=>{
    try{
      dispatch({
          type:SEARCH_STUDENT_BY_BRANCH,
          payload:value
      })
    }
    catch(err){
dispatch({
    type:SEARCH_STUDENT_FAIL_BRANCH,
    payload:err
})
    }
    }

    //sort students 
    export const sortByBranch=(term)=> dispatch=>{
        try{
          dispatch({
              type:SORT_STUDENT_BY_BRANCH,
              payload:term
          })
        }
        catch(err){
    dispatch({
        type:SORT_STUDENT_FAIL_BRANCH,
        payload: err
    })
        }
        }

