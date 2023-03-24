import {
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBRipple
} from "mdb-react-ui-kit";
import { useEffect, useState, useCallback } from "react";
import { useAuthContext, getTokenInternal, useToken } from "./Authentication";
import { useNavigate } from "react-router-dom";

function isStatusLiked(statusId, userId, likedStatusIds) {
  return likedStatusIds.some(
    (likedStatus) =>
      likedStatus.account_id === parseInt(userId) &&
      likedStatus.status_id === parseInt(statusId)
  );
}

function HomePage() {
  const { setIsLoggedIn } = useAuthContext();
  const [userId, setUserId] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [token] = useToken();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [likedStatuses, setLikedStatuses] = useState([]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      const token = await getTokenInternal();
      if (token) {
        navigate(-1);
      } else {
        navigate("/login");
      }
    };

    if (!getTokenInternal()) {
      checkAuthAndNavigate();
    }
  }, [navigate]);

  let NewStatuses = [];
  for (let s of statuses) {
    if (!s["status_text"].startsWith("<")) {
      NewStatuses.push(s);
    }
  }

  const handleAccountClick = (id) => {
    if (!setIsLoggedIn) {
      navigate("/signup");
    } else {
      navigate(`/accounts/${id}`);
    }
  };

  useEffect(() => {
    async function fetchLikedStatuses() {
      const url = `${process.env.REACT_APP_FACEBARK_API_HOST}/likes`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setLikedStatuses(data);
        const isLiked = data.some(
          (like) => like.account_id === parseInt(userId)
        );
        setLiked(isLiked);
      }
    }

    fetchLikedStatuses();
  }, [userId]);

  const handleLikeClick = async (event) => {
    event.preventDefault();
    const statusId = event.currentTarget.getAttribute("data-status-id");
    const data = {};
    data.status_id = statusId;
    data.account_id = userId;
    const eventUrl = `${process.env.REACT_APP_FACEBARK_API_HOST}/likes`;

    // Check if the current user has already liked the status
    const alreadyLiked = likedStatuses.some(
      (like) =>
        like.status_id === parseInt(statusId) &&
        like.account_id === parseInt(userId)
    );

    if (alreadyLiked) {
      // Disable the like button
      return;
    }

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const response = await fetch(eventUrl, fetchConfig);
      if (response.ok) {
        setLiked(true);

        // Get the updated like count for the status
        const likeCountResponse = await fetch(`${process.env.REACT_APP_FACEBARK_API_HOST}/likes/count/${statusId}`);
        const likeCountData = await likeCountResponse.json();
        const likeCount = likeCountData.count;

        // Update the liked statuses in the state
        const updatedLikedStatuses = [...likedStatuses];
        updatedLikedStatuses.push(data);

        setLikedStatuses(updatedLikedStatuses);
        const updatedStatuses = NewStatuses.map((status) => {
        if (status.id === parseInt(statusId) && !status.isLiked) {
          return {
            ...status,
            likes: likeCount, // Set the updated like count
            liked: true,
            isLiked: true,
          };
        } else {
          return status;
        }});
        setStatuses(updatedStatuses);
      } else {
        await response.json();
        setLiked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusesOfAccountsFollowing = useCallback(async () => {
    if (userId) {
      const url = `${process.env.REACT_APP_FACEBARK_API_HOST}/feed/${userId}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        // Check if the current user has liked each status
        const updatedStatuses = data.map((status) => {
          const isLiked = isStatusLiked(status.id, userId, likedStatuses);
          return {
            ...status,
            liked: isLiked,
            isLiked: isLiked,
          };
        });
        setStatuses(updatedStatuses);
        setLiked(updatedStatuses.some((status) => status.liked));
      }
    }
  }, [userId, likedStatuses]);

  useEffect(() => {
    getStatusesOfAccountsFollowing();
  }, [userId, token, likedStatuses, liked, getStatusesOfAccountsFollowing]);


  useEffect(() => {
    const fetchToken = async () => {
      const token = await getTokenInternal();
      if (token) {
        setIsLoggedIn(true);
      }
    };
    fetchToken();
  }, [setIsLoggedIn]);

  useEffect(() => {
    async function getUserId() {
      const url = `${process.env.REACT_APP_FACEBARK_API_HOST}/api/things`;
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setUserId(data);
      }
    }
    getUserId();
  }, [token]);

  useEffect(() => {
    async function getEventsInUserState() {
      if (userId) {
        const url = `${process.env.REACT_APP_FACEBARK_API_HOST}/feed/events/${userId}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        }
      }
    }
    getEventsInUserState();
  }, [userId, token]);



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
    paddingTop: "3px",
    paddingBottom: "0px",
    textAlign: "left",
  };

  return (
    <>
      <MDBRow>
        <MDBCol md="12">
          <section>
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
                      className="custom-card"
                      style={{
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
                              src={
                                status.account_image_url === "0"
                                  ? status.account_new_image
                                  : status.account_image_url
                              }
                              className="img-thumbnail profile pic"
                              style={{
                                height: "150px",
                                margin: "0 auto",
                                overflow: "hidden",
                                width: "150px",
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
                        className="container-padding"
                        style={{
                          width: "80%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "start",
                          margin: "10px",
                        }}
                      >
                        <MDBCardText
                          style={{
                            fontWeight: "bold",
                            fontSize: "1.0em",
                            marginBottom: "5px",
                            textAlign: "left",
                          }}
                        >
                          At{" "}
                          {new Date(
                            new Date(status.time_stamp) - 16 * 60 * 60 * 1000
                          ).toLocaleString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            timeZone: "America/Los_Angeles",
                          })}{" "}
                          on{" "}
                          {new Date(status.time_stamp).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                          , {status.name} posted:
                        </MDBCardText>
                        <MDBCardText style={{ textAlign: "start" }}>
                          {status.status_text}
                        </MDBCardText>
                        {status.status_image_url &&
                          /^http/.test(status.status_image_url) &&
                          ((/\.(gif|jpe?g|tiff|png|webp|bmp|jfif)$/i.test(
                            status.status_image_url
                          ) && (
                            <a
                              href={status.status_image_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={status.status_image_url}
                                className="img-thumbnail shoes"
                                alt="shoes"
                              />
                            </a>
                          )) ||
                            (/\.(mp4|webm|ogg|avi|mkv|mpg|mov)$/i.test(
                              status.status_image_url
                            ) && (
                              <video
                                src={status.status_image_url}
                                className="img-thumbnail shoes"
                                style={{
                                  width: "auto",
                                  height: "400px",
                                  marginTop: "0",
                                }}
                                controls
                              />
                            )))}
                        <MDBCardText
                          style={{
                            paddingLeft: "0px"
                          }}
                        >
                          <span
                            onClick={handleLikeClick}
                            data-status-id={status.id}
                            className="d-flex align-items-center"
                            style={{
                              cursor: "pointer",
                              height: "30px",
                              bottom: 0,
                            }}
                          >
                            {status.liked ? (
                              <MDBIcon
                                fas
                                icon="heart"
                                size="lg"
                                style={{
                                  color: "#FFA7A7",
                                  marginRight: "5px",
                                  verticalAlign: "middle",
                                }}
                              />
                            ) : (
                              <MDBIcon
                                far
                                icon="heart"
                                size="lg"
                                style={{
                                  color: "#FFA7A7",
                                  marginRight: "5px",
                                  verticalAlign: "middle",
                                }}
                              />
                            )}
                            <h5
                              className="m-0"
                              style={{
                                color: "#444444",
                                verticalAlign: "middle",
                              }}
                            >
                              {status.likes}
                            </h5>
                          </span>
                        </MDBCardText>
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
        </div>
      </section>
    </>
  );
}

export default HomePage;
