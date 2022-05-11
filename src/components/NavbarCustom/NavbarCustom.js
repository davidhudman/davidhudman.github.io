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
import "./navbar.css";

const NavbarCustom = () => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">DH</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar.Header>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <NavItem>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/pay">Pay Me Crypto</Link>
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
