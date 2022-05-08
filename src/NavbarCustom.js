import "./styles.css";
import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/layout/Navbar";
// import Home from "./components/pages/Home";
import { Link } from "react-router-dom";
import {
  Button,
  Navbar,
  Nav,
  NavDropdown,
  NavItem,
  MenuItem,
} from "react-bootstrap";
// import Container from "react-bootstrap/Container";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const NavbarCustom = () => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">DH</a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar.Header>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <NavItem>
            <Link to="/pay">Pay Me Crypto</Link>
          </NavItem>
          <NavItem>
            <Link to="/2">Alt Pay App 1</Link>
          </NavItem>
          <NavItem>
            <Link to="/3">Alt Pay App 2</Link>
          </NavItem>
          {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Separated link</MenuItem>
          </NavDropdown> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarCustom;
