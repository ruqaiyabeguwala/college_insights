import React, { Component,useEffect } from 'react';
import MyNavbar from "./navbar"
import {connect} from "react-redux"
import {getStudents} from "./../actions/index";
import {ListGroup,ListGroupItem,Button} from "reactstrap"
import empty from "./../img/empty.gif"
import PropTypes from 'prop-types';

const DashBoard =({getStudents,student:{student},history})=>{
useEffect(() => {
getStudents()
}, [getStudents])

if(!student.length){
    return <div>
       <h4 style={{textAlign:'center',marginTop:"20px"}}>No Students found!</h4>
       <img src={empty} alt="No Students found!"/>
       </div>
   }
   return(
       <div>
          
           <MyNavbar/>
         
           <h1 >DashBoard!</h1>
     <ListGroup style={{margin:"20px"}} >
        {student.map(st=>{
            return <ListGroupItem key={st._id} onClick={()=>history.push(`/student/${st._id}`)} style={{cursor:"pointer"}}>
            
            {st.name}
            <Button className="float-right">{st.total}</Button> 
            </ListGroupItem>
        })}
     </ListGroup>
       </div> 
   )

}

DashBoard.propTypes={
    getStudents:PropTypes.func.isRequired,
    student:PropTypes.object.isRequired,
    history:PropTypes.func.isRequired,
    
    }
  
function mapStateToProps(state){
return{
    student:state.student
}
}
export default connect(mapStateToProps,{getStudents}) (DashBoard);