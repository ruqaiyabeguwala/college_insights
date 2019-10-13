import React, {Component, useState,useEffect } from 'react';
import { Table,ListGroupItem,ListGroup,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Search from "../containers/search"
import MyNavbar from "./navbar"
import {connect} from "react-redux";
import { getStudentWithBranch } from '../actions';
import { withRouter } from 'react-router-dom';
import empty from "./../img/empty.gif"
import {setAttendance} from "./../actions/index"

const Tabs = ({match,getStudentWithBranch,student,history,setAttendance}) => {
  
  useEffect(() => {
  getStudentWithBranch(match.params.branch,match.params.year)
}, [match.params.year,match.params.branch])

if(!student.length){
  return <div>
     <h4 style={{textAlign:'center',marginTop:"20px"}}>No Students found!</h4>
     <img src={empty} alt="No Students found!"/>
     </div>
 }
  
  return (
    <div>
      <MyNavbar/>
      <Search/>
       <Table>
<thead>
  <tr>
    <th>Name</th>
    <th> Total attendance</th>
    <th>Present</th>
    <th>Absent</th>
  </tr>
</thead>
<tbody>
 
 { student.map((student)=>{

    return <tr key={student._id}>
    <td onClick={()=>history.push(`/student/${student._id}`)} style={{cursor:"pointer",padding:"10px"}}>{student.name}</td>
    <td>{student.total}</td>
    <td><Button className="btn-danger" onClick={()=>setAttendance(student._id,false)}>Present</Button></td>
  <td><Button className="btn-success" onClick={()=>setAttendance(student._id,true)}>Absent</Button></td>
  </tr>
 })
}
</tbody>
</Table>



    </div>
  );
}
function mapStateToProps(state){
    return{
        student:state.student.classStudent
    }
} 
export default connect(mapStateToProps,{getStudentWithBranch,setAttendance})(withRouter(Tabs));