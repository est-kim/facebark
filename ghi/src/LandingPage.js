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
      <MDBCol lg="6" className="mx-auto text-center mb-4 landing-page">
        <h1>Welcome to FaceBark!</h1>
        <p>Make pawsome connections, one bark at a time.</p>
        <p>Join our community of dog lovers today!</p>
        <Link to={isLoggedIn ? "/followinglist" : "/signup"}>
          <MDBBtn
            className="landing-page-signup-button"
            style={{
              backgroundColor: "#fcdc8c",
              boxShadow: "0px 4px 4px rgba(0, 0, 0.1, 0.25)",
              transition: "background-color 0.3s ease-in-out",
              fontSize: "14px",
              textTransform: "none",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#fcd670")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#fcc42b")}
          >
            {isLoggedIn ? "See following!" : "Sign up here!"}
          </MDBBtn>
        </Link>
      </MDBCol>
      <MDBCol lg="6" className="text-center">
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
