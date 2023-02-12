import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../Img/logo-header.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export default function NavHeader() {
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
        <Navbar.Brand>
          <img src={logo} alt="logo" width={150} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/profile">
              Moj profil
            </Nav.Link>
            <Nav.Link as={Link} to="/schedule">
              Harmonogram
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/timeslot">
              Godziny opiekunów
            </Nav.Link> */}
            <Nav.Link as={Link} to="/comission">
              Komisje
            </Nav.Link>
            <Nav.Link as={Link} to="/teams">
              Zespoły
            </Nav.Link>
            <Nav.Link as={Link} to="/projects">
              Projekty
            </Nav.Link>
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
