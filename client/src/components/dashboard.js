import React, { Component,Fragment,useEffect } from 'react';
import MyNavbar from "./navbar"
import {connect} from "react-redux"
import {getStudents} from "./../actions/index";
import {Row,Card} from "reactstrap"
import PropTypes from 'prop-types';
import {Redirect} from "react-router"
import MySpinner from './mySpinner';



const DashBoard =({getStudents,user,student})=>{
useEffect(() => {
getStudents()
}, [getStudents])

if(user.loading){
    return <MySpinner/>
}
if(!user.isAuthenticated){
  return  <Redirect to="/"/>
}
   return(
             <div>
          
           <MyNavbar />
           <h1 >DashBoard!</h1>
        <Row style={{display:"flex",padding:"20px",background:"#cccccc",textAlign:"center",justifyContent:"center",marginTop:"70px",height:"200px"}}>
    <Card className="col col-sm-3" style={{marginRight:"30px"}}>
       Total students
       <br/>
       <br/>
      <h1>{student.count}</h1> 
    </Card>
    <Card className="col col-sm-3" >
Average attendance
<br/>
<br/>
<h1>{student.avg}%</h1>
</Card>
</Row>  
       </div> 
   )

}

DashBoard.propTypes={
    getStudents:PropTypes.func.isRequired,
    student:PropTypes.object.isRequired,
    history:PropTypes.object.isRequired,
    
    }
  
function mapStateToProps(state){
return{
    student:state.student,
    user:state.user
}
}
export default connect(mapStateToProps,{getStudents}) (DashBoard);