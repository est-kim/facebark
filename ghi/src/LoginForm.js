import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";

import { useAuthContext, useToken } from "./Authentication";

function LoginForm() {
  const [, login] = useToken();
  const { isLoggedIn } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUsername("");
    setPassword("");
  }, []);

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const error = await login(username, password);
    if (error) {
      isLoggedIn(false);
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="list-bg" style={{ minHeight: "80vh" }}>
      <MDBContainer className="pb-5">
        <br></br>
        <MDBRow>
          <MDBCol className="col-md-12">
            <MDBCard
              className="my-4 d-flex flex-column"
              style={{
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                overflow: "hidden",
              }}
            >
              <MDBRow>
                <MDBCol className="me-6 p-0 m-0">
                  <MDBCardImage
                    src="https://www.hamptonveterinaryhospital.com/blog/wp-content/uploads/2019/01/iStock-876314938-1.jpg"
                    alt="..."
                    fluid
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </MDBCol>
                <MDBCol className="two p-0 m-0">
                  <MDBCardBody>
                    <MDBCardTitle className="text-center fw-bold pt-5">
                      Welcome back!
                    </MDBCardTitle>
                    <form onSubmit={handleSubmit}>
                      <MDBContainer>
                        <MDBInput
                          wrapperClass="mb-4 mt-4"
                          label="Username"
                          id="form1"
                          type="text"
                          value={username}
                          onChange={handleUsernameChange}
                        />
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Password"
                          id="form2"
                          type="password"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                        <div className="text-center mt-1 mb-0">
                          <MDBBtn
                            type="submit"
                            className="mb-4"
                            size="sm"
                            style={{
                              backgroundColor: "#FFBA00",
                              borderColor: "#FFBA00",
                              color: "#FFFFFF",
                            }}
                          >
                            Sign in
                          </MDBBtn>
                        </div>

                        <div
                          className="text-center"
                          style={{ fontSize: "14px" }}
                        >
                          <p>
                            Don't have an account?{" "}
                            <a href="/signup">Sign Up!</a>
                          </p>
                        </div>
                      </MDBContainer>
                    </form>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default LoginForm;
