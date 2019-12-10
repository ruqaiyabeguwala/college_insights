import React,{useState} from 'react';
import {Row,Col,Button,Input,ListGroup,ListGroupItem } from "reactstrap"
import {connect} from "react-redux"
import {searchStudent} from "../actions/index"
import AttendanceModal from './attendance';
import MyNavbar from './navbar';
import PropTypes from 'prop-types'
import _ from "lodash"

const Search=({searchStudent,student,history,user})=>{
const [term, setterm] = useState("")
var myString=!term?"":"No Record found"
const OnChangeHandle=(value)=>{
    setterm(value);
  searchStudent(value);
}
return(
    <div>
        <MyNavbar isAuthenticated={user.isAuthenticated}/>
       <Row>
           <Col sm="10">
        {//   <Form inline onSubmit={handleSubmit} style={{margin:"20px"}}>
        }
               <Input type="text" style={{margin:"30px",}} className="input-control-group" onChange={(event)=>OnChangeHandle(event.target.value)}/>
           
         </Col>
       </Row>
       <Row>
           <Col sm="10">
       <ListGroup style={{margin:"20px"}} >
        {    
             !student.length?<h3>{myString}</h3>:student.map(st=>{
            return <ListGroupItem key={st._id} onClick={()=>history.push(`/student/${st._id}`)} style={{cursor:"pointer"}}>
            
            {st.name}
            <Button className="float-right">{st.total}%</Button> 
            </ListGroupItem>
        })
           
        }
        </ListGroup>
        </Col>
       </Row>
    </div>

)
}

Search.propTypes={
searchStudent:PropTypes.func.isRequired,
student:PropTypes.object.isRequired,
history:PropTypes.func.isRequired
}

function mapStateToProps(state){
    return{
        student:state.student.search,
        user:state.user
    }
} 
export default connect(mapStateToProps,{searchStudent})(Search);