import React, { useState, useEffect } from "react";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useAuthContext, getTokenInternal } from "./Authentication";

function EventForm() {
  const [title, setTitle] = useState("");
  const [dogPark, setDogPark] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [start_time, setStart_time] = useState("");
  const [end_time, setEnd_time] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [account_id, setAccount_id] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [dogParks, setDogParks] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedDogParkId, setSelectedDogParkId] = useState("");
  const { setIsLoggedIn } = useAuthContext();

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const addressChangeHandler = (event) => {
    setAddress(event.target.value);
  };
  const dateChangeHandler = (event) => {
    setDate(event.target.value);
  };
  const start_timeChangeHandler = (event) => {
    setStart_time(event.target.value);
  };
  const end_timeChangeHandler = (event) => {
    setEnd_time(event.target.value);
  };
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };
  const pictureChangeHandler = (event) => {
    setPicture(event.target.value);
  };
  const account_idChangeHandler = (event) => {
    setAccount_id(event.target.value);
  };
  
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
    fetch("http://localhost:8000/states")
      .then((response) => response.json())
      .then((data) => setStates(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (selectedStateId !== "") {
      fetch(`http://localhost:8000/cities/${selectedStateId}`)
        .then((response) => response.json())
        .then((data) => setCities(data));
    } else {
      setCities([]);
    }
  }, [selectedStateId]);

  useEffect(() => {
    if (selectedCityId !== "") {
      fetch(`http://localhost:8000/dog_parks/${selectedCityId}`)
        .then((response) => response.json())
        .then((data) => setCities(data));
    } else {
      setDogParks([]);
    }
  }, [selectedCityId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.title = title;
    data.states_id = selectedStateId;
    data.cities_id = selectedCityId;
    data.dog_parks_id = selectedDogParkId;
    data.address = address;
    data.date = date;
    data.start_time = start_time;
    data.end_time = end_time;
    data.description = description;
    data.picture = picture;
    data.account_id = account_id;
    console.log(data);

    const eventUrl = "http://localhost:8000/events";

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

      setTitle("");
      setSelectedStateId("");
      setSelectedCityId("");
      setDogPark("");
      setAddress("");
      setDate("");
      setStart_time("");
      setEnd_time("");
      setDescription("");
      setPicture("");
      setAccount_id("");
    }
  };

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Create Event
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: "400px" }}>
          <div className="form-floating mb-3">
            <input
              onChange={titleChangeHandler}
              value={title}
              placeholder="Title"
              required
              type="text"
              name="title"
              id="title"
              className="form-control"
            />
            <label htmlFor="title">Title</label>
          </div>

          <div className="form-floating mb-3" style={{ width: "100%" }}>
            <select
              id="states_id"
              name="states_id"
              value={selectedStateId || ""}
              onChange={(event) =>
                setSelectedStateId(parseInt(event.target.value))
              }
              required
              className="form-control dropdown-arrow"
              style={{ width: "100%" }}
            >
              <option value="" disabled={true}>
                State
              </option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
            <label htmlFor="states_id">State</label>
          </div>

          <div className="form-floating mb-3" style={{ width: "100%" }}>
            <select
              id="cities_id"
              name="cities_id"
              value={selectedCityId || ""}
              onChange={(event) =>
                setSelectedCityId(parseInt(event.target.value))
              }
              className="form-control dropdown-arrow"
              style={{ width: "100%" }}
            >
              <option value="" disabled={true}>
                City
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            <label htmlFor="cities_id">City</label>
          </div>

          <div className="form-floating mb-3" style={{ width: "100%" }}>
            <select
              onChange={(event) =>
                setSelectedDogParkId(parseInt(event.target.value))
              }
              value={selectedDogParkId || ""}
              required
              name="dog_park"
              id="dog_park"
              className="form-control dropdown-arrow"
              style={{ width: "100%" }}
            >
              <option value="" disabled={true}>
                Dog Park
              </option>
              {dogParks.map((dogPark) => (
                <option key={dogPark.id} value={dogPark.id}>
                  {dogPark.name}
                </option>
              ))}
            </select>
            <label htmlFor="dog_park">Dog Park</label>
          </div>

          <div className="form-floating mb-3">
            <input
              onChange={addressChangeHandler}
              value={address}
              placeholder="Address"
              required
              type="text"
              name="address"
              id="address"
              className="form-control"
            />
            <label htmlFor="address">Address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              onChange={dateChangeHandler}
              value={date}
              placeholder="Date"
              required
              type="date"
              name="date"
              id="date"
              className="form-control"
            />
            <label htmlFor="date">Date</label>
          </div>

          <div className="form-floating mb-3">
            <input
              onChange={start_timeChangeHandler}
              value={start_time}
              placeholder="Start Time"
              required
              type="time"
              name="start_time"
              id="start_time"
              className="form-control"
            />
            <label htmlFor="start_time">Start Time</label>
          </div>

          <div className="form-floating mb-3">
            <input
              onChange={end_timeChangeHandler}
              value={end_time}
              placeholder="End Time"
              required
              type="time"
              name="end_time"
              id="end_time"
              className="form-control"
            />
            <label htmlFor="end_time">End Time</label>
          </div>

          <div className="form-floating mb-3">
            <textarea
              onChange={descriptionChangeHandler}
              value={description}
              placeholder="Description"
              required
              type="text"
              name="description"
              id="description"
              className="form-control"
              rows="15"
            ></textarea>
            <label htmlFor="description">Description</label>
          </div>

          <div className="form-floating mb-3">
            <input
              onChange={pictureChangeHandler}
              value={picture}
              placeholder="Picture"
              required
              type="text"
              name="picture"
              id="picture"
              className="form-control"
            />
            <label htmlFor="picture">Picture</label>
          </div>
        </div>
        <button className="btn btn-primary">Create</button>
      </form>
    </div>
  );
}
export default EventForm;
