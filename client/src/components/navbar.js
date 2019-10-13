import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom"
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

const MyNavbar =()=>{
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
  
    return (
      <div style={{color:"#cccccc"}}>
        <Navbar color="dark" light expand="md">
          <NavbarBrand href="/">College Insights!</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                  <NavLink href="" style={{textDecoration:"none"}}>
               Component
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
               
                 Students
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
        
                      <Link to={`/student/IT/1`} style={{textDecoration:"none",color:"#000000"}}>IT</Link>
                  </DropdownItem>
                  <DropdownItem>
                  <Link to={`/student/CS/1`} style={{textDecoration:"none",color:"#000000"}}>CS</Link>
                  </DropdownItem>
                  <DropdownItem  />
                  <DropdownItem>
                  <Link to={`/student/Mech/1`} style={{textDecoration:"none",color:"#000000"}}>Mech</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
}

export default MyNavbar;