import React, {useEffect,useState } from 'react';
import { Table, Button,Form,Input } from 'reactstrap';
import {connect} from "react-redux";
import * as actions from '../actions';
import { withRouter } from 'react-router-dom';
import empty from "./../img/empty.gif"
import {setAttendance,searchByBranch} from "./../actions/index"
import PropTypes from 'prop-types'
import Spinner from "./mySpinner"
import {Redirect} from "react-router"

const Tabs = ({match,sortByBranch,getStudentWithBranch,setAlert,searchByBranch,student:{classStudent,loading,search},history,setAttendance,user}) => {
  let curr = new Date();
  curr.setDate(curr.getDate());
  var datee = curr.toISOString().substr(0,10); 
  const [term, setterm] = useState("")
  const [date, setDate] = useState(datee)
  useEffect(() => {
  getStudentWithBranch(match.params.branch,match.params.year)
}, [match.params.year,match.params.branch,getStudentWithBranch])

const changeBackground=(e)=>e.target.style.background='#F3F3F3';
const changeAgainBackground=(e)=> e.target.style.background= null;
const handleDate=(event)=>setDate(event.target.value)
const onHandleChange=(value)=>{
  setterm(value);
  searchByBranch(value);
  }
const renderAll=(classStudent)=>{
 return classStudent.map((student)=>{
    return <tr key={student._id}  >
    <td onClick={()=>history.push(`/student/${student._id}`)}  
    style={{cursor:"pointer",padding:"10px"}}
    onMouseOver={changeBackground} onMouseLeave={changeAgainBackground}>
    {student.name}
    </td>
   <td>
   <Button onClick={()=>setAttendance(student._id,true,date) } className=
     { student.attendance.find(att=>att.date==date && att.present==true)?"btn btn-success":"btn btn-default"}>
  Present
  </Button>
  </td>
  <td>
  <Button onClick={()=>setAttendance(student._id,false,date)} className=
  { student.attendance.find(att=>att.date==date && att.present==false)?"btn btn-danger":"btn btn-default"}>
 Absent
  </Button>
  </td>
   <td>{student.total}</td>
  </tr>
 })
}
if(!user.isAuthenticated){
  setAlert("Please login first","danger");
  return  <Redirect to="/"/>
}


if(!classStudent.length){
  return <div>
     <h4 style={{textAlign:'center',marginTop:"20px"}}>No Students found!</h4>
     <img src={empty} alt="No Students found!"/>
     </div>
 }
  return (
    <div>
      <Form inline style={{margin:"20px"}}>
     
   Date <Input type="date" name="date" id="date" onChange={handleDate} className="form-control" value={date}/>
   Search <Input type="text" onChange={(event)=>onHandleChange(event.target.value)} className="float-right"/>
 <Button onClick={()=>sortByBranch("name")}>Sort</Button> <br/>  
 <Table>
<thead>
  <tr>
    <th>Name</th>
    <th>Present</th>
    <th>Absent</th>
    <th>Attendance %</th>
  </tr>
</thead>
<tbody>
 {
  !term?renderAll(classStudent):renderAll(search)
 }
</tbody>
</Table>
 </Form>
    </div>
  );
}

Tabs.propTypes={
  getStudentWithBranch:PropTypes.func.isRequired,
  student:PropTypes.object.isRequired,
  history:PropTypes.object.isRequired,
  setAttendance:PropTypes.func.isRequired,
  match:PropTypes.object.isRequired,
  }

function mapStateToProps(state){
    return{
        student:state.student,
        user:state.user
    }
} 
export default connect(mapStateToProps,actions)(withRouter(Tabs));