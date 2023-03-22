import {
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext, useToken } from "./Authentication";
import facebarkbgpic_clear from "./images/facebarkbgpic_clear.png"

function LandingPage() {
  const [, setButtonText] = useState("Sign up here!");
  const [token] = useToken();
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    if (token !== null && isLoggedIn) {
      setButtonText("See friends!");
    }
  }, [token, isLoggedIn]);

return (
  <MDBRow className="align-items-center">
    <MDBCol lg="5">
      <h1 style={{ position: "absolute", top: "280px", left: "130px" }}>
        Welcome to FaceBark!
      </h1>
      <p style={{ position: "absolute", top: "335px", left: "150px" }}>
        Make pawsome connections, one bark at a time.
      </p>
      <p style={{ position: "absolute", top: "365px", left: "170px" }}>
        Join our community of dog lovers today!
      </p>

      <Link to={isLoggedIn ? "/followinglist" : "/signup"}>
        <MDBBtn
          className="landing-page-signup-button"
          style={{
            backgroundColor: "#fcdc8c",
            position: "absolute",
            top: "400px",
            left: "255px",
            padding: "8px 15px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0.1, 0.25)",
            transition: "background-color 0.3s ease-in-out",
            fontSize: "14px",
            textTransform: "none",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#fcc42b")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#fcd670")}
        >
          {isLoggedIn ? "See following!" : "Sign up here!"}
        </MDBBtn>
      </Link>

      {!isLoggedIn && (
        <Link to="/login">
          <MDBBtn
            className="landing-page-signin-button"
            style={{
              backgroundColor: "#fcdc8c",
              position: "absolute",
              top: "450px", // Changed the top position to place the button below the first one
              left: "255px", // Same left position as the first button to align them
              padding: "8px 15px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0.1, 0.25)",
              transition: "background-color 0.3s ease-in-out",
              fontSize: "14px",
              textTransform: "none",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#fcc42b")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#fcd670")}
          >
            Sign in here!
          </MDBBtn>
        </Link>
      )}
    </MDBCol>
    <MDBCol lg="7" className="text-center">
      <img
        src={facebarkbgpic_clear}
        className="img-fluid"
        alt="Facebark Background"
      />
    </MDBCol>
  </MDBRow>
);
}

export default LandingPage;
