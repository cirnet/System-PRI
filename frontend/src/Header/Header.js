import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../Img/logo-header.svg" 
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export default function Header() {
  // const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();
  function logout() {
    navigate(`/login`);
    localStorage.clear();
    window.location.reload(false);
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    // localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <Navbar expand="lg" style={{ borderBottom: `1px solid blue` }}>
      <Container>
        <Navbar.Brand><img src={logo} alt="logo" width={150}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/profile">
              Moj profil
            </Nav.Link>
            <Nav.Link as={Link} to="/tools">
              Narzędzia
            </Nav.Link>
            <Nav.Link as={Link} to="/coordinatorTimeSlot">
              CoordinatorTimeSlot
            </Nav.Link>
            <Nav.Link as={Link} to="/availableTimeSlot">
              AvailableTimeSlot
            </Nav.Link>
            <Nav.Link as={Link} to="/timeslots">
              TimeSlots
            </Nav.Link>
            <Nav.Link as={Link} to="/comission">
              Comission
            </Nav.Link>

            <NavDropdown title="Zespoły" id="basic-nav-dropdown">
              <NavDropdown.Item href="/teams">Zobacz Zespoły</NavDropdown.Item>
              <NavDropdown.Item href="/teamAdd">Dodaj zespół</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Project" id="basic-nav-dropdown">
              <NavDropdown.Item href="/projects">
                Zobacz Projekty
              </NavDropdown.Item>
              <NavDropdown.Item href="/projectAdd">
                Dodaj projekt
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Navbar.Text>
            <Nav.Link onClick={handleLogout}>Wyloguj </Nav.Link>
          </Navbar.Text>
          {/* {user?<img src={user.avatar} alt="avatar" width={50}></img>:'sdsd'} */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
