import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

function EventDetailPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState("");
  const [events, setEvents] = useState([]);
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();
  const [token] = useToken();

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
      }
    };
    fetchData();
  }, []);

  const formatTime = (timeString) => {
    const [time, period] = timeString.split(' ');
    const [hour, minute] = time.split(':').map(Number);
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  return (
<MDBRow className="mt-4">
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
        {/* <MDBCardText>
          Picture: <img src={event.picture} alt={event.title} />
        </MDBCardText> */}
        <MDBCardFooter className="text-end">
          <MDBBtn color="warning" className="me-2">
            Attend <MDBIcon icon="edit" className="ms-1" />
          </MDBBtn>
        </MDBCardFooter>
      </MDBCardBody>
    </MDBCard>
  </MDBCol>
</MDBRow>
  );
}

export default EventDetailPage;
