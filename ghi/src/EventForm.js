import { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput
} from "mdb-react-ui-kit";
import { useAuthContext, getTokenInternal, useToken } from "./Authentication";

function EventForm() {
    const [title, setTitle] = useState("");
    const [dogPark, setDogPark] = useState("");
    const [address, setAddress] = useState("");
    const [date, setDate] = useState("");
    const [start_time, setStart_time] = useState("");
    const [end_time, setEnd_time] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState("");
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [dogParks, setDogParks] = useState([]);
    const [, setSelectedStateId] = useState("");
    const [, setSelectedCityId] = useState("");
    const { setIsLoggedIn } = useAuthContext();
    const [userId, setUserId] = useState("");
    const [token] = useToken();
    const [showAlert, setShowAlert] = useState(false);
    const [success, setSuccess] = useState(false);

    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    };

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
    }, [setIsLoggedIn]);

  useEffect(() => {
    async function getUserId() {
      const url = `http://localhost:8000/api/things`;
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
        data.picture = picture.startsWith("http") ? picture : "https://img.freepik.com/free-vector/many-dogs-running-park_1308-86675.jpg";
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
        if (response.ok) {
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
            setSuccess(true);
        };
    };

    let NewCities = [];
    for (let c of cities) {
        if (c["state_id"] === parseInt(state)) {
            NewCities.push(c);
        };
    };

    let NewDogParks = [];
    for (let d of dogParks) {
        if (d["city_id"] === parseInt(city)) {
            NewDogParks.push(d);
        };
    };

    const handleAlertClick = () => {
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

  return (
    <MDBContainer fluid className="list-bg">
      <MDBRow className="d-flex justify-content-center align-items-center">
        <MDBCol className="m-5">
          <MDBCard
            className="my-4 d-flex flex-column"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}
          >
            <MDBRow className="g-0">
              <MDBCol md="6" className="me-6 p-0 m-0">
                <MDBCardImage
                  src="https://publish.purewow.net/wp-content/uploads/sites/2/2022/12/cesar-millan-rough-pet-play-advice-.jpg?fit=2050%2C1100"
                  alt="dogs playing"
                  className="rounded-start"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  fluid
                />
              </MDBCol>
              <MDBCol md="6">
                <form onSubmit={handleSubmit}>
                  <MDBCardBody className="text-center d-flex flex-column justify-content-center">
                    <h4 className="mb-4">Create an Event</h4>
                    <MDBRow>
                      <MDBCol md="12">
                        <MDBInput
                          onChange={titleChangeHandler}
                          value={title || ""}
                          wrapperClass="mb-3"
                          label="Event Title"
                          size="md"
                          id="title"
                          type="text"
                          required
                        />
                      </MDBCol>
                      <MDBCol md="6">
                        <select
                          onChange={handleStateChange}
                          value={state | ""}
                          required
                          id="state"
                          name="state"
                          className="form-select mb-3"
                        >
                          <option>Choose a state</option>
                          {states.map((state) => {
                            return (
                              <option key={state.id} value={state.id}>
                                {state.name}
                              </option>
                            );
                          })}
                        </select>
                      </MDBCol>
                      <MDBCol md="6">
                        <select
                          onChange={handleCityChange}
                          value={city | ""}
                          required
                          id="city"
                          name="city"
                          className="form-select mb-3"
                        >
                          <option>Choose a city</option>
                          {NewCities.map((city) => {
                            return (
                              <option key={city.id} value={city.id}>
                                {city.name}
                              </option>
                            );
                          })}
                        </select>
                      </MDBCol>
                      <MDBCol md="12">
                        <select
                          onChange={handleDogParkChange}
                          value={dogPark}
                          required
                          id="dog_park"
                          name="dog_park"
                          className="form-select mb-3"
                        >
                          <option disabled hidden>
                            Choose a dog park...
                          </option>
                          <option value="not_a_dog_park">
                            Custom location - this event is not at a dog park
                          </option>
                          {NewDogParks.map((dogPark) => {
                            return (
                              <option key={dogPark.id} value={dogPark.id}>
                                {dogPark.name}
                              </option>
                            );
                          })}
                        </select>
                      </MDBCol>
                      <MDBCol md="12">
                        <MDBInput
                          onChange={addressChangeHandler}
                          value={address}
                          label="Enter the dog park address or custom address"
                          required
                          type="text"
                          name="address"
                          id="address"
                          className="form-control mb-3"
                        />
                      </MDBCol>
                      <MDBCol md="4">
                        <MDBInput
                          onChange={dateChangeHandler}
                          value={date}
                          placeholder="Date"
                          required
                          type="date"
                          name="date"
                          id="date"
                          className="form-control mb-3"
                        />
                      </MDBCol>
                      <MDBCol md="4">
                        <MDBInput
                          onChange={start_timeChangeHandler}
                          value={start_time}
                          label="Start Time"
                          required
                          type="time"
                          name="start_time"
                          id="start_time"
                          className="form-control mb-3"
                        />
                      </MDBCol>
                      <MDBCol md="4">
                        <MDBInput
                          onChange={end_timeChangeHandler}
                          value={end_time}
                          label="End Time"
                          required
                          type="time"
                          name="end_time"
                          id="end_time"
                          className="form-control mb-3"
                        />
                      </MDBCol>
                      <MDBCol md="12">
                        <MDBInput
                          onChange={descriptionChangeHandler}
                          value={description}
                          label="Event Description"
                          required
                          type="textarea"
                          name="description"
                          id="description"
                          className="form-control mb-3"
                          style={{ resize: "vertical", height: "100px" }}
                        />
                      </MDBCol>
                      <MDBCol md="7">
                        <MDBInput
                          onChange={pictureChangeHandler}
                          value={picture}
                          label="Picture URL"
                          required
                          type="url"
                          name="picture"
                          id="picture"
                          className="form-control mb-3"
                        />
                      </MDBCol>
                      <MDBCol md="5">
                        <span
                          href="#"
                          onClick={handleAlertClick}
                          style={{
                            textDecoration: "none",
                            cursor: "pointer",
                          }}
                        >
                          How do I get a picture URL?
                        </span>
                        {showAlert && (
                          <div
                            style={{
                              position: "fixed",
                              top: "0",
                              left: "0",
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                            }}
                            onClick={handleCloseAlert}
                          >
                            <div
                              style={{
                                width: "50%",
                                height: "70%",
                                backgroundColor: "#fff",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                padding: "20px",
                                overflow: "auto",
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div
                                style={{
                                  fontSize: "20px",
                                  marginBottom: "20px",
                                }}
                              >
                                How to get a picture URL
                              </div>
                              <div style={{ marginBottom: "20px" }}>
                                To get the URL of a picture on your phone or
                                computer:
                              </div>
                              <ol>
                                <li>Find the picture you want to use</li>
                                <li>
                                  Upload the picture to a hosting service or
                                  cloud storage platform. Many free and paid
                                  options are available, such as Facebook (not
                                  Instagram), Imgur, Dropbox, or Google Drive
                                </li>
                                <li>
                                  Once the picture is uploaded, right-click on
                                  it and select "Copy image address" or "Copy
                                  image URL"
                                </li>
                                <li>
                                  Paste the picture URL in the "Picture" box
                                </li>
                              </ol>
                              <br />
                              <MDBBtn
                                onClick={handleCloseAlert}
                                style={{
                                  backgroundColor: "#FFBA00",
                                  borderColor: "#FFBA00",
                                  color: "#FFFFFF",
                                }}
                              >
                                Close
                              </MDBBtn>
                            </div>
                          </div>
                        )}
                      </MDBCol>
                      <MDBBtn
                        color="white"
                        size="md"
                        className="text-center w-50 mx-auto"
                        style={{
                          fontSize: "16px",
                          backgroundColor: "#bdd48c",
                        }}
                      >
                        Create
                      </MDBBtn>
                      {success && (
                        <p style={{ marginTop: "15px", color: "green" }}>
                          Created event successfully!
                        </p>
                      )}
                    </MDBRow>
                  </MDBCardBody>
                </form>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
export default EventForm;
