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
  const [, setImageUrl] = useState("");
  const [new_image, setNewImage] = useState("");
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

        // Find the account with the matching ID and set the form input values
        const currentAccount = data.find((a) => a.id === parseInt(accountId));
        if (currentAccount) {
          setUsername(currentAccount.username);
          setEmail(currentAccount.email);
          setPhoneNumber(currentAccount.phone_number);
          setName(currentAccount.name);
          setImageUrl(currentAccount.image_url);
          setDescription(currentAccount.description);
        }
      }
    };
    fetchAccountData();
  }, [token, accountId]);


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

    const handleNewImageChange = (event) => {
      setNewImage(event.target.files[0]);
    };

    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setDescription(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

    const imageData = new FormData();
    imageData.append("file", new_image);
    imageData.append("new_image", new_image.name);

    const imageResponse = await fetch(
      `${process.env.REACT_APP_FACEBARK_API_HOST}/accounts/image`,
      {
        method: "POST",
        body: imageData,
      }
    );

    const imageUrl = await imageResponse.text();
        const url = `${process.env.REACT_APP_FACEBARK_API_HOST}/accounts/${accountId}`;
        const fetchConfig = {
            method: "put",
            body: JSON.stringify({
                username: username,
                email: email,
                phone_number: phone_number,
                name: name,
                image_url: "0",
                description: description,
                new_image: imageUrl.replace(/['"]+/g, ''),

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


    // for (let a of account)
    //   if(a["id"] == accountId)
    //     my_account = a

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
                        value={username}
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
                        value={email}
                        required
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
                        value={phone_number}
                        required
                      />
                      <MDBInput
                        onChange={handleNameChange}
                        wrapperClass="mb-4"
                        label="Dog's Name"
                        size="lg"
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        required
                      />
                        <MDBInput
                          onChange={handleNewImageChange}
                          wrapperClass="mb-4"
                          size="lg"
                          id="new_image"
                          name="new_image"
                          type="file"
                          required

                        />
                      <MDBInput
                        onChange={handleDescriptionChange}
                        wrapperClass="mb-4"
                        label="Tell us about yourself! Favorite treat? Special talent?"
                        size="lg"
                        id="description"
                        name="description"
                        type="textarea"
                        value={description}
                        required
                      />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      Note: All fields must be filled in for changes to be applied
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
