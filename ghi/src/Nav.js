import { useEffect, useState } from "react";
import { useAuthContext, useToken } from "./Authentication";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBCollapse,
  MDBNavbarToggler
} from "mdb-react-ui-kit";


function Nav() {
  const [showNavRight, setShowNavRight] = useState(false);
  const [token, , logout] = useToken();
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    if (token !== null && token !== false) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false)
    }
  }, [token, setIsLoggedIn]);

  console.log("USERRRRR: ", userId)
  console.log("USERRRRR: ", (typeof userId))

  useEffect(() => {
    async function getUserId() {
      const url = `${process.env.REACT_APP_FACEBARK_API_HOST}/api/things`;
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setUserId(data);
      }
    }
    getUserId();
  }, [token]);

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
        <MDBNavbarToggler onClick={() => setShowNavRight(!showNavRight)} />
        <MDBCollapse navbar show={showNavRight}>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            <Link
              className={isLoggedIn ? "nav-link" : "d-none"}
              to={{ pathname: "/home", state: { isLoggedIn: isLoggedIn } }}
              style={{ color: "#FFBA00" }}
            >
              Home
            </Link>
            <Link
              className={isLoggedIn ? "nav-link" : "d-none"}
              to={{
                pathname: "/accounts/" + userId,
                state: { isLoggedIn: isLoggedIn },
              }}
              style={{ color: "#FFBA00" }}
            >
              Profile
            </Link>
            <div
              className="collapse navbar-collapse"
              id="navbarNavDarkDropdown"
            >
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  {isLoggedIn ? (
                    <>
                      <a
                        className="nav-link dropdown-toggle"
                        href="/accounts"
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
                            View All Dogs
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/followinglist">
                            Following
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/followers">
                            My Followers
                          </Link>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <Link
                      className="nav-link"
                      to="/accounts"
                      style={{ color: "#FFBA00" }}
                    >
                      Dogs
                    </Link>
                  )}
                </li>
                <li className="nav-item dropdown">
                  {isLoggedIn ? (
                    <>
                      <a
                        className="nav-link dropdown-toggle"
                        href="/events"
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
                            View all Events
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/events/new">
                            Create an Event
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
            <Link
              className={isLoggedIn ? "nav-link" : "d-none"}
              to="/"
              onClick={() => {
                handleLogout();
                setIsLoggedIn(false);
              }}
              style={{ color: "#FFBA00" }}
            >
              Log Out
            </Link>
            <Link
              className={isLoggedIn ? "d-none" : "nav-link"}
              to="/signup"
              style={{ color: "#FFBA00", cursor: "pointer" }}
            >
              Sign Up
            </Link>
            <Link
              className={isLoggedIn ? "d-none" : "nav-link"}
              to="/login"
              style={{ color: "#FFBA00", cursor: "pointer" }}
            >
              Sign In
            </Link>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Nav;
