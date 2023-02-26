import { NavLink, Link } from "react-router-dom";
import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBIcon,
  MDBCollapse,
} from "mdb-react-ui-kit";

function Nav() {
  const [showNavSecond, setShowNavSecond] = useState(false);
  const [showNavRight, setShowNavRight] = useState(false);

  return (
    <MDBNavbar
      expand="lg"
      style={{ backgroundColor: "#FFFFFF" }}
      //   style={{ backgroundColor: "#FFFFFF", borderBottom: "solid black" }}
    >
      <MDBContainer fluid>
        <MDBNavbarBrand href="/">
          <img src="./facebark_logo.png" alt="facebark logo" width="150px" />
        </MDBNavbarBrand>
        {/* <MDBNavbarToggler
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNavSecond(!showNavSecond)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler> */}
        <MDBNavbarToggler
          type="button"
          data-target="#navbarRightAlignExample"
          aria-controls="navbarRightAlignExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNavRight(!showNavRight)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNavRight}>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {/* <MDBNavbarLink active aria-current="page" href="#">
              Home
            </MDBNavbarLink> */}
            <MDBNavbarLink
              href="/events"
              style={{ color: "#FFBA00" }}
              className="fw-bold"
            >
              Events
            </MDBNavbarLink>
            <MDBNavbarLink
              href="/signup"
              style={{ color: "#FFBA00" }}
              className="fw-bold"
            >
              Sign Up
            </MDBNavbarLink>
            <MDBNavbarLink
              href="/login"
              style={{ color: "#FFBA00" }}
              className="fw-bold"
            >
              Sign In
            </MDBNavbarLink>
            {/* <MDBNavbarLink disabled href="#" tabIndex={-1} aria-disabled="true">
              Disabled
            </MDBNavbarLink> */}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Nav;
