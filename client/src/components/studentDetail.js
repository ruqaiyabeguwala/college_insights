import {connect} from "react-redux"
import React,{useEffect} from 'react';
import {withRouter} from "react-router"
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,Col,Row
} from 'reactstrap';
import * as actions from "./../actions/index"
import AttendanceModal from "./attendance" 
import MyNavbar from "./navbar"
import PropTypes from 'prop-types';
import {Redirect} from "react-router"

const StudentDetail = ({getStudent,student,match,user,setAlert}) => {
useEffect(() => {
 getStudent(match.params.id)
}, [getStudent])
if(!user.isAuthenticated){
  setAlert("Please login first","danger");
  return  <Redirect to="/"/>
}

  return (
    <div>
   <h1 style={{textAlign:"center"}}>Student Details!</h1>
      
      <Row>
      
        <Col sm="6" style={{margin:"30px auto",textAlign:"justify",fontWeight:"bold"}}>
       <Card>
        <CardBody>
        <CardTitle>Name: {student.name}</CardTitle>
          <CardSubtitle>Branch: {student.branch}</CardSubtitle>
          <CardText>Admission year: {student.ad_year}</CardText>
          
         <AttendanceModal student={student}/>
        </CardBody>
      </Card>
      
      </Col>
      </Row>
    </div>
   
  );
};

StudentDetail.propTypes={
  getStudent:PropTypes.func.isRequired,
  student:PropTypes.object.isRequired,
  match:PropTypes.func.isRequired
  }


function mapStateToProps(state){
return{
  student:state.student.singleStudent,
  user:state.user
}
}
export default connect(mapStateToProps,actions)(withRouter(StudentDetail));