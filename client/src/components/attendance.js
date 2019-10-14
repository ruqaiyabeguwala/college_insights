import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,ListGroupItem,ListGroup } from 'reactstrap';
import _ from "lodash"
import PropTypes from 'prop-types'

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
          {!student.attendance.length? "No attendance found!":""}
       <ListGroup>
           { 
               _.map(student.attendance, att=>{
                const classs=att.present?"success":"danger"
                  let present="present"
                   if(att.present)
                    present="present"
                   else
                   present="absent"
               const date = new Date(att.date);
                const day= date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
                return  <ListGroupItem key={att._id}>
               {day}
             
               <Button style={{float:'right'}} className={`btn btn-${classs}`}>
                  {present}
               </Button>
                </ListGroupItem> 
               })
            }
           </ListGroup>
            
         </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  ) 
}

AttendanceModal.propTypes={
   student:PropTypes.object.isRequired,
   }


export default  (AttendanceModal);