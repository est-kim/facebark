import React, { useState, useEffect } from "react";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useAuthContext, getTokenInternal, useToken } from "./Authentication";
import { useAuthContext, getTokenInternal, useToken } from "./Authentication";

function EventForm() {
  const [title, setTitle] = useState("");
  //const [dogPark, setDogPark] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [start_time, setStart_time] = useState("");
  const [end_time, setEnd_time] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [account_id, setAccount_id] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [dogParks, setDogParks] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedDogParkId, setSelectedDogParkId] = useState("");
  const { setIsLoggedIn } = useAuthContext();
  const [userId, setUserId] = useState("");
  const [token] = useToken();
  const [showAlert, setShowAlert] = useState(false);

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  // const titleChangeHandler = (event) => {
  //   setTitle(event.target.value);
  // };
  const addressChangeHandler = (event) => {
    setAddress(event.target.value);
  };
  const dateChangeHandler = (event) => {
    setDate(event.target.value);
  };
  const handleDogParkChange = (event) => {
    setDogPark(event.target.value);
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

  const handleStateChange = (event) => {
    const value = event.target.value;
    setState(value);
    setCity("");
  };

  const handleCityChange = (event) => {
    const value = event.target.value;
    setCity(value);
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
    fetch("http://localhost:8000/dog_parks")
      .then((response) => response.json())
      .then((data) => setDogParks(data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.title = title;
    data.states_id = state;
    data.cities_id = city;
    data.dog_parks_id = dogPark;
    data.address = address;
    data.date = date;
    data.start_time = start_time;
    data.end_time = end_time;
    data.description = description;
    data.picture = picture;
    data.account_id = userId;
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
      setDogParks("");
      setAddress("");
      setDate("");
      setStart_time("");
      setEnd_time("");
      setDescription("");
      setPicture("");
    }
  };

  console.log(cities);
  console.log(states);
  console.log(dogParks);

  let NewCities = [];

  for (let c of cities) if (c["state_id"] == state) NewCities.push(c);

  console.log(NewCities);

  let NewDogParks = [];

  for (let d of dogParks) if (d["city_id"] == city) NewDogParks.push(d);
  const handleAlertClick = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
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

          <div className="mb-3">
            <select
              onChange={handleStateChange}
              value={state}
              required
              id="state"
              name="state"
              className="form-select"
            >
              <option value="">Choose a state</option>
              {states.map((state) => {
                return (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-3">
            <select
              onChange={handleCityChange}
              value={city}
              required
              id="city"
              name="city"
              className="form-select"
            >
              <option value="">Choose a city</option>
              {NewCities.map((city) => {
                return (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="dog_park" className="form-label">
              Suggested Dog Parks in Your Area:
            </label>
            <select
              onChange={handleDogParkChange}
              value={dogPark}
              required
              id="dog_park"
              name="dog_park"
              className="form-select"
            >
              <option value="" disabled hidden>
                Choose a dog park...
              </option>
              <option value="not_a_dog_park">
                This Event Is Not At A Dog Park
              </option>
              {NewDogParks.map((dogPark) => {
                return (
                  <option key={dogPark.id} value={dogPark.id}>
                    {dogPark.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="row mb-3">
            <div className="col-6">
              <div className="form-floating">
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
            </div>
            <div className="col-6">
              <span>
                Alright hooman, either look up the address for the dog park or
                put in a different address
              </span>
            </div>
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

          <div className="row mb-3">
            <div className="col-6">
              <div className="form-floating">
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
            <div className="col-6">
            <span>
              The picture needs to be a URL, which is the address of the picture on the internet. It typically consists of the protocol (e.g., "http://" or "https://"), the domain name (e.g., "www.example.com"), and the path to the picture (e.g., "/images/picture.jpg"). To get a picture URL, follow these general steps:
              <br /><br />
              <a href="#" onClick={handleAlertClick} style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>Click here for more information.</a>
              {showAlert && (
                <div style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }} onClick={handleCloseAlert}>
                  <div style={{ width: "50%", height: "70%", backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "5px", padding: "20px", overflow: "auto" }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ fontSize: "20px", marginBottom: "20px" }}>How to get a picture URL</div>
                    <div style={{ marginBottom: "20px" }}>To get the URL of a picture on your phone or computer:</div>
                    <ol>
                      <li>Find the picture you want to use</li>
                      <li>Upload the picture to a hosting service or cloud storage platform. Many free and paid options are available, such as Facebook (not Instagram), Imgur, Dropbox, or Google Drive</li>
                      <li>Once the picture is uploaded, right-click on it and select "Copy image address" or "Copy image URL"</li>
                      <li>Paste the picture URL in the "Picture" box</li>
                    </ol>
                    <br />
                    <button onClick={handleCloseAlert}>Close</button>
                  </div>
                </div>
              )}
            </span>
            );
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10 offset-sm-2">
              <button className="btn btn-primary mx-auto d-block">Create</button>
            </div>
          </div>
          <div className="form-floating mb-3">
            <input onChange={account_idChangeHandler} value={account_id} placeholder="Account" required type="text" name="account_id" id="account_id" className="form-control" />
            <label htmlFor="account">Account</label>
            </div>

        </div>
      </form>
    </div>
  );
}
export default EventForm;