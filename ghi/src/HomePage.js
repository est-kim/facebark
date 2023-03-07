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
  const [token] = useToken();
  const navigate = useNavigate();
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


  useEffect(() => {
        async function getStatusesOfAccountsFollowing() {
            const url = `http://localhost:8000/feed/${userId}`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setStatuses(data)
            }
        }
        getStatusesOfAccountsFollowing();
    }, [userId, token]);


  useEffect(() => {
        async function getEventsInUserState() {
            const url = `http://localhost:8000/feed/events/${userId}`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setEvents(data)
            }
        }
        getEventsInUserState();
    }, [userId, token]);


  let NewStatuses = [];
  for (let s of statuses) {
    if (!s["status_text"].startsWith("<")) {
      NewStatuses.push(s);
    }
  }


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
                        {status.account_image_url && (
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
                              src={status.account_image_url}
                              className="img-thumbnail profile pic"
                              style={{
                                width: "150px",
                                margin: "0 auto",
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
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "start",
                          padding: "10px",
                          margin: "10px",
                        }}
                      >
                        <MDBCardText style={{ fontWeight: "bold", fontSize: "1.0em", marginBottom: "5px", textAlign: "center" }}>
                At {
                            new Date(new Date(status.time_stamp) - 16 * 60 * 60 * 1000).toLocaleString("en-US", {
                                hour: '2-digit',
                                minute: '2-digit',
                                timeZone: "America/Los_Angeles",
                                })} on {
                            new Date(status.time_stamp).toLocaleDateString("en-US", {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                })}, {status.name} posted:
              </MDBCardText>
                        <MDBCardText style={{ textAlign: "start" }}>
                          {status.status_text}
                        </MDBCardText>
                        {status.status_image_url && /^http/.test(status.status_image_url) && (
                          <img
                            src={status.status_image_url}
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
                {events.slice(0, 4).map((event) => (
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
