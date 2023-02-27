import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage
} from "mdb-react-ui-kit";

import { useAuthContext, useToken } from "./Authentication";


function LoginForm() {
    const { token, login } = useToken();
    // const { token } = useAuthContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
      setUsername("");
      setPassword("");
    }, []);

    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);
    }

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await login(username, password);
      } catch (error) {
        console.log(error.response)
      }
    };

    return (
      <MDBContainer className="login-container">
        <br></br>
        <MDBRow>
          <MDBCol className="col-md-12">
            <MDBCard
              className="my-4 d-flex flex-column"
              style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}
            >
              <MDBRow>
                <MDBCol className="me-6 p-0 m-0">
                  <MDBCardImage
                    src="https://media.istockphoto.com/id/183815157/photo/teamwork.jpg?s=612x612&w=0&k=20&c=CHHe43PQncGHw-b3u2PL6VifPsSBO_Z3TWUcsjGSE3Q="
                    alt="..."
                    fluid
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                </MDBCol>
                <MDBCol className="two p-0 m-0">
                  <MDBCardBody>
                    <MDBCardTitle className="text-center fw-bold">Welcome back!</MDBCardTitle>
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
    );

}

export default LoginForm
