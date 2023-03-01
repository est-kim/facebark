import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCardImage
} from "mdb-react-ui-kit";
import { useEffect } from "react";
import { useAuthContext, getTokenInternal } from "./Authentication";

function HomePage() {
  const { setIsLoggedIn } = useAuthContext();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getTokenInternal();
      if (token) {
        setIsLoggedIn(true);
      }
    };
    fetchToken();
  }, []);

  return (
    <>
      <section className="home-feed">
        <h5 style={{ paddingLeft: "10px" }}>My Feed</h5>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div
              className="bg-image hover-overlay shadow-1-strong rounded ripple"
              data-mdb-ripple-color="light"
            >
              <img
                src="https://mdbootstrap.com/img/new/standard/nature/023.jpg"
                className="img-fluid"
                alt=""
              />
              <a href="#!">
                <div
                  className="mask"
                  style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                ></div>
              </a>
            </div>
          </div>

          <div className="col-md-8 mb-4">
            <h5>Very long post title</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus ratione necessitatibus itaque error alias repellendus
              nemo reiciendis aperiam quisquam minus ipsam reprehenderit commodi
              ducimus, in dicta aliquam eveniet dignissimos magni.
            </p>

            <MDBBtn color="primary">Read</MDBBtn>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-4">
            <div
              className="bg-image hover-overlay shadow-1-strong rounded ripple"
              data-mdb-ripple-color="light"
            >
              <img
                src="https://mdbootstrap.com/img/new/standard/nature/111.jpg"
                className="img-fluid"
                alt=""
              />
              <a href="#!">
                <div
                  className="mask"
                  style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                ></div>
              </a>
            </div>
          </div>

          <div className="col-md-8 mb-4">
            <h5>Very long post title</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus ratione necessitatibus itaque error alias repellendus
              nemo reiciendis aperiam quisquam minus ipsam reprehenderit commodi
              ducimus, in dicta aliquam eveniet dignissimos magni.
            </p>

            <MDBBtn color="primary">Read</MDBBtn>
          </div>
        </div>
      </section>
      <section className="home-events">
        <h5 style={{ paddingLeft: "10px" }}>Events</h5>
        <MDBRow className="row-cols-1 row-cols-md-4 g-4">
          <MDBCol>
            <MDBCard>
              <MDBCardImage
                src="https://mdbootstrap.com/img/new/standard/city/041.webp"
                alt="..."
                position="top"
              />
              <MDBCardBody>
                <MDBCardTitle>Card title</MDBCardTitle>
                <MDBCardText>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol>
            <MDBCard>
              <MDBCardImage
                src="https://mdbootstrap.com/img/new/standard/city/042.webp"
                alt="..."
                position="top"
              />
              <MDBCardBody>
                <MDBCardTitle>Card title</MDBCardTitle>
                <MDBCardText>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol>
            <MDBCard>
              <MDBCardImage
                src="https://mdbootstrap.com/img/new/standard/city/043.webp"
                alt="..."
                position="top"
              />
              <MDBCardBody>
                <MDBCardTitle>Card title</MDBCardTitle>
                <MDBCardText>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol>
            <MDBCard>
              <MDBCardImage
                src="https://mdbootstrap.com/img/new/standard/city/044.webp"
                alt="..."
                position="top"
              />
              <MDBCardBody>
                <MDBCardTitle>Card title</MDBCardTitle>
                <MDBCardText>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </section>
    </>
  );

}

export default HomePage;
