import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,ListGroupItem,ListGroup } from 'reactstrap';
import {connect} from "react-redux"
import _ from "lodash"

const AttendanceModal = ({student}) => {
  


  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
if(!student.attendance)
return "No attendance found!"
  return (
    <div>
      <Button onClick={toggle}>Show attendance</Button>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Attendance Log</ModalHeader>
        <ModalBody>
       
        
       <ListGroup>
           {
               
               _.map(student.attendance, att=>{
                
                  let present="present"
                   if(att.present)
                    present="present"
                   else
                   present="absent"
               const date = new Date(att.date);
                const day= date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
                return  <ListGroupItem key={att._id}>
               {day}
               <Button style={{float:'right'}}>
                    {present}
               </Button>
                </ListGroupItem> 
               })
               
               /*student.attendance.map(at=>{
           return  <ListGroupItem>
                 {at.present}
                 </ListGroupItem>
           })*/}
           </ListGroup>
            
         </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  ) 
}

export default  (AttendanceModal);