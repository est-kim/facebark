import React, {useEffect, useState} from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";


function EventList() {


    const [state, setState] = useState("");
    const [states, setStates] = useState([]);
    const [city, setCity] = useState("");
    const [cities, setCities] = useState([]);
    const [event, setEvent] = useState("");
    const [events, setEvents] = useState([]);

    const handleStateChange = (event) => {
        const value = event.target.value;
        setState(value);
        setCity("");
      }

    const handleCityChange = (event) => {
        const value = event.target.value;
        setCity(value);
      }

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
        fetch("http://localhost:8000/events")
        .then((response) => response.json())
        .then((data) => setEvents(data))
        .catch((error) => console.log(error));
    }, []);

    let NewEvents = []

    for (let a of events) {

        if (a["states_id"] == state) {

            NewEvents.push(a)
        }
    }

    let NewCities = []

    for (let a of NewEvents) {

            NewCities.push(a["cities_id"])
        }

    let FinalCities = []

    for (let c of cities)

        if (NewCities.includes(c["id"]))

            FinalCities.push(c)

    console.log(FinalCities)

    let FinalEvents = []

    for (let a of events) {

        if (state == "") {

            FinalEvents = events
        }

        if (city == "") {

                if (a["states_id"] == state) {

                    FinalEvents.push(a)
        }

        }

        if (a["states_id"] == state && a["cities_id"] == city) {

            FinalEvents.push(a)
        }
    }

    console.log(FinalEvents)

    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '12px',
        margin: '8px',
        maxWidth: '400px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
    };

    const imgStyle = {
        maxHeight: '200px',
        maxWidth: '100%',
        objectFit: 'contain'
    };

    const headerStyle = {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '8px'
    };

    const bodyStyle = {
        fontSize: '14px'
    };

  return (
  <>
    <div className="row">
        <div className="offset-3 col-6">
          <div style={{ textAlign: 'center' }} className="shadow p-4 mt-4">
            <h1>Filter by Location</h1>
            <form id="create-event-form">

                <div className="mb-3">
                    <select onChange = {handleStateChange} value={state} required id="state" name="state" className="form-select">
                    <option value="">choose a state</option>
                    {states.map(state => {
                        return (
                        <option key={state.id} value={state.id}>
                        {state.name}
                        </option>
                        );
                        })}
                    </select>
                </div>

                <div className="mb-3">
                    <select onChange = {handleCityChange} value={city} required id="city" name="city" className="form-select">
                    <option value="">choose a city</option>
                    {FinalCities.map(city => {
                        return (
                        <option key={city.id} value={city.id}>
                        {city.name}
                        </option>
                        );
                        })}
                    </select>
                </div>

            </form>
          </div>
        </div>
      </div>
<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
  {FinalEvents.map((event) => (
    <div style={cardStyle} key={event.id}>
      <img src={event.picture} alt={event.name} style={imgStyle} />
      <Link to={`/events/${event.id}`} style={headerStyle}>{event.title}</Link>
      <div style={{ ...headerStyle, fontSize: '0.8em' }}>{new Date(event.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }).replace(/\//g, '/')}</div>
      <div style={bodyStyle}>{event.description}</div>
    </div>
  ))}
</div>
  </>
  );
}

export default EventList;
