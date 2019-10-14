import React, {useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import classnames from 'classnames';
import Search from "./search"
import MyNavbar from "./navbar"
import {connect} from "react-redux";
import { getStudentWithBranch } from '../actions';
import { withRouter } from 'react-router-dom';
import empty from "./../img/empty.gif"
import {setAttendance} from "./../actions/index"
import PropTypes from 'prop-types'

const Tabs = ({match,getStudentWithBranch,student,history,setAttendance}) => {
 
  useEffect(() => {
  getStudentWithBranch(match.params.branch,match.params.year)
}, [match.params.year,match.params.branch])

const onClickHandle=(id,present)=>{
  setAttendance(id,present)

}

if(!student.length){
  return <div>
     <h4 style={{textAlign:'center',marginTop:"20px"}}>No Students found!</h4>
     <img src={empty} alt="No Students found!"/>
     </div>
 }
  
  return (
    <div>
      <MyNavbar/>
       <Table>
<thead>
  <tr>
    <th>Name</th>
    <th>Present</th>
    <th>Absent</th>
  </tr>
</thead>
<tbody>
 
 { student.map((student)=>{

    return <tr key={student._id}>
    <td onClick={()=>history.push(`/student/${student._id}`)}  style={{cursor:"pointer",padding:"10px"}}>{student.name}</td>
    <td><Button className="btn-success" onClick={()=>onClickHandle(student._id,"true")}>Present</Button></td>
  <td><Button className="btn-danger" onClick={()=>onClickHandle(student._id,"false")}>Absent</Button></td>
  </tr>
 })
}
</tbody>
</Table>



    </div>
  );
}

Tabs.propTypes={
  getStudentWithBranch:PropTypes.func.isRequired,
  student:PropTypes.object.isRequired,
  history:PropTypes.func.isRequired,
  setAttendance:PropTypes.func.isRequired,
  match:PropTypes.func.isRequired,
  }

function mapStateToProps(state){
    return{
        student:state.student.classStudent
    }
} 
export default connect(mapStateToProps,{getStudentWithBranch,setAttendance})(withRouter(Tabs));