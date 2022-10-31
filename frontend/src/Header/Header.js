

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Routes,
  Route,
  Link,
} from "react-router-dom";

import { useNavigate } from "react-router-dom";

export default function Header({logged}){
  const navigate = useNavigate()
function logout(){
  navigate(`/login`)
  localStorage.clear()
  window.location.reload(false)
}
    return (
        <>

        {logged? 
        <Navbar expand="lg" style={{ borderBottom:`1px solid blue`}}>
          <Container>
            <Navbar.Brand>SYSTEM PRI</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
              <Nav className="me-auto">
                <Nav.Link as={Link} to='/home'>Moj profil</Nav.Link>
                <Nav.Link as={Link} to='/tools'>Narzędzia</Nav.Link>
                <Nav.Link as={Link} to='/caregivers'>Opiekunowie</Nav.Link>
                <Nav.Link as={Link} to='/teams'>Zespoły</Nav.Link>
              </Nav>
              <Navbar.Text>
                {logged?<Nav.Link onClick={logout} >Wyloguj</Nav.Link>:<Nav.Link as={Link} to='/login'>Zaloguj się</Nav.Link>}
          </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      :''}
      </>
      
      );
    }    
