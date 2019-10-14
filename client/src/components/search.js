import React,{useState} from 'react';
import {Row,Col,Input,Button,Form,ListGroup,ListGroupItem } from "reactstrap"
import {connect} from "react-redux"
import {searchStudent} from "../actions/index"
import AttendanceModal from './attendance';
import MyNavbar from './navbar';
import PropTypes from 'prop-types'

const Search=({searchStudent,student,history})=>{

const handleSubmit=(event)=>{
    event.preventDefault()
    searchStudent(event.target.querySelector('input').value)
}
return(
    <div>
        <MyNavbar/>
       <Row>
           <Col sm="10">
           <Form inline onSubmit={handleSubmit} style={{margin:"20px"}}>
               <input type="text" className="input-control-group" />
               <Button type="submit">Search</Button>
           </Form>
           </Col>
       </Row>
       <Row>
           <Col sm="10">
       <ListGroup style={{margin:"20px"}} >
        {
             !student.length?<h1>No Records!</h1>:student.map(st=>{
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
        student:state.student.search
    }
} 
export default connect(mapStateToProps,{searchStudent})(Search);