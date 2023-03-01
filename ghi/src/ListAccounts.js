import React, {useEffect, useState} from "react"
import { Link } from "react-router-dom";
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


function AccountList() {

    const [state, setState] = useState("");
    const [states, setStates] = useState([]);
    const [city, setCity] = useState("");
    const [cities, setCities] = useState([]);
    const [account, setAccount] = useState("");
    const [accounts, setAccounts] = useState([]);

    const handleStateChange = (event) => {
        const value = event.target.value;
        setState(value);
        setCity("");
      }

    const handleCityChange = (event) => {
        const value = event.target.value;
        setCity(value);
      }

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
        fetch("http://localhost:8000/accounts")
        .then((response) => response.json())
        .then((data) => setAccounts(data))
        .catch((error) => console.log(error));
    }, []);

    let NewAccounts = []

    for (let a of accounts) {

        if (a["state_id"] == state) {

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

    console.log(FinalCities)

    let FinalAccounts = []

    for (let a of accounts) {

        if (state == "") {

            FinalAccounts = accounts
        }

        if (city == "") {

                if (a["state_id"] == state) {

                    FinalAccounts.push(a)
        }

        }

        if (a["state_id"] == state && a["city_id"] == city) {

            FinalAccounts.push(a)
        }
    }

    console.log(FinalAccounts)

    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '12px',
        margin: '8px',
        maxWidth: '400px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
    };

    const imgStyle = {
        height: '200px',
        width: '100%',
        objectFit: 'cover',
        marginBottom: '8px',
        borderRadius: '4px'
    };

    const headerStyle = {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '8px'
    };

    const bodyStyle = {
        fontSize: '14px'
    };

  return (
  <>
    <div className="row">
        <div className="offset-3 col-6">
          <div style={{ textAlign: 'center' }} className="shadow p-4 mt-4">
            <h1>Filter by Location</h1>
            <form id="create-account-form">

                <div className="mb-3">
                    <select onChange = {handleStateChange} value={state} required id="state" name="state" className="form-select">
                    <option value="">choose a state</option>
                    {states.map(state => {
                        return (
                        <option key={state.id} value={state.id}>
                        {state.name}
                        </option>
                        );
                        })}
                    </select>
                </div>

                <div className="mb-3">
                    <select onChange = {handleCityChange} value={city} required id="city" name="city" className="form-select">
                    <option value="">choose a city</option>
                    {FinalCities.map(city => {
                        return (
                        <option key={city.id} value={city.id}>
                        {city.name}
                        </option>
                        );
                        })}
                    </select>
                </div>

            </form>
          </div>
        </div>
      </div>
<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
  {FinalAccounts.map((account) => (
    <div style={cardStyle} key={account.id}>
      <img src={account.image_url} alt={account.name} style={imgStyle} />
      <Link to={`/accounts/${account.id}`} style={headerStyle}>{account.name}</Link>
      <div style={{ ...headerStyle, fontSize: '0.8em' }}>{account.breed}</div>
      <div style={bodyStyle}>{account.description}</div>
    </div>
  ))}
</div>
  </>
  );
}

export default AccountList;
