import React, {useEffect,useState } from 'react';
import { Table, Button,Form,Input } from 'reactstrap';
import MyNavbar from "./navbar"
import {connect} from "react-redux";
import { getStudentWithBranch, sortByBranch } from '../actions';
import { withRouter } from 'react-router-dom';
import empty from "./../img/empty.gif"
import {setAttendance,searchByBranch} from "./../actions/index"
import PropTypes from 'prop-types'
import Spinner from "./mySpinner"



const Tabs = ({match,sortByBranch,getStudentWithBranch,searchByBranch,student:{classStudent,loading},history,setAttendance,user}) => {
  let curr = new Date();
  curr.setDate(curr.getDate());
  var datee = curr.toISOString().substr(0,10); 
  var isPresent=false;
  var classNme="btn btn-default"

  const [term, setterm] = useState("")
  const [date, setDate] = useState(datee)
  useEffect(() => {
  getStudentWithBranch(match.params.branch,match.params.year,date)
}, [match.params.year,match.params.branch])



const handleDate=(event)=>{
  setDate(event.target.value)
}
const onHandleChange=(value)=>{
setterm(value);
console.log(value)
searchByBranch(value);
}


if(!classStudent.length){
  return <div>
     <MyNavbar/>
     <h4 style={{textAlign:'center',marginTop:"20px"}}>No Students found!</h4>
     <img src={empty} alt="No Students found!"/>
     </div>
 }
 
 
  return (
    <div>
      <MyNavbar/>

      <Form inline style={{margin:"20px"}}>
     
   Date <Input type="date" name="date" id="date" onChange={handleDate} className="form-control" value={date}/>
Search <Input type="text" onChange={(event)=>onHandleChange(event.target.value)} className="float-right"/>
 <Button onClick={()=>sortByBranch("total")}>Sort</Button>   
       <Table>
<thead>
  <tr>
    <th>Name</th>
    <th>Present</th>
    <th>Attendance</th>
  </tr>
</thead>
<tbody>
 
 { loading?<Spinner/>:classStudent.map((student)=>{

    return <tr key={student._id}>
    <td onClick={()=>history.push(`/student/${student._id}`)}  style={{cursor:"pointer",padding:"10px"}}>{student.name}</td>
   <td><Button  onClick={()=>setAttendance(student._id,true,date)} className={classNme}>Present</Button></td>
   <td>{student.total}</td>
  </tr>
 })
}
</tbody>
</Table>


 </Form>
    </div>
  );
}

Tabs.propTypes={
  getStudentWithBranch:PropTypes.func.isRequired,
  student:PropTypes.array.isRequired,
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
export default connect(mapStateToProps,{sortByBranch,getStudentWithBranch,setAttendance,searchByBranch})(withRouter(Tabs));