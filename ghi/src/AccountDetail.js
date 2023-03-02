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

function AccountDetailPage() {

  const { isLoggedIn, setIsLoggedIn } = useAuthContext();
  const { accountId } = useParams();
  const [account, setAccount] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [state, setState] = useState("");
  const [states, setStates] = useState([]);
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [token] = useToken();
  const [status, setStatus] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ userId, setUserId] = useState("");

  console.log("TOKEN IN ACCOUNT DETAIL: ", token)
  console.log("SET IS LOGGED IN: ", isLoggedIn)

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getTokenInternal();
      if (token) {
        setIsLoggedIn(true);
      }
    };
    fetchToken();
  }, []);

  console.log("TOKEN IN ACCOUNT DETAIL: ", token)
  console.log("SET IS LOGGED IN: ", isLoggedIn)
  console.log("UserId: ", userId)
  console.log("AccountId: ", accountId)


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
      fetch("http://localhost:8000/statuses")
      .then((response) => response.json())
      .then((data) => setStatuses(data))
      .catch((error) => console.log(error));
  }, []);

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



  // useEffect(() => {
  //   fetch(`http://localhost:8000/accounts/${accountId}`)
  //     .then((response) => response.json())
  //     .then((data) => setAccount(data))
  //     .catch((error) => console.log(error));
  // }, []);

  useEffect(() => {
    const url = `http://localhost:8000/accounts/${accountId}`;
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
        setAccount(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (token && isLoggedIn) {
      fetchData();
    }
  }, [accountId, isLoggedIn, token]);

  if (loading) {
    return <Spinner />;
  }

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

      const cardStyle = {
      maxWidth: '400px',
      width: '100%',
      margin: '10px',
      padding: '10px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '5px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    };

    const imgStyle = {
      maxWidth: '100%',
      maxHeight: '200px',
      objectFit: 'contain',
      marginBottom: '10px',
    };

    const headerStyle = {
      fontSize: '1.2em',
      fontWeight: 'bold',
      marginBottom: '10px',
      textAlign: 'center',
    };

    const bodyStyle = {
      fontSize: '1em',
      textAlign: 'justify',
    };

    const timeStampStyle = {
      fontSize: '0.8em',
      fontWeight: 'bold',
      marginBottom: '0.5em',
    };

    let NewStatuses = []

    for (let s of statuses)

        if (s["account_id"] == accountId)

          NewStatuses.push(s)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.follower_id = userId;
        data.followee_id = accountId;

        console.log(data);

        const eventUrl = "http://localhost:8000/following";

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

        }
      };

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
        <form onSubmit={handleSubmit}>
          <MDBBtn color="warning" className="me-2" type="submit">
            Follow <MDBIcon icon="edit" className="ms-1" />
          </MDBBtn>
        </form>
        </MDBCardFooter>
      </MDBCardBody>
    </MDBCard>

    {NewStatuses.length > 0 && (
      <div className="mt-4">
        <h2 style={{ textAlign: 'center' }}>My Pupdates!</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          {NewStatuses.map((status) => (
            <div style={cardStyle} key={status.id}>
              <div style={timeStampStyle}>{new Date(status.time_stamp).toLocaleString()}</div>
              <div style={bodyStyle}>{status.status_text}</div>
            </div>
          ))}
        </div>
      </div>
    )}

  </MDBCol>
</MDBRow>


  );
}

export default AccountDetailPage;
