import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import * as actions from "../actions/index"
import { Table, Button,Form,Input } from 'reactstrap';
import Spinner from "./mySpinner"

const StudentList=({student:{classStudent,loading,history,setAttendance,date}})=> {
  var isPresent=false;
  var classNme="btn btn-default"

  const changeBackground=(e)=>e.target.style.background='#F3F3F3';
  const changeAgainBackground=(e)=> e.target.style.background= null;
  return (   
    <div>
   
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

    return <tr key={student._id}  >
    <td onClick={()=>history.push(`/student/${student._id}`)}  
    style={{cursor:"pointer",padding:"10px"}}
    onMouseOver={changeBackground} onMouseLeave={changeAgainBackground}
    >{student.name}</td>
   <td><Button  onClick={()=>setAttendance(student._id,true,date)} className={classNme}>Present</Button></td>
   <td>{student.total}</td>
  </tr>
 })
}
</tbody>
</Table>
    </div>
  );
}



export default connect(null,actions)(StudentList)

