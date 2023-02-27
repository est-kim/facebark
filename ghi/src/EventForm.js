import React, {useState, useEffect}  from "react"
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';

function EventForm() {

    const [title, setTitle] = useState('');
    const [dog, setDog] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [start_time, setStart_time] = useState('');
    const [end_time, setEnd_time] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState('');
    const [account_id, setAccount_id] = useState('');
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedStateId, setSelectedStateId] = useState("");
    const [selectedCityId, setSelectedCityId] = useState("");

    const titleChangeHandler = (event) => { 
        setTitle(event.target.value)
    }
    const dogChangeHandler = (event) => {
        setDog(event.target.value)
    }
    const addressChangeHandler = (event) => {
        setAddress(event.target.value)
    }
    const dateChangeHandler = (event) => {
        setDate(event.target.value)
    }
    const start_timeChangeHandler = (event) => {
        setStart_time(event.target.value)
    }
    const end_timeChangeHandler = (event) => {
        setEnd_time(event.target.value)
    }
    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value)
    }
    const pictureChangeHandler = (event) => {
        setPicture(event.target.value)
    }
    const account_idChangeHandler = (event) => {
        setAccount_id(event.target.value)
    }

    useEffect(() => {
        fetch("http://localhost:8000/states")
        .then((response) => response.json())
        .then((data) => setStates(data))
        .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
    if (selectedStateId !== "") {
        fetch(`http://localhost:8000/cities/${selectedStateId}`)
          .then((response) => response.json())
          .then((data) => setCities(data));
    } else {
        setCities([]);
    }
    }, [selectedStateId]);

    const handleSubmit = async (event)=> {
        event.preventDefault();
        const data = {}
        data.title = title
        data.states_id = selectedStateId
        data.cities_id = selectedCityId
        data.dog_parks_id = dog
        data.address = address
        data.date = date
        data.start_time = start_time
        data.end_time = end_time
        data.description = description
        data.picture = picture
        data.account_id = account_id
        console.log(data)

        const eventUrl = "http://localhost:8000/events";

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers:
            {
                'Content-type': 'application/json',
            },
        };
        const response = await fetch(eventUrl, fetchConfig);
        console.log(response)
        if (response.ok) {
            //const newEvent = await response.json;
            
            setTitle('');
            setSelectedStateId('');
            setSelectedCityId('');
            setDog('');
            setAddress('');
            setDate('');
            setStart_time('');
            setEnd_time('');
            setDescription('');
            setPicture('');
            setAccount_id('');
            
        }
    }
    
    return (
        <form onSubmit={handleSubmit} >
            <div>
                <div className="form-floating mb-3">
                    <input onChange={titleChangeHandler} value={title} placeholder="Title" required type="text" name="title" id="title" className="form-control" />
                    <label htmlFor="title">Title</label>
                </div>
               
                <div >
                    <label htmlFor="states" className="form-control">choose your state</label>
                    <select id="states_id" name="states_id" value={selectedStateId || ""}
                        onChange={(event) =>setSelectedStateId(parseInt(event.target.value))
                        }required><option value="" disabled={true}>State</option>
                        {states.map((state) => ( <option key={state.id} value={state.id}>{state.name}</option>))}
                      </select>
                </div>

                <div >
                    <label htmlFor="cities" className="form-control">choose your city</label>
                    <select id="cities_id" name="cities_id" value={selectedCityId || ""} disabled={cities.length === 0}
                        onChange={(event) =>setSelectedCityId(parseInt(event.target.value))}><option value="" disabled={true}>
                        City</option>{cities.map((city) => (<option key={city.id} value={city.id}>{city.name}</option>
                        ))}
                      </select>
                </div>
                <div >
                            <input onChange={dogChangeHandler} value={dog} placeholder="Dog Park" type="text" name="dog" id="dog" className="form-control" />
                            {/* <label htmlFor="dog">dog park</label> */}
                </div>
                <div >
                            <input onChange={addressChangeHandler} value={address} placeholder="address" required type="text" name="address" id="address" className="form-control" />
                            {/* <label htmlFor="address">Address</label> */}
                </div>
                <div >
                            <input onChange={dateChangeHandler} value={date} placeholder="date" required type="date" name="date" id="date" className="form-control" />
                            {/* <label htmlFor="date">Date</label> */}
                </div>
                <div >
                            <input onChange={start_timeChangeHandler} value={start_time} placeholder="start_time" required type="text" name="start_time" id="start_time" className="form-control" />
                            {/* <label htmlFor="start_time">start_time</label> */}
                </div>
                <div >
                            <input onChange={end_timeChangeHandler} value={end_time} placeholder="end_time" required type="text" name="end_time" id="end_time" className="form-control" />
                            {/* <label htmlFor="end_time">end_time</label> */}
                </div>
                <div >
                            <input onChange={descriptionChangeHandler} value={description} placeholder="description" required type="text" name="description" id="description" className="form-control" />
                            {/* <label htmlFor="description">Description</label> */}
                </div>
                <div >
                            <input onChange={pictureChangeHandler} value={picture} placeholder="picture" required type="text" name="picture" id="picture" className="form-control" />
                            {/* <label htmlFor="picture">picture url</label> */}
                </div>
                <div >
                            <input onChange={account_idChangeHandler} value={account_id} placeholder="account_id" type="text" name="account_id" id="account_id" className="form-control" />
                            {/* <label htmlFor="account_id">account_id</label> */}
                </div>
            </div>
            <button className="btn btn-primary">Create</button>
            
        </form>
    )
}
export default EventForm;