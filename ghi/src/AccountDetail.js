import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { useAuthContext, useToken, getTokenInternal } from "./Authentication";
import {
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBInput,
} from "mdb-react-ui-kit";

function AccountDetailPage() {
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();
  const { accountId } = useParams();
  const [account, setAccount] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [state, setState] = useState("");
  const [states, setStates] = useState([]);
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [token] = useToken();
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  console.log("TOKEN IN ACCOUNT DETAIL: ", token);
  console.log("SET IS LOGGED IN: ", isLoggedIn);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getTokenInternal();
      if (token) {
        setIsLoggedIn(true);
      }
    };
    fetchToken();
  }, [setIsLoggedIn]);

  // console.log("TOKEN IN ACCOUNT DETAIL: ", token);
  // console.log("SET IS LOGGED IN: ", isLoggedIn);
  // console.log("UserId: ", userId);
  // console.log("UserId TYPE: ", typeof userId);
  // console.log("AccountId: ", accountId);
  // console.log("AccountId TYPE: ", typeof accountId);

  useEffect(() => {
    async function getUserId() {
      const url = `http://localhost:8000/api/things`;
      // const response = await fetch(url);
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

  useEffect(() => {
    fetch(`http://localhost:8000/statuses/${accountId}`)
      .then((response) => response.json())
      .then((data) => setStatuses(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/states")
      .then((response) => response.json())
      .then((data) => setStates(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/cities")
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const url = `http://localhost:8000/accounts/${accountId}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setAccount(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (token && isLoggedIn) {
      fetchData();
    }
  }, [accountId, isLoggedIn, token]);

  if (loading) {
    return <Spinner />;
  }

  function calculateAge(dateString) {
    const today = new Date();
    const [year, month, day] = dateString.split("-").map(Number);
    const birthDate = new Date(year, month - 1, day);

    const delta = today - birthDate;
    const months = Math.floor(delta / (30 * 24 * 60 * 60 * 1000));
    const years = Math.floor(delta / (365 * 24 * 60 * 60 * 1000));

    if (years > 0) {
      return `${years} years old`;
    } else {
      return `${months} months old`;
    }
  }

  let NewState = "";
  for (let s of states) {
    if (s["id"] === account.state_id) {
      NewState = s["name"];
    }
  }

  let NewCity = "";
  for (let c of cities) {
    if (c["id"] === account.city_id) {
      NewCity = c["name"];
    }
  }

  console.log(statuses);
  const handleFollow = async (event) => {
    event.preventDefault();
    const data = {};

    data.follower_id = userId;
    data.followee_id = parseInt(accountId);

    // console.log("THIS IS DATA IN HANDLE Follow", data);

    const eventUrl = "http://localhost:8000/following";

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await fetch(eventUrl, fetchConfig);
    console.log(response);
    if (response.ok) {

      //const newEvent = await response.json;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};

    data.account_id = parseInt(accountId);
    data.status_text = status;
    data.image_url = image;

    const url = "http://localhost:8000/statuses";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url, fetchConfig);
      console.log("this the response!", response);
      if (response.ok) {
        fetch(`http://localhost:8000/statuses/${accountId}`)
          .then((response) => response.json())
          .then((data) => setStatuses(data))
          .catch((error) => console.log(error));
        setStatus("");
        setImage("");
        setSubmitted(true);
      } else {
        const error = await response.json();
        setSubmitted(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const imgStyle = {
    objectFit: "cover",
    width: "100%",
    aspectRatio: "1 / 1",
  };
  console.log("THIS THE ACCCOUNTTTTT:", account)

  return (
    <div
      className="list-bg"
      style={{ paddingBottom: "50px", paddingTop: "30px" }}
    >
      <MDBRow>
        <MDBCol md="4" className="mx-auto" style={{ paddingLeft: "30px" }}>
          <MDBCard
            className="text-center"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
          >
            <MDBCardBody>
              <MDBCardText>
                <img
                  src={account.image_url}
                  alt={account.name}
                  className="card-img-top img-fluid"
                  style={{
                    width: "200px",
                    margin: "0 auto",
                    display: "inline-block",
                    borderRadius: "100px",
                    overflow: "hidden",
                    height: "200px",
                    objectFit: "cover",
                    // objectPosition: "center"
                  }}
                />
              </MDBCardText>
              <MDBCardTitle style={{ fontWeight: "bold" }}>
                {account.name}
              </MDBCardTitle>
              <MDBCardText style={{ fontStyle: "italic", fontSize: "14px" }}>
                "{account.description}"
              </MDBCardText>
              <MDBCardText style={{ fontSize: "15px" }}>
                <strong>Username:</strong> @{account.username}
              </MDBCardText>
              <MDBCardText style={{ fontSize: "15px" }}>
                <strong>Age:</strong> {calculateAge(account.dob)}
              </MDBCardText>
              <MDBCardText style={{ fontSize: "15px" }}>
                <strong>Breed:</strong> {account.breed}
              </MDBCardText>
              <MDBCardText style={{ fontSize: "15px" }}>
                <strong>City:</strong> {NewCity}
              </MDBCardText>
              <MDBCardText style={{ fontSize: "15px" }}>
                <strong>State:</strong> {NewState}
              </MDBCardText>
              <MDBCardText style={{ fontSize: "15px" }}>
                <strong>Sex:</strong> {account.sex}
              </MDBCardText>
              <MDBCardText style={{ fontSize: "15px" }}>
                <strong>Owner Name:</strong> {account.owner_name}
              </MDBCardText>
              {/* <MDBCardText>
            Picture: <img src={account.picture} alt={account.title} />
          </MDBCardText> */}
              <MDBCardFooter className="text-end">
                {parseInt(accountId) !== userId && (
                  <form onSubmit={handleFollow}>
                    <MDBBtn color="warning" className="me-2" type="submit">
                      Follow <MDBIcon icon="edit" className="ms-1" />
                    </MDBBtn>
                  </form>
                )}
              </MDBCardFooter>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="7" className="mx-auto" style={{ paddingLeft: 0 }}>
          {parseInt(accountId) === userId && (
            <>
          <MDBRow>
            <MDBCol md="12">
              <h5>Post a Pupdate</h5>
            </MDBCol>
          </MDBRow>

          <MDBRow id="boo1">
            <MDBCol md="12">
              <MDBCard
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  padding: "4px 2%",
                }}
              >
                  <form onSubmit={handleSubmit} id="status-update">
                    <MDBInput
                      onChange={handleStatusChange}
                      value={status}
                      label="Tell us about your day!"
                      id="status_text"
                      name="status_text"
                      type="textarea"
                      style={{ margin: "10px" }}
                      required
                    />
                    <MDBInput
                      onChange={handleImageChange}
                      value={image}
                      label="Post a photo! (Optional)"
                      id="image_url"
                      name="image_url"
                      type="textarea"
                    />
                    <MDBBtn style={{ margin: "10px" }}>Post</MDBBtn>
                  </form>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          </>
          )}
          <MDBRow>
            <MDBCol md="12">
              <h5>My Pupdates</h5>
            </MDBCol>
          </MDBRow>

          {statuses.length > 0 &&
            statuses.map((status) => (
              <MDBRow className="mb-4" key={status.id}>
                <MDBCol>
                  <MDBCard
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      padding: "4px 2%",
                    }}
                  >
                    <div>{new Date(status.time_stamp).toLocaleString()}</div>
                    <MDBRow>
                      {status.image_url ? (
                        <>
                          <MDBCol md="8">
                            <div>{status.status_text}</div>
                          </MDBCol>
                          <MDBCol md="4">
                            <img
                              src={status.image_url}
                              alt="status"
                              style={imgStyle}
                            />
                          </MDBCol>
                        </>
                      ) : (
                        <MDBCol md="12">
                          <div>{status.status_text}</div>
                        </MDBCol>
                      )}
                    </MDBRow>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            ))}
        </MDBCol>
      </MDBRow>
    </div>
  );
}

export default AccountDetailPage;
