import React, {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useAuthContext, useToken, getTokenInternal } from "./Authentication";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBRipple,
  MDBCardText,
  MDBInput,
  MDBBtn
} from "mdb-react-ui-kit";


function AccountList() {
    const [state, setState] = useState("");
    const [states, setStates] = useState([]);
    const [city, setCity] = useState("");
    const [cities, setCities] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const { setIsLoggedIn } = useAuthContext();
    const navigate = useNavigate();
    const [token] = useToken();
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
      const value = event.target.value;
      setName(value);
    };
    const handleSubmit = async (event) => {
      event.preventDefault(false);
      const data = accounts.filter((account) =>
        account.name.includes(name)
      );
      setAccounts(data);
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

    const handleStateChange = (event) => {
        const value = event.target.value;
        setState(value);
        setCity("");
      }

    const handleCityChange = (event) => {
        const value = event.target.value;
        setCity(value);
      }

    const handleAccountClick = (id) => {
        if (!setIsLoggedIn) {
            navigate("/signup");
        } else {
            navigate(`/accounts/${id}`);
        }
    };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_FACEBARK_API_HOST}/states`)
        .then((response) => response.json())
        .then((data) => setStates(data))
        .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_FACEBARK_API_HOST}/cities`)
        .then((response) => response.json())
        .then((data) => setCities(data))
        .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_FACEBARK_API_HOST}/accounts`)
        .then((response) => response.json())
        .then((data) => {
            setAccounts(data);
            setLoading(false);
        })
        .catch((error) => console.log(error));
    }, []);

    if (loading) {
    return <Spinner />;
    }

    let NewAccounts = []
    for (let a of accounts) {
        if (a["state_id"] === parseInt(state)) {
            NewAccounts.push(a)
        }
    }

    let NewCities = []
    for (let a of NewAccounts) {
            NewCities.push(a["city_id"])
        }

    let FinalCities = []
    for (let c of cities)
        if (NewCities.includes(c["id"]))
            FinalCities.push(c)
    // console.log(FinalCities)

    let FinalAccounts = []
    for (let a of accounts) {
        // console.log("STATE TYPEEEE:", state)
        if (state === "") {
            FinalAccounts = accounts
        }
        if (city === "") {
                if (a["state_id"] === parseInt(state)) {
                    FinalAccounts.push(a)
                }
        }

        if (a["state_id"] === parseInt(state) && a["city_id"] === parseInt(city)) {
            FinalAccounts.push(a)
        }
    }

    // console.log(FinalAccounts)

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
        // cursor: setIsLoggedIn ? "pointer" : "default"
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
        fontSize: "12px",
        marginTop: "1px",
        paddingBottom: "4px",
        fontStyle: "italic",
    };

    function extractFirstSentence(str) {
      let sentenceEnd = str.search(/[.!]/);
      if (sentenceEnd === -1) {
        return str;
      }
      return str.substring(0, sentenceEnd + 1);
    }

  return (
    <>
      <div className="list-bg" style={{ paddingBottom: "50px" }}>
        <div
          className="row"
          style={{ paddingBottom: "20px", paddingTop: "10px" }}
        >
          <div className="offset-3 col-6">
            <div
              style={{
                textAlign: "center",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                borderRadius: "3px",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
              className="shadow p-4 mt-4"
            >
              <h5>Sniff Out Other Dogs </h5>
              <form id="create-account-form">
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
                    {FinalCities.map((city) => {
                      return (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </form>
              <form onSubmit={handleSubmit} id="create-account-form">
                <div className="form-floating mb-3">
                  <MDBInput
                    onChange={handleNameChange}
                    value={name}
                    label="Enter name"
                    type="text"
                    name="name"
                    id="name"
                    size="lg"
                    className="form-control"
                  />
                </div>
                <MDBBtn
                  style={{
                    margin: "10px",
                    backgroundColor: "#9ecdc6",
                    fontSize: "15px",
                    padding: "5px 15px",
                    boxShadow: "2px 2px 4px #888888",
                    textTransform: "none",
                  }}
                >
                  Search
                </MDBBtn>
              </form>
            </div>
          </div>
        </div>
        <br></br>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {FinalAccounts.map((account) => (
            <MDBCard
              style={{
                ...cardStyle,
              }}
              key={account.id}
              onClick={() => {
                if (token && setIsLoggedIn) {
                  handleAccountClick(account.id);
                } else {
                  navigate("/signup");
                }
              }}
            >
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image
            hover-overlay"
              >
                <MDBCardImage
                  src={
                    account.new_image === "0"
                      ? account.image_url
                      : account.new_image
                  }
                  alt={account.name}
                  style={imgStyle}
                />
                <span>
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </span>
              </MDBRipple>
              <MDBCardBody style={{ padding: "3px" }}>
                <MDBCardTitle style={headerStyle}>{account.name}</MDBCardTitle>
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
                  "{extractFirstSentence(account.description)}"
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          ))}
        </div>
      </div>
    </>
  );
}

export default AccountList;
