import { useState, useEffect } from "react";
import { useAuthContext } from "./Authentication";
import { useParams } from "react-router-dom";
import {
  MDBBtn,
  MDBModal,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBCol
} from "mdb-react-ui-kit";

function AccountUpdateModal() {
    const { token } = useAuthContext();
    const [, setAccount] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [name, setName] = useState("");
    const [image_url, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [updateModal, setUpdateModal] = useState(false);
    const toggleShow = () => setUpdateModal(!updateModal);
    const { accountId } = useParams();

    useEffect(() => {
        const fetchAccountData = async () => {
            const URL = `${process.env.REACT_APP_FACEBARK_API_HOST}/accounts`;
            const response = await fetch(URL, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
            const data = await response.json();
                setAccount(data);
                setUsername(data.username);
                setEmail(data.email);
                setPhoneNumber(data.phone_number);
                setName(data.name);
                setImageUrl(data.image_url);
                setDescription(data.description);
            }
        };
        fetchAccountData();
    }, [token]);


    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);
    };

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
    };

    const handlePhoneNumberChange = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
    };

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    };

    const handleImageUrlChange = (event) => {
        const value = event.target.value;
        setImageUrl(value);
    };

    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setDescription(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = `${process.env.REACT_APP_FACEBARK_API_HOST}/accounts/${accountId}`;
        const fetchConfig = {
            method: "put",
            body: JSON.stringify({
                username: username,
                email: email,
                phone_number: phone_number,
                name: name,
                image_url: image_url,
                description: description,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            await response.json();
            window.location.reload();
        };
    };

    return (
      <>
        <MDBBtn
          onClick={toggleShow}
          style={{
            margin: "10px",
            backgroundColor: "#9ecdc6",
            fontSize: "15px",
            padding: "5px 15px",
            boxShadow: "2px 2px 4px #888888",
            textTransform: "none",
          }}
        >
          Edit Account <MDBIcon icon="edit" className="ms-1" />
        </MDBBtn>
        <MDBModal show={updateModal} setShow={setUpdateModal} tabIndex="-1">
          <MDBModalContent style={{
            maxWidth: "500px",
            margin: "auto",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}>
            <MDBModalHeader>
              <MDBModalTitle>Edit Account Information</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <form onSubmit={handleSubmit} id="update-account-form">
              <MDBModalBody>
                <MDBRow>
                  <MDBCol md="12">
                    <div>
                      <MDBInput
                        onChange={handleUsernameChange}
                        wrapperClass="mb-4"
                        label="Username"
                        size="lg"
                        id="username"
                        name="username"
                        type="text"
                      />
                      <MDBInput
                        onChange={handleEmailChange}
                        wrapperClass="mb-4"
                        label="Email"
                        size="lg"
                        id="email"
                        name="email"
                        type="email"
                      />
                      <MDBInput
                        onChange={handlePhoneNumberChange}
                        wrapperClass="mb-4"
                        label="Phone Number"
                        size="lg"
                        id="phone_number"
                        name="phone_number"
                        type="tel"
                        maxLength={12}
                      />
                      <MDBInput
                        onChange={handleNameChange}
                        wrapperClass="mb-4"
                        label="Dog's Name"
                        size="lg"
                        id="name"
                        name="name"
                        type="text"
                      />
                      <MDBInput
                        onChange={handleImageUrlChange}
                        wrapperClass="mb-4"
                        label="Photo URL"
                        size="lg"
                        id="image_url"
                        name="image_url"
                        type="url"
                      />
                      <MDBInput
                        onChange={handleDescriptionChange}
                        wrapperClass="mb-4"
                        label="Tell us about yourself! Favorite treat? Special talent?"
                        size="lg"
                        id="description"
                        name="description"
                        type="textarea"
                        // style={{ height: "113px" }}
                      />
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBModalBody>
              <MDBModalFooter style={{ textAlign: "center" }}>
                <MDBBtn
                  style={{
                    margin: "10px",
                    backgroundColor: "#9ecdc6",
                    fontSize: "15px",
                    padding: "5px 15px",
                    boxShadow: "2px 2px 4px #888888",
                    textTransform: "none"
                  }}
                >
                  Save Changes
                </MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModal>
      </>
    );
}

export default AccountUpdateModal;
