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
import AccountUpdateModal from "./AccountUpdateModal";

function AccountDetailPage() {
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();
  const { accountId } = useParams();
  const [account, setAccount] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [token] = useToken();
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [, setSubmitted] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

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
      const url = `${process.env.REACT_APP_FACEBARK_API_HOST}/api/things`;
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
    fetch(`${process.env.REACT_APP_FACEBARK_API_HOST}/statuses/${accountId}`)
      .then((response) => response.json())
      .then((data) => setStatuses(data))
      .catch((error) => console.log(error));
  }, [accountId]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_FACEBARK_API_HOST}/states`)
      .then((response) => response.json())
      .then((data) => setStates(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_FACEBARK_API_HOST}/cities`)
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_FACEBARK_API_HOST}/following`)
      .then((response) => response.json())
      .then((data) => setFollowing(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const url = `${process.env.REACT_APP_FACEBARK_API_HOST}/accounts/${accountId}`;
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

  let FollowerIds = [];
  for (let f of following) {
    if (f["followee_id"] === parseInt(accountId)) {
      FollowerIds.push(f["follower_id"]);
    }
  }
  console.log("FOLLOWERIDDSSSS:", FollowerIds);

  const handleFollow = async (event) => {
    event.preventDefault();
    const data = {};

    data.follower_id = userId;
    data.followee_id = parseInt(accountId);

    const eventUrl = `${process.env.REACT_APP_FACEBARK_API_HOST}/following`;

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

  const handleUnfollow = async (event) => {
    event.preventDefault();
    const eventUrl = `${process.env.REACT_APP_FACEBARK_API_HOST}/following/${accountId}?follower_id=${userId}`;

    const fetchConfig = {
      method: "delete",
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await fetch(eventUrl, fetchConfig);

    console.log(response);

    if (response.ok) {
      window.location.reload();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};

    data.account_id = parseInt(accountId);
    data.status_text = status;
    data.image_url = image;

    const url = `${process.env.REACT_APP_FACEBARK_API_HOST}/statuses`;
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
        fetch(
          `${process.env.REACT_APP_FACEBARK_API_HOST}/statuses/${accountId}`
        )
          .then((response) => response.json())
          .then((data) => setStatuses(data))
          .catch((error) => console.log(error));
        setStatus("");
        setImage("");
        setSubmitted(true);
      } else {
        await response.json();
        setSubmitted(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatTimeStamp = (timeStamp) => {
    const date = new Date(timeStamp + "Z");
    const pacificTime = new Date(
      date.valueOf() -
        date.getTimezoneOffset() * 60000 -
        8 * 3600000 +
        8 * 3600000
    );
    const formattedDate = `${
      pacificTime.getMonth() + 1
    }/${pacificTime.getDate()}/${pacificTime.getFullYear()}, `;
    const formattedTime = pacificTime.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formattedDate + formattedTime;
  };

  const imgStyle = {
    objectFit: "cover",
    width: "100%",
    aspectRatio: "1 / 1",
  };
  console.log("THIS THE ACCCOUNTTTTT:", account);

  return (
    <div className="list-bg">
      <MDBRow style={{ padding: "50px" }}>
        <MDBCol md="4" className="mx-auto">
          <MDBCard
            className="text-center"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
          >
            <MDBCardBody style={{ paddingTop: "50px" }}>
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
              <MDBCardFooter className="text-end">
                {parseInt(accountId) !== userId ? (
                  // if accountId is not equal to userId
                  <>
                    {FollowerIds.includes(userId) ? (
                      <form onSubmit={handleUnfollow}>
                        <MDBBtn
                          className="btn me-2"
                          type="submit"
                          style={{
                            margin: "10px",
                            backgroundColor: "#9ecdc6",
                            fontSize: "15px",
                            padding: "5px 15px",
                            boxShadow: "2px 2px 4px #888888",
                            textTransform: "none",
                          }}
                        >
                          Unfollow <MDBIcon icon="edit" className="ms-1" />
                        </MDBBtn>
                      </form>
                    ) : (
                      <form onSubmit={handleFollow}>
                        <MDBBtn
                          className="btn me-2"
                          type="submit"
                          style={{
                            margin: "10px",
                            backgroundColor: "#9ecdc6",
                            fontSize: "15px",
                            padding: "5px 15px",
                            boxShadow: "2px 2px 4px #888888",
                            textTransform: "none",
                            color: "white",
                          }}
                          disabled={isFollowing}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsFollowing(true);
                            handleFollow(e);
                          }}
                        >
                          {isFollowing ? "Following" : "Follow"}
                          {isFollowing ? null : <MDBIcon fas icon="plus" />}
                        </MDBBtn>
                      </form>
                    )}
                  </>
                ) : (
                  // if accountId is equal to userId
                  <AccountUpdateModal />
                )}
              </MDBCardFooter>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="8" className="mx-auto">
          {parseInt(accountId) === userId && (
            <>
              <MDBRow style={{ paddingBottom: "5px" }}>
                <MDBCol md="12">
                  <h4>Post a Pupdate</h4>
                </MDBCol>
              </MDBRow>

              <MDBRow id="boo1">
                <MDBCol md="12">
                  <MDBCard
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      padding: "2% 2%",
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
                        type="url"
                      />
                      <MDBBtn
                        style={{
                          margin: "10px",
                          backgroundColor: "#9ecdc6",
                          fontSize: "15px",
                          padding: "5px 15px",
                          boxShadow: "2px 2px 4px #888888",
                          textTransform: "none",
                        }}
                      >
                        Post
                      </MDBBtn>
                    </form>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </>
          )}
          <MDBRow style={{ paddingBottom: "5px", paddingTop: "10px" }}>
            <MDBCol md="12">
              <h4>My Pupdates</h4>
            </MDBCol>
          </MDBRow>
          {statuses.length > 0 &&
            statuses.map(
              (status) =>
                (parseInt(accountId) === userId ||
                  (parseInt(accountId) !== userId && status.status_text[0] !== "<")) && (
                  <MDBRow className="mb-4" key={status.id}>
                    <MDBCol>
                      <MDBCard
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          padding: "2% 2%",
                        }}
                      >
                        <div style={{ fontWeight: 550 }}>
                          {formatTimeStamp(status.time_stamp)}
                        </div>
                        <MDBRow>
                          {status.image_url ? (
                            <>
                              <MDBCol md="8">
                                <div>{status.status_text}</div>
                              </MDBCol>
                              {status.image_url.substring(0, 4) === "http" && (
                                <MDBCol md="4">
                                  <img
                                    src={status.image_url}
                                    alt="status"
                                    style={imgStyle}
                                  />
                                </MDBCol>
                              )}
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
                )
            )}
          </MDBCol>
          </MDBRow>
          </div>
          );
          }

export default AccountDetailPage;
