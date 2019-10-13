import {connect} from "react-redux"
import React,{useEffect} from 'react';
import {withRouter} from "react-router"
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,Col,Row
} from 'reactstrap';
import {getStudent} from "./../actions/index"
import AttendanceModal from "./attendance" 

const StudentDetail = ({getStudent,student,match}) => {
useEffect(() => {
 getStudent(match.params.id)
}, [getStudent])

  return (
    <div>
      <h1 center>Student Details!</h1>
      <Row>
        <Col sm="6" style={{margin:"30px auto",textAlign:"justify",fontWeight:"bold"}}>
      <Card>
     { console.log(student)}
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
function mapStateToProps(state){
return{
  student:state.student.singleStudent
}
}
export default connect(mapStateToProps,{getStudent})(withRouter(StudentDetail));