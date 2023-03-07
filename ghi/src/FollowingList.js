import React, { useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBRipple,
  MDBCardText,
  MDBRow,
  MDBCol
} from "mdb-react-ui-kit";
import "./list-bgs.css";
import { useAuthContext, useToken } from "./Authentication";
import { useNavigate } from "react-router-dom";

function FollowingList() {
  const [accountId, setAccountId] = useState("");
  const [following, setFollowing] = useState([]);
  const [token] = useToken();
  const [accounts, setAccounts] = useState([]);
  const { setIsLoggedIn } = useAuthContext();
  const navigate = useNavigate();


  const handleAccountClick = (id) => {
    if (!setIsLoggedIn) {
        navigate("/signup");
    } else {
        navigate(`/accounts/${id}`);
    }
  };

  useEffect(() => {
      async function getAccountId() {
          const url = `http://localhost:8000/api/things`;
          const response = await fetch(url, { method: "GET", headers: { Authorization: `Bearer ${token}` } });
          if (response.ok) {
              const data = await response.json();
              console.log("this should be the accountdsf array  id:", data)
              setAccountId(data)
          }
      }
      getAccountId();
  }, [token]);


  useEffect(() => {
      async function getAccountsFollowing() {
          const url = 'http://localhost:8000/following';
          const response = await fetch(url);
          if (response.ok) {
              const data = await response.json();
              setFollowing(data)
          }
      }
      getAccountsFollowing();
  }, []);

  useEffect(() => {
      fetch("http://localhost:8000/accounts")
      .then((response) => response.json())
      .then((data) => {
          setAccounts(data);
      })
      .catch((error) => console.log(error));
  }, []);

  let newIds =[];
  for (let f of following) {
    if (f["follower_id"] === accountId) {
      newIds.push(f["followee_id"]);
    };
  };

  let NewAccounts = [];
  for (let a of accounts) {
    if (newIds.includes(a["id"])) {
      NewAccounts.push(a);
    };
  };

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #ccc',
    borderRadius: '4px',
    paddingTop: '10px',
    margin: '8px',
    marginTop: '10px',
    width: '275px',
    height: '334px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const imgStyle = {
      height: '250px',
      width: '250px',
      objectFit: 'cover',
      marginTop: '12px',
      marginBottom: '8px',
      borderRadius: '0.5px'
  };

  const headerStyle = {
      fontSize: '18px',
      fontWeight: 'bold',
      marginTop: '0px',
      marginBottom: '0px',
      paddingTop: '5px'
  };

  const bodyStyle = {
      fontSize: '12px',
      marginTop: '1px',
      paddingBottom: '4px'
  };

  return (
    <>
      <div
        className="list-bg"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          paddingBottom: "50px",
          paddingTop: "50px",
          paddingLeft: "30px",
          paddingRight: "30px",
          // height: "600px",
        }}
      >
        <MDBRow>
          <MDBCol md="12">
            <h4>Here are all the dog butts you sniff on the regular :</h4>
          </MDBCol>
          {/* <MDBRow> */}
          <MDBCol md="12">
            {NewAccounts.map((account) => (
              <MDBCard
                style={{
                  ...cardStyle,
                }}
                key={account.id}
              >
                <MDBRipple
                  rippleColor="light"
                  rippleTag="div"
                  className="bg-image hover-overlay"
                  onClick={() => {
                    if (token && setIsLoggedIn) {
                      handleAccountClick(account.id);
                    } else {
                      navigate("/signup");
                    }
                  }}
                >
                  <MDBCardImage
                    src={account.image_url}
                    alt={account.name}
                    style={imgStyle}
                  />
                  <a href={`${account.id}`}>
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                    ></div>
                  </a>
                </MDBRipple>
                <MDBCardBody style={{ padding: "3px" }}>
                  <MDBCardTitle style={headerStyle}>
                    {account.name}
                  </MDBCardTitle>
                  <div
                    style={{
                      ...headerStyle,
                      fontSize: "0.8em",
                      fontWeight: "normal",
                    }}
                  >
                    {account.breed}
                  </div>
                  <MDBCardText style={bodyStyle}>
                    "{account.description}"
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            ))}
          </MDBCol>
          {/* </MDBRow> */}
        </MDBRow>
      </div>
    </>
  );
}

export default FollowingList;
