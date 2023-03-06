import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCardImage,
  MDBRipple
} from "mdb-react-ui-kit";
import { useEffect, useState, useRef } from "react";
import { useAuthContext, getTokenInternal, useToken } from "./Authentication";
import { useNavigate } from "react-router-dom";


function HomePage() {
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();
  const [userId, setUserId] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [status, setStatus] = useState([]);
  const [token] = useToken();
  const [account, setAccount] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState([]);
  const navigate = useNavigate();
  const [event, setEvent] = useState("");
  const [events, setEvents] = useState([]);
  const carouselRef = useRef(null);

  const handleAccountClick = (id) => {
      if (!setIsLoggedIn) {
          navigate("/signup");
      } else {
          navigate(`/accounts/${id}`);
      }
  };

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
      const response = await fetch(url, { method: "GET", headers: { Authorization: `Bearer ${token}` } });
      if (response.ok) {
          const data = await response.json();
          setUserId(data)
      }
    }
        getUserId();
  }, [token]);

  // console.log("DATAAAAAA USERRRR", (typeof userId))

  useEffect(() => {
    const url = `http://localhost:8000/accounts/${userId}`;
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
  }, [userId, isLoggedIn, token]);

  // console.log("THIS DA ACCOUNT DATAAA", accountData)

  useEffect(() => {
      fetch("http://localhost:8000/statuses")
      .then((response) => response.json())
      .then((data) => {
          setStatuses(data);
          setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
      fetch("http://localhost:8000/accounts")
      .then((response) => response.json())
      .then((data) => {
          setAccounts(data);
          setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
      fetch("http://localhost:8000/following")
      .then((response) => response.json())
      .then((data) => {
          setFollowing(data);
          setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
      fetch("http://localhost:8000/events")
      .then((response) => response.json())
      .then((data) => {
          setEvents(data);
          setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  let NewFollowing = [];
  for (let f of following) {
    if (f["follower_id"] == userId) {
      NewFollowing.push(f["followee_id"]);
    };
  };

  // console.log(NewFollowing)
  // console.log(userId)
  // console.log(following)

  let NewStatuses = [];
  for (let s of statuses) {
    if(NewFollowing.includes(s["account_id"])) {
      NewStatuses.push(s);
    };
  };
  console.log("NEWSTATTUSSESS:", NewStatuses)

  let NewPics = {};
  for(let a of accounts) {
    if(NewFollowing.includes(a["id"])) {
      NewPics[a["id"]] = a["image_url"];
    };
  };
  // console.log(NewPics)

  for (let n of NewStatuses) {
    if(n["account_id"] in NewPics) {
      n["picture"] = NewPics[n["account_id"]];
    };
  };
  // console.log(NewStatuses)



  let UserState = ""
  for (let a of accounts) {
    if(a["id"] == userId) {
      UserState = a["state_id"];
    };
  };
  // console.log(UserState)

  let NewEvents = []
  for (let e of events) {
    if(e["states_id"] == UserState) {
      NewEvents.push(e);
    };
  };

  // console.log(NewEvents)

  const cardStyle = {
    margin: "10px",
    height: "375px",
    borderRadius: "8px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 5px 0",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  };

  const imgStyle = {
    height: "180px",
    width: "100%",
    objectFit: "cover",
    objectPosition: "bottom",
    marginTop: "12px",
    marginBottom: "2px",
  };

  const headerStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0px",
    padding: "0px",
    marginBottom: "0px",
    paddingTop: "5px",
  };

  const bodyStyle = {
    fontSize: "12px",
    marginTop: "1px",
    padding: "0px",
    paddingBottom: "0px",
  };

  return (
    <>
      <MDBRow>
        <MDBCol md="12">
          <section
            // className="list-bg"
          >
            <MDBCard>
              <MDBCardBody className="list-bg">
                <h4 style={{ fontWeight: "bold" }}>My Feed</h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "600px",
                    overflow: "auto",
                  }}
                >
                  {NewStatuses.map((status) => (
                    <MDBCard
                      style={{
                        width: "80%",
                        // height: "320px",
                        margin: "5px",
                        padding: "5px",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                        borderRadius: "5px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "start",
                        justifyContent: "start",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                      }}
                      key={status.id}
                    >
                      <div
                        style={{
                          width: "20%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {status.picture && (
                          <MDBRipple
                            rippleColor="light"
                            rippleTag="div"
                            className="bg-image hover-overlay"
                            onClick={() => {
                              if (token && setIsLoggedIn) {
                                handleAccountClick(status.account_id);
                              } else {
                                navigate("/signup");
                              }
                            }}
                          >
                            <MDBCardImage
                              src={status.picture}
                              className="img-thumbnail profile pic"
                              // style={{ width: "100%", height: "auto" }}
                              style={{
                                width: "150px",
                                margin: "0 auto",
                                // display: "grid",
                                // borderRadius: "100px",
                                overflow: "hidden",
                                height: "150px",
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                              alt="dog profile picture"
                            />
                            <span>
                              <div
                                className="mask"
                                style={{
                                  backgroundColor: "rgba(251, 251, 251, 0.15)",
                                }}
                              ></div>
                            </span>
                          </MDBRipple>
                        )}
                      </div>
                      <div
                        style={{
                          width: "80%",
                          // marginLeft: "10px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "start",
                          padding: "10px",
                          margin: "10px",
                        }}
                      >
                        <MDBCardText
                          style={{
                            fontWeight: "bold",
                            fontSize: "15px",
                            marginBottom: "5px",
                            textAlign: "start",
                          }}
                        >
                          On {new Date(
                            new Date(status.time_stamp) - 16 * 60 * 60 * 1000
                          ).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                            timeZone: "America/Los_Angeles",
                          })}, {status.name} posted:
                        </MDBCardText>
                        <MDBCardText style={{ textAlign: "start" }}>
                          {status.status_text}
                        </MDBCardText>
                        {status.image_url && /^http/.test(status.image_url) && (
                          <img
                            src={status.image_url}
                            className="img-thumbnail shoes"
                            style={{
                              width: "auto",
                              height: "200px",
                              marginTop: "0",
                            }}
                            alt=""
                          />
                        )}
                      </div>
                    </MDBCard>
                  ))}
                </div>
              </MDBCardBody>
            </MDBCard>
          </section>
        </MDBCol>
      </MDBRow>
      <section
        className="home-events pb-5 pt-2"
        style={{ backgroundColor: "#e7f7f5" }}
      >
        <h4
          style={{
            paddingLeft: "24px",
            paddingTop: "24px",
            fontWeight: "bold",
          }}
        >
          Events in My Area
        </h4>
        <div className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row">
                {NewEvents.slice(0, 4).map((event) => (
                  <div className="col-md-3" key={event.id}>
                    <MDBCard style={cardStyle}>
                      {event.picture && (
                        <MDBRipple
                          rippleColor="light"
                          rippleTag="div"
                          className="bg-image hover-overlay"
                          style={{ width: "100%" }}
                          onClick={() => navigate(`/events/${event.id}`)}
                        >
                          <MDBCardImage
                            src={event.picture}
                            alt="..."
                            position="top"
                            style={imgStyle}
                          />
                          <span>
                            <div
                              className="mask"
                              style={{
                                backgroundColor: "rgba(251, 251, 251, 0.15)",
                              }}
                            ></div>
                          </span>
                        </MDBRipple>
                      )}
                      <MDBCardBody>
                        <MDBCardTitle style={headerStyle}>
                          {event.title}
                        </MDBCardTitle>
                        <MDBCardText style={bodyStyle}>
                          {event.description}
                        </MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </div>
                ))}
              </div>
            </div>
            {/* {NewEvents.slice(4).map((event, index) => (
              <div className="carousel-item" key={index}>
                <div className="row d-flex justify-content-center">
                  <div className="col-md-3">
                    <MDBCard style={cardStyle}>
                      {event.picture && (
                        <MDBRipple
                          rippleColor="light"
                          rippleTag="div"
                          className="bg-image hover-overlay"
                          onClick={() => navigate(`/events/${event.id}`)}
                        >
                          <MDBCardImage
                            src={event.picture}
                            alt="..."
                            position="top"
                            style={imgStyle}
                          />
                          <span>
                            <div
                              className="mask"
                              style={{
                                backgroundColor: "rgba(251, 251, 251, 0.15)",
                              }}
                            ></div>
                          </span>
                        </MDBRipple>
                      )}
                      <MDBCardBody>
                        <MDBCardTitle style={headerStyle}>
                          {event.title}
                        </MDBCardTitle>
                        <MDBCardText style={bodyStyle}>
                          {event.description}
                        </MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </div>
                </div>
              </div>
            ))} */}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target=".carousel"
            data-bs-slide="1"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target=".carousel"
            data-bs-slide="1"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
    </>
  );

}

export default HomePage;
