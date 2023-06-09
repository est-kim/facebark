import { useState, useEffect } from "react";
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
import CustomFileInputSignup from "./CustomFileInputSignUp";

function SignUpForm() {
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedStateId, setSelectedStateId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dogName, setDogName] = useState("");
  const [selectedGender, setGender] = useState("");
  const [selectedBreed, setBreed] = useState("");
  const [birthday, setBirthday] = useState("");
  const [description, setDescription] = useState("");
  const [breeds, setBreeds] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [, setSubmitted] = useState(false);
  const [existing, setExisting] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [dogImage, setDogImage] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleOwnerNameChange = (event) => {
    setOwnerName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    const inputPhoneNumber = event.target.value;
    const formattedPhoneNumber = inputPhoneNumber.replace(/\D/g, "");
    setPhoneNumber(formattedPhoneNumber);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleDogNameChange = (event) => {
    setDogName(event.target.value);
  };

  const handleBreedChange = (event) => {
    setBreed(event.target.value);
  };

  const handleDogImageChange = (event) => {
    setDogImage(event.target.files[0]);
    setUploadSuccess(event.target.files.length > 0);
  };

  const handleBirthdayChange = (event) => {
    setBirthday(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_FACEBARK_API_HOST}/breeds`)
      .then((response) => response.json())
      .then((data) =>
        setBreeds(data.map((breed) => ({ id: breed.id, name: breed.name })))
      )
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_FACEBARK_API_HOST}/states`)
      .then((response) => response.json())
      .then((data) => setStates(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (selectedStateId !== "") {
      fetch(
        `${process.env.REACT_APP_FACEBARK_API_HOST}/cities/${selectedStateId}`
      )
        .then((response) => response.json())
        .then((data) => setCities(data));
    } else {
      setCities([]);
    }
  }, [selectedStateId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const imageData = new FormData();
    imageData.append("file", dogImage);
    imageData.append("new_image", dogImage.name);

    const imageResponse = await fetch(
      `${process.env.REACT_APP_FACEBARK_API_HOST}/accounts/image`,
      {
        method: "POST",
        body: imageData,
      }
    );

    const imageUrl = await imageResponse.text();

    const data = {};
    data.name = dogName;
    data.email = email;
    data.username = username;
    data.password = password;
    data.phone_number = phoneNumber;
    data.owner_name = ownerName;
    data.breed = selectedBreed;
    data.new_image = imageUrl.replace(/['"]+/g, "");
    data.dob = birthday;
    data.description = description;
    data.sex = selectedGender;
    data.city_id = selectedCityId;
    data.state_id = selectedStateId;
    data.image_url = "0";

    const url = `${process.env.REACT_APP_FACEBARK_API_HOST}/accounts`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        const responseData = await response.json();
        const id = responseData.account.id;
        // console.log("User ID:", id); // Check if ID is being returned properly

        // Create status for new account
        const statusData = {
          status_text:
            "<woof woof! This is a pupdate! You can add a picture like this if you want, but you don't have to>",
          time_stamp: new Date().toISOString(),
          image_url:
            "https://thumbs.dreamstime.com/b/portrait-funny-dog-behind-wheel-car-jack-russell-terrier-sunglasses-151057370.jpg",
          account_id: id,
        };
        // console.log("Status data to be sent:", statusData);

        const statusUrl = `${process.env.REACT_APP_FACEBARK_API_HOST}/statuses`;
        const statusFetchConfig = {
          method: "post",
          body: JSON.stringify(statusData),
          headers: {
            "Content-Type": "application/json",
          },
        };
        const statusResponse = await fetch(statusUrl, statusFetchConfig);
        if (statusResponse.ok) {
          console.log("Status created successfully!");
        } else {
          const error = await statusResponse.json();
          console.log("Error creating status:", error);
        }

        // Create following entries for new account
        const followingsData = [
          { follower_id: id, followee_id: 1 },
          { follower_id: id, followee_id: 2 },
          { follower_id: id, followee_id: 3 },
          { follower_id: id, followee_id: 4 },
          { follower_id: 1, followee_id: id },
          { follower_id: 2, followee_id: id },
          { follower_id: 3, followee_id: id },
          { follower_id: 4, followee_id: id },
        ];

        for (let i = 0; i < followingsData.length; i++) {
          const followingData = followingsData[i];
          // console.log("Following data to be sent:", followingData);

          const followingUrl = `${process.env.REACT_APP_FACEBARK_API_HOST}/following`;
          const followingFetchConfig = {
            method: "post",
            body: JSON.stringify(followingData),
            headers: {
              "Content-Type": "application/json",
            },
          };

          const followingResponse = await fetch(
            followingUrl,
            followingFetchConfig
          );

          if (followingResponse.ok) {
            console.log(`Following ${i + 1} created successfully!`);
          } else {
            const error = await followingResponse.json();
            console.log(`Error creating following ${i + 1}:`, error);
          }
        }

        setOwnerName("");
        setEmail("");
        setUsername("");
        setPassword("");
        setSelectedCityId("");
        setSelectedStateId("");
        setPhoneNumber("");
        setDogName("");
        setGender("");
        setBreed("");
        setDogImage("");
        setBirthday("");
        setDescription("");
        setSubmitted(true);
        setExisting(false);
        navigate("/login");
      } else {
        const error = await response.json();
        setExisting(true);
        setSubmitted(false);
        setErrorMessage(error.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Sorry, this username is already taken. Please come up with another username."
      );
    }
  };

  return (
    <div className="list-bg" style={{ minHeight: "80vh" }}>
      <MDBContainer fluid className="h-custom">
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol
            col="12"
            className="m-5"
            style={{
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <form onSubmit={handleSubmit} id="signup-form">
              <MDBCard style={{ borderRadius: "15px" }}>
                <MDBCardBody className="p-0">
                  <MDBRow style={{ textAlign: "center" }}>
                    <MDBCol md="6" className="p-5 bg-white">
                      <h3
                        className="fw-normal mb-5"
                        style={{ color: "#b0e4dc", fontSize: "25px" }}
                      >
                        User Information
                      </h3>

                      <MDBInput
                        onChange={handleOwnerNameChange}
                        wrapperClass="mb-4"
                        label="Full Name"
                        size="lg"
                        id="owner_name"
                        name="owner_name"
                        type="text"
                        required
                      />

                      <MDBInput
                        onChange={handleEmailChange}
                        wrapperClass="mb-4"
                        label="Email"
                        size="lg"
                        id="email"
                        name="email"
                        type="email"
                        required
                      />
                      <MDBRow>
                        <MDBCol md="6">
                          <MDBInput
                            onChange={handleUsernameChange}
                            wrapperClass="mb-4"
                            label="Username"
                            size="lg"
                            id="username"
                            name="username"
                            type="text"
                            required
                          />
                        </MDBCol>
                        <MDBCol md="6">
                          <select
                            id="state_id"
                            name="state_id"
                            value={selectedStateId || ""}
                            onChange={(event) =>
                              setSelectedStateId(parseInt(event.target.value))
                            }
                            style={{
                              backgroundColor: "transparent",
                              width: "100%",
                              height: "65%",
                              border: "solid",
                              borderColor: "#bdbdbd",
                              color: "#4c635f",
                              borderRadius: "3px",
                              borderWidth: "1px",
                              paddingLeft: "6px",
                            }}
                            required
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
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="6">
                          <MDBInput
                            onChange={handlePasswordChange}
                            wrapperClass="mb-4"
                            label="Password"
                            size="lg"
                            id="password"
                            name="password"
                            type="password"
                            required
                          />
                        </MDBCol>
                        <MDBCol md="6">
                          <select
                            id="city_id"
                            required
                            name="city_id"
                            value={selectedCityId || ""}
                            disabled={cities.length === 0}
                            onChange={(event) =>
                              setSelectedCityId(parseInt(event.target.value))
                            }
                            style={{
                              backgroundColor: "transparent",
                              width: "100%",
                              height: "65%",
                              border: "solid",
                              borderColor: "#bdbdbd",
                              color: "#4c635f",
                              borderRadius: "3px",
                              borderWidth: "1px",
                              paddingLeft: "6px",
                            }}
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
                        </MDBCol>
                      </MDBRow>

                      <MDBInput
                        onChange={handlePhoneNumberChange}
                        wrapperClass="mb-4"
                        label="Phone Number (Optional)"
                        size="lg"
                        id="phone_number"
                        name="phone_number"
                        type="tel"
                        maxLength={12}
                      />
                    </MDBCol>

                    <MDBCol md="6" className="bg-light-blue p-5">
                      <h3
                        className="fw-normal mb-5 text-muted"
                        style={{ color: "#4835d4", fontSize: "25px" }}
                      >
                        Dog Information
                      </h3>
                      <MDBRow>
                        <MDBCol md="6">
                          <MDBInput
                            onChange={handleDogNameChange}
                            wrapperClass="mb-4"
                            label="Dog's Name"
                            size="lg"
                            id="name"
                            name="name"
                            type="text"
                            required
                          />
                        </MDBCol>
                        <MDBCol md="6">
                          <select
                            id="breed"
                            name="breed"
                            value={selectedBreed}
                            onChange={handleBreedChange}
                            required
                            style={{
                              backgroundColor: "transparent",
                              width: "100%",
                              height: "65%",
                              border: "solid",
                              borderColor: "#bdbdbd",
                              color: "#4c635f",
                              borderRadius: "3px",
                              borderWidth: "1px",
                              paddingLeft: "6px",
                            }}
                          >
                            <option value="">Breed</option>
                            {breeds.map((breed) => (
                              <option key={breed.id} value={breed.name}>
                                {breed.name}
                              </option>
                            ))}
                          </select>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="12">
                          <CustomFileInputSignup
                            onChange={handleDogImageChange}
                            reset={false}
                            showSuccessMessage={uploadSuccess}
                            labelText="Choose Profile Picture"
                            additionalStyles={{
                              marginTop: "10px",
                              marginBottom: "35px",
                            }}
                            isRequired // Keep this line for making the field required
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="5">
                          <select
                            id="sex"
                            name="sex"
                            required
                            value={selectedGender}
                            onChange={handleGenderChange}
                            style={{
                              backgroundColor: "transparent",
                              width: "100%",
                              height: "65%",
                              border: "solid",
                              borderColor: "#bdbdbd",
                              color: "#4c635f",
                              borderRadius: "3px",
                              borderWidth: "1px",
                              paddingLeft: "6px",
                            }}
                          >
                            <option value="">Select a gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </MDBCol>

                        <MDBCol md="7">
                          <MDBInput
                            onChange={handleBirthdayChange}
                            wrapperClass="mb-4"
                            label="Birthday"
                            size="lg"
                            id="dob"
                            name="dob"
                            type="date"
                            required
                          />
                        </MDBCol>
                      </MDBRow>

                      <MDBInput
                        onChange={handleDescriptionChange}
                        wrapperClass="mb-4"
                        label="Tell us about yourself! Favorite treat? Special talent?"
                        size="lg"
                        id="description"
                        name="description"
                        type="textarea"
                        style={{ height: "113px" }}
                        required
                      />
                      {existing && (
                        <p>
                          Sorry, this username is already taken. Please come up
                          with another username.
                        </p>
                      )}
                      {errorMessage && (
                        <p style={{ color: "red" }}>{errorMessage}</p>
                      )}
                      <MDBRow className="justify-content-center">
                        <MDBCol md="6">
                          <MDBBtn
                            color="light"
                            size="md"
                            style={{ fontSize: "15px", textTransform: "none" }}
                          >
                            Sign Up
                          </MDBBtn>
                        </MDBCol>
                      </MDBRow>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default SignUpForm;
