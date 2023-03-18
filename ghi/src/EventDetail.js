import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  MDBCardImage,
  MDBRipple,
} from "mdb-react-ui-kit";

function EventDetailPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();
  const [token] = useToken();
  const [loading, setLoading] = useState(true);
  const [ userId, setUserId] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const navigate = useNavigate();
  const [attendeeIds, setAttendeeIds] = useState([]);

  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      const token = await getTokenInternal();
      if (token) {
        navigate(-1);
      } else {
        navigate("/login");
      }
    };

    if (!getTokenInternal()) {
      checkAuthAndNavigate();
    }
  }, [navigate]);
  
  const handleAccountClick = (id) => {
      if (!setIsLoggedIn) {
          navigate("/signup");
      } else {
          navigate(`/accounts/${id}`);
      }
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

    useEffect(() => {
        async function getUserId() {
          const url = `${process.env.REACT_APP_FACEBARK_API_HOST}/api/things`;
          // const response = await fetch(url);
          const response = await fetch(url, { method: "GET", headers: { Authorization: `Bearer ${token}` } });
          if (response.ok) {
              const data = await response.json();

              setUserId(data)
          }
        }
        getUserId();
    }, [token]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_FACEBARK_API_HOST}/accounts`)
        .then((response) => response.json())
        .then((data) => {
            setAccounts(data);
            setLoading(false);
        })
        .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_FACEBARK_API_HOST}/attendees`)
        .then((response) => response.json())
        .then((data) => {
            setAttendees(data);
            setLoading(false);
        })
        .catch((error) => console.log(error));
    }, []);

  useEffect(() => {
    const url = `${process.env.REACT_APP_FACEBARK_API_HOST}/events/${eventId}`;
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
        setEvent(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (token && isLoggedIn) {
      fetchData();
    }
  }, [eventId, isLoggedIn, token]);

  if (loading) {
    return <Spinner />;
  }

  function formatTime(timeString) {
    const date = new Date(`2022-01-01T${timeString}:00`);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours || 12;
    return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  }

  let AttendeeIds = [];
  for (let a of attendees) {
    if (a["event_id"] === parseInt(eventId)) {
      AttendeeIds.push(a["attendee_id"]);
    };
  };
  // console.log(AttendeeIds)

  let NewAccounts = []
  for (let a of accounts) {
    if (AttendeeIds.includes(a["id"])) {
      NewAccounts.push(a);
    };
  };
  // console.log("THIS THE NEW ACCOUNTS",NewAccounts)

  let CreatedBy = {}
  for (let a of accounts) {
    if(a["id"] === event["account_id"]) {
      CreatedBy = a;
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};

    data.event_id = eventId;
    data.attendee_id = userId;

    // console.log(data);

    const eventUrl = `${process.env.REACT_APP_FACEBARK_API_HOST}/attendees`;

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await fetch(eventUrl, fetchConfig);
    // console.log(response);
    if (response.ok) {
      // Update the attendeeIds state with the new data
      const newAttendeeIds = [...attendeeIds, userId];
      setAttendeeIds(newAttendeeIds);
      // window.location.reload();
    }
  };

  const cardStyle = {
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #ccc',
      borderRadius: '4px',
      paddingTop: '10px',
      margin: '8px',
      marginTop: '10px',
      width: '200px',
      height: '250px',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const imgStyle = {
      height: '200px',
      width: '200px',
      objectFit: 'cover',
      marginTop: '12px',
      marginBottom: '8px',
      borderRadius: '0.5px'
  };

  const headerStyle = {
      fontSize: '18px',
      fontWeight: 'bold',
      marginTop: '0px',
      marginBottom: '0px',
      paddingTop: '5px'
  };

  // console.log(event)
  // console.log(CreatedBy)

  return (
    <div className="list-bg">
      <MDBRow>
        <MDBCol
          md="6"
          className="p-5 mx-auto"
          style={{ paddingBottom: "50px" }}
        >
          <MDBCard
            className="text-center"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
          >
            <MDBCardBody>
              <MDBCardText>
                <img
                  src={event.picture}
                  alt={event.title}
                  className="card-img-top img-fluid"
                  style={{
                    maxHeight: "300px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </MDBCardText>
              <MDBCardTitle
                style={{ fontWeight: "bold", marginBottom: "16px" }}
              >
                {event.title}
              </MDBCardTitle>
              <MDBCardText>{event.description}</MDBCardText>
              <MDBCardText>
                <strong>Date:</strong>{" "}
                {new Date(event.date)
                  .toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "2-digit",
                  })
                  .replace(/\//g, "/")}
              </MDBCardText>
              <MDBCardText>
                <strong>Time:</strong>{" "}
                {event.start_time && formatTime(event.start_time)} -{" "}
                {event.end_time && formatTime(event.end_time)}
              </MDBCardText>
              <MDBCardText>
                <strong>Address:</strong> {event.address}
              </MDBCardText>
              <MDBCardText>
                <strong>City:</strong> {event.cities_id}
              </MDBCardText>
              <MDBCardText>
                <strong>State:</strong> {event.states_id}
              </MDBCardText>
              <MDBCardText>
                <strong>Dog Park:</strong> {event.dog_parks_id}
              </MDBCardText>
              <MDBCardText>
                <strong>Event Organizer:</strong>
              </MDBCardText>
              <MDBCard>
                <MDBCardBody
                  className="text-center"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(195, 191, 216, 0.5)",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                  onClick={() => {
                    if (token && setIsLoggedIn) {
                      navigate(`/accounts/${CreatedBy.id}`);
                    } else {
                      navigate("/signup");
                    }
                  }}
                >
                  <MDBCardImage
                    src={CreatedBy.image_url}
                    alt={CreatedBy.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                      objectFit: "cover",
                    }}
                    className="rounded-circle"
                  />
                  <MDBCardTitle style={{ margin: 0 }}>
                    {CreatedBy.name}
                  </MDBCardTitle>
                </MDBCardBody>
              </MDBCard>

              <MDBCardFooter className="text-end">
                {AttendeeIds.includes(userId) ||
                attendeeIds.includes(userId) ? (
                  <p>You are attending this event!</p>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <MDBBtn
                      style={{
                        fontSize: "16px",
                        backgroundColor: "#bdd48c",
                        textTransform: "none",
                      }}
                      color="#bdd48c"
                      className="me-2"
                      type="submit"
                    >
                      Attend <MDBIcon icon="edit" className="ms-1" />
                    </MDBBtn>
                  </form>
                )}
              </MDBCardFooter>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      {NewAccounts.length > 0 ? (
        <div>
          <h3
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
            Dogs Attending This Event
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              paddingBottom: "30px"
            }}
          >
            {NewAccounts.map((account) => (
              <MDBCard
                style={{
                  ...cardStyle,
                }}
                key={account.id}
                onClick={() => {
                  if (token && setIsLoggedIn) {
                    handleAccountClick(account.id);
                  } else {
                    navigate("/signup");
                  }
                }}
              >
                <MDBRipple
                  rippleColor="light"
                  rippleTag="div"
                  className="bg-image hover-overlay"
                >
                  <MDBCardImage
                    src={account.image_url}
                    alt={account.name}
                    style={imgStyle}
                  />
                  <span>
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                    ></div>
                  </span>
                </MDBRipple>
                <MDBCardBody style={{ padding: "3px" }}>
                  <MDBCardTitle style={headerStyle}>
                    {account.name}
                  </MDBCardTitle>
                  <div
                    style={{
                      ...headerStyle,
                      fontSize: "0.8em",
                      fontWeight: "normal",
                    }}
                  ></div>
                </MDBCardBody>
              </MDBCard>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default EventDetailPage;
