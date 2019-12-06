import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom"
import {connect} from "react-redux"
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
  import {logout} from "./../actions/index"

const MyNavbar =({isAuthenticated,logout})=>{
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
  
    return (
      <div style={{color:"#cccccc"}}>
        <Navbar color="dark" light expand="md">
          <NavbarBrand href="/dashboard">College Insights!</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
          
                <NavItem>
                <NavLink href="/">
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
              
              {  console.log(isAuthenticated)}
             { !isAuthenticated?"": 
              <NavItem>
                <NavLink href="/" onClick={logout}>
                <Link to="/" style={{textDecoration:"none",color:"#000000"}} >Logout</Link>
                </NavLink>
              </NavItem>
            }
             
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
}

MyNavbar.defaultProps={
  isAuthenticated:false
}
export default connect(null,{logout})(MyNavbar);