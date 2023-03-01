import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
} from "mdb-react-ui-kit";

function AccountDetailPage() {


  const { accountId } = useParams();
  const [account, setAccount] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [state, setState] = useState("");
  const [states, setStates] = useState([]);
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);


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
    fetch(`http://localhost:8000/accounts/${accountId}`)
      .then((response) => response.json())
      .then((data) => setAccount(data))
      .catch((error) => console.log(error));
  }, []);

  function calculateAge(dobString) {
    const dob = new Date(dobString);
    const now = new Date();
    const ageDiffMs = now - dob;
    const ageDate = new Date(ageDiffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  let NewState = ""

  for (let s of states)

    if (s["id"] == account.state_id)

      NewState = s["name"]

  let NewCity = ""

  for (let c of cities)

    if (c["id"] == account.city_id)

      NewCity = c["name"]

  return (
<MDBRow className="mt-4">
  <MDBCol md="6" className="mx-auto">
    <MDBCard className="text-center">
      <MDBCardBody>
        <MDBCardText>
          <img src={account.image_url} alt={account.name} className="card-img-top img-fluid" style={{ maxHeight: '300px', maxWidth: '100%', objectFit: 'contain' }} />
        </MDBCardText>
        <MDBCardTitle>{account.name}</MDBCardTitle>
        <MDBCardText>{account.description}</MDBCardText>
        <MDBCardText><strong>Age:</strong> {calculateAge(account.dob)}</MDBCardText>
        <MDBCardText><strong>Breed:</strong> {account.breed}</MDBCardText>
        <MDBCardText><strong>State:</strong> {NewState }</MDBCardText>
        <MDBCardText><strong>City:</strong> {NewCity}</MDBCardText>
        <MDBCardText><strong>Male/Female:</strong> {account.sex}</MDBCardText>
        <MDBCardText><strong>Owner Name:</strong> {account.owner_name}</MDBCardText>
        {/* <MDBCardText>
          Picture: <img src={account.picture} alt={account.title} />
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

export default AccountDetailPage;
