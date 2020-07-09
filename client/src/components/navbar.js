import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  import * as actions from "./../actions/index"

const MyNavbar =({isAuthenticated,logout,user})=>{
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
  const renderMethod=()=>{
   switch(isAuthenticated){
     
    case false:
     return ( <NavItem>
     <NavLink >
     <Link to="/" style={{textDecoration:"none",color:"#000000"}} >Login</Link>
     </NavLink>
   </NavItem>)

     case null:
     return ""
   
     default:
     return( <NavItem>
      <NavLink  onClick={logout}>
      <Link to="/" style={{textDecoration:"none",color:"#000000"}} >Logout</Link>
      </NavLink>
    </NavItem>)
   }            
  }

    return (
      <div style={{color:"#cccccc"}}>
        <Navbar color="dark" light expand="md">
          <Link to="/dashboard" style={{textDecoration:'none',color:'#000000'}}>College Insights!</Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
          
                <NavItem>
                <NavLink >
                <Link to="/search" style={{textDecoration:"none",color:"#000000"}}>Search</Link>
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
               
                 IT
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem >
               <Link to={`/student/IT/1`} style={{textDecoration:"none",color:"#000000"}}>1st year</Link>
                  </DropdownItem>
                  <DropdownItem>
                  <Link to={`/student/IT/2`} style={{textDecoration:"none",color:"#000000"}}>2nd year</Link>
                  </DropdownItem>
                  <DropdownItem  />
                  <DropdownItem>
                  <Link to={`/student/IT/3`} style={{textDecoration:"none",color:"#000000"}}>3rd year</Link>
                  </DropdownItem>
                  <DropdownItem>
                  <Link to={`/student/IT/4`} style={{textDecoration:"none",color:"#000000"}}>4th year</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
               
                 CS
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
               <Link to={`/student/CS/1`} style={{textDecoration:"none",color:"#000000"}}>1st year</Link>
                  </DropdownItem>
                  <DropdownItem>
                  <Link to={`/student/CS/2`} style={{textDecoration:"none",color:"#000000"}}>2nd year</Link>
                  </DropdownItem>
                  <DropdownItem  />
                  <DropdownItem>
                  <Link to={`/student/CS/3`} style={{textDecoration:"none",color:"#000000"}}>3rd year</Link>
                  </DropdownItem>
                  <DropdownItem>
                  <Link to={`/student/CS/4`} style={{textDecoration:"none",color:"#000000"}}>4th year</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
               
                Mech
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem >
               <Link to={`/student/Mech/1`} style={{textDecoration:"none",color:"#000000"}}>1st year</Link>
                  </DropdownItem>
                  <DropdownItem>
                  <Link to={`/student/Mech/2`} style={{textDecoration:"none",color:"#000000"}}>2nd year</Link>
                  </DropdownItem>
                  <DropdownItem  />
                  <DropdownItem>
                  <Link to={`/student/Mech/3`} style={{textDecoration:"none",color:"#000000"}}>3rd year</Link>
                  </DropdownItem>
                  <DropdownItem>
                  <Link to={`/student/Mech/4`} style={{textDecoration:"none",color:"#000000"}}>4th year</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              
             
             { renderMethod()}
             
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
}
function mapStateToProps(state){
 return{
  isAuthenticated: state.user.isAuthenticated
 } 
}

/*MyNavbar.defaultProps={
  isAuthenticated:false
}*/
export default connect(mapStateToProps,actions)(MyNavbar);