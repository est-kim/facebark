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
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

import {


  MDBCardImage,
  MDBRipple,

} from "mdb-react-ui-kit";
import "./list-bgs.css";

function EventDetailPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState("");
  const [events, setEvents] = useState([]);
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();
  const [token] = useToken();
  const [loading, setLoading] = useState(true);
  const [ userId, setUserId] = useState("");
  const [account, setAccount] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [attendee, setAttendee] = useState("");
  const [attendees, setAttendees] = useState([]);
  const navigate = useNavigate();
  const [attendeeIds, setAttendeeIds] = useState([]);



  const handleAccountClick = (id) => {
      if (!setIsLoggedIn) {
          navigate("/signup");
      } else {
          navigate(`/accounts/${id}`);
      }
  };
  // console.log(`http://localhost:8000/events/${eventId}`)
  useEffect(() => {
    const fetchToken = async () => {
      const token = await getTokenInternal();
      if (token) {
        setIsLoggedIn(true);
      }
    };
    fetchToken();
  }, []);

    useEffect(() => {
          async function getUserId() {
              const url = `http://localhost:8000/api/things`;
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
        fetch("http://localhost:8000/accounts")
        .then((response) => response.json())
        .then((data) => {
            setAccounts(data);
            setLoading(false);
        })
        .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        fetch("http://localhost:8000/attendees")
        .then((response) => response.json())
        .then((data) => {
            setAttendees(data);
            setLoading(false);
        })
        .catch((error) => console.log(error));
    }, []);
  // useEffect(() => {
  //   fetch(`http://localhost:8000/events/${eventId}`)
  //     .then((response) => response.json())
  //     .then((data) => setEvent(data))
  //     .catch((error) => console.log(error));
  // }, []);

  useEffect(() => {
    const url = `http://localhost:8000/events/${eventId}`;
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

  const formatTime = (timeString) => {
    const [time, period] = timeString.split(' ');
    const [hour, minute] = time.split(':').map(Number);
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  };


  let AttendeeIds = []

    for (let a of attendees)

        if (a["event_id"] == eventId)

            AttendeeIds.push(a["attendee_id"])

    console.log(AttendeeIds)

  let NewAccounts = []

    for (let a of accounts)

        if (AttendeeIds.includes(a["id"]))

            NewAccounts.push(a)

    console.log(NewAccounts)

    let CreatedBy = {}

      for (let a of accounts)

          if(a["id"] == event["account_id"])

              CreatedBy = a



  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};

    data.event_id = eventId;
    data.attendee_id = userId;

    console.log(data);

    const eventUrl = "http://localhost:8000/attendees";

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
      // Update the attendeeIds state with the new data
      const newAttendeeIds = [...attendeeIds, userId];
      setAttendeeIds(newAttendeeIds);
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
        // cursor: setIsLoggedIn ? "pointer" : "default"
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

    const bodyStyle = {
        fontSize: '12px',
        marginTop: '1px',
        paddingBottom: '4px'
    };
    console.log(event)
    console.log(CreatedBy)

  return (
<>
  <MDBRow className="mt-5">
    <MDBCol md="6" className="mx-auto">
      <MDBCard className="text-center">
        <MDBCardBody>
          <MDBCardText>
            <img src={event.picture} alt={event.title} className="card-img-top img-fluid" style={{ maxHeight: '300px', maxWidth: '100%', objectFit: 'contain' }} />
          </MDBCardText>
          <MDBCardTitle>{event.title}</MDBCardTitle>
          <MDBCardText>{event.description}</MDBCardText>
          <MDBCardText><strong>Date:</strong> {new Date(event.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }).replace(/\//g, '/')}</MDBCardText>
          <MDBCardText><strong>Time:</strong> {event.start_time && formatTime(event.start_time)} - {event.end_time && formatTime(event.end_time)}</MDBCardText>
          <MDBCardText><strong>Address:</strong> {event.address}</MDBCardText>
          <MDBCardText><strong>State:</strong> {event.states_id }</MDBCardText>
          <MDBCardText><strong>City:</strong> {event.cities_id}</MDBCardText>
          <MDBCardText><strong>Dog Park:</strong> {event.dog_parks_id}</MDBCardText>
          <MDBCardText>
            <strong>Event Organizer:</strong>
            <MDBCard>
              <MDBCardBody className="text-center" style={{ display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => {
                if (token && setIsLoggedIn) {
                  navigate(`/accounts/${CreatedBy.id}`);
                } else {
                  navigate("/signup");
                }
              }}>
                <MDBCardImage
                  src={CreatedBy.image_url}
                  alt={CreatedBy.name}
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                  className="rounded-circle"
                  // add any other styling props you need
                />
                <MDBCardTitle style={{ margin: 0 }}>{CreatedBy.name}</MDBCardTitle>
              </MDBCardBody>
            </MDBCard>
          </MDBCardText>
          <MDBCardFooter className="text-end">
          {AttendeeIds.includes(userId) || attendeeIds.includes(userId) ? (
            <p>You are attending this event!</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <MDBBtn color="warning" className="me-2" type="submit">
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
    <h3 style={{ textAlign: "center", marginTop: "30px", marginBottom: "30px" }}>
      Dogs Attending This Event
    </h3>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
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
            <a>
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
              ></div>
            </a>
          </MDBRipple>
          <MDBCardBody style={{ padding: "3px" }}>
            <MDBCardTitle style={headerStyle}>{account.name}</MDBCardTitle>
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




</>
)
}
export default EventDetailPage;