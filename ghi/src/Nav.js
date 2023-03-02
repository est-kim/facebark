import { useEffect, useState } from "react";
import { useAuthContext, useToken } from "./Authentication";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarLink,
  MDBCollapse
} from "mdb-react-ui-kit";


function Nav() {
  const [showNavRight, setShowNavRight] = useState(false);
  const [token, , logout] = useToken();
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (token !== null && token !== false) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false)
    }
  }, [token, setIsLoggedIn]);

  console.log("token:", token);
  console.log("isLoggedIn:", isLoggedIn);

  return (
    <MDBNavbar
      expand="lg"
      style={{ backgroundColor: "#FFFFFF", boxShadow: "none" }}
    >
      <MDBContainer fluid>
        <MDBNavbarBrand href="/">
          <img
            src={process.env.PUBLIC_URL + "/facebark_logo.png"}
            alt="facebark logo"
            width="150px"
          />
        </MDBNavbarBrand>
        <MDBCollapse navbar show={showNavRight}>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            <Link
              className={isLoggedIn ? "nav-link" : "d-none"}
              to={{ pathname: "/home", state: { isLoggedIn: isLoggedIn } }}
              style={{ color: "#FFBA00" }}
            >
              Home
            </Link>
            <MDBNavbarLink
              className={isLoggedIn ? "nav-link" : "d-none"}
              href="/profile"
              style={{ color: "#FFBA00" }}
            >
              Profile
            </MDBNavbarLink>
            <div
              className="collapse navbar-collapse"
              id="navbarNavDarkDropdown"
            >
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDarkDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: "#FFBA00" }}
                  >
                    Dogs
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-dark"
                    aria-labelledby="navbarDarkDropdownMenuLink"
                  >
                    <li>
                      <Link className="dropdown-item" to="/accounts">
                        Following
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/accounts">
                        View All Dogs
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  {isLoggedIn ? (
                    <>
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDarkDropdownMenuLink"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ color: "#FFBA00" }}
                      >
                        Events
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-dark"
                        aria-labelledby="navbarDarkDropdownMenuLink"
                      >
                        <li>
                          <Link className="dropdown-item" to="/events">
                            Events
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/events/new">
                            Create An Event
                          </Link>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <Link
                      className="nav-link"
                      to="/events"
                      style={{ color: "#FFBA00" }}
                    >
                      Events
                    </Link>
                  )}
                </li>
              </ul>
            </div>
            <MDBNavbarLink
              className={isLoggedIn ? "nav-link" : "d-none"}
              onClick={() => {
                logout();
                setIsLoggedIn(false);
                navigate("/");
              }}
              style={{ color: "#FFBA00" }}
            >
              Log Out
            </MDBNavbarLink>
            <MDBNavbarLink
              className={isLoggedIn ? "d-none" : "nav-link"}
              href="/signup"
              style={{ color: "#FFBA00" }}
            >
              Sign Up
            </MDBNavbarLink>
            <MDBNavbarLink
              className={isLoggedIn ? "d-none" : "nav-link"}
              href="/login"
              style={{ color: "#FFBA00", cursor: "pointer" }}
            >
              Sign In
            </MDBNavbarLink>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Nav;
