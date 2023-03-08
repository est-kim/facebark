import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <MDBFooter
      style={{ backgroundColor: "#fcdc8c", bottom: "0", width: "100%" }}
      className="text-center text-lg-start text-muted"
    >
      <section className="d-flex justify-content-center justify-content-md-between pt-1 pb-0 border-bottom">
        <MDBContainer className="text-center text-md-start mt-1">
          <MDBRow className="mt-3">
            <MDBCol
              md="3"
              lg="4"
              xl="3"
              className="mx-auto mb-4"
              style={{ color: "#FFFFFF" }}
            >
              <h6 className=" fw-bold mb-3" style={{ color: "#FFFFFF" }}>
                FaceBark &nbsp;
                <MDBIcon fas icon="dog" />
              </h6>
              <p style={{ fontSize: "13px" }} className="mb-3">
                Pawsome connections, one bark at a time.
              </p>
              <div>
                <a href="/" className="me-4 text-reset">
                  <MDBIcon fab icon="facebook-f" />
                </a>
                <a href="/" className="me-4 text-reset">
                  <MDBIcon fab icon="twitter" />
                </a>
                <a href="/" className="me-4 text-reset">
                  <MDBIcon fab icon="google" />
                </a>
                <a href="/" className="me-4 text-reset">
                  <MDBIcon fab icon="instagram" />
                </a>
                <a href="/" className="me-4 text-reset">
                  <MDBIcon fab icon="linkedin" />
                </a>
              </div>
            </MDBCol>

            <MDBCol
              md="2"
              lg="2"
              xl="2"
              className="mx-auto mb-4"
              style={{ color: "#FFFFFF" }}
            >
              <h6 className="fw-bold mb-2">Furiends</h6>
              <p className="mb-1">
                <Link
                  to="/followinglist"
                  className="text-reset"
                  style={{ fontSize: "13px", textDecoration: "none" }}
                >
                  Following
                </Link>
              </p>
              <p className="mb-1">
                <Link
                  to="/followers"
                  className="text-reset"
                  style={{ fontSize: "13px", textDecoration: "none" }}
                >
                  My Followers
                </Link>
              </p>
            </MDBCol>

            <MDBCol
              md="2"
              lg="2"
              xl="2"
              className="mx-auto mb-4"
              style={{ color: "#FFFFFF" }}
            >
              <h6 className="fw-bold mb-2">Events</h6>
              <p className="mb-1">
                <Link
                  to="/events"
                  className="text-reset"
                  style={{ fontSize: "13px", textDecoration: "none" }}
                >
                  Events Near Me
                </Link>
              </p>
              <p className="mb-1">
                <Link
                  to="/events/new"
                  className="text-reset"
                  style={{ fontSize: "13px", textDecoration: "none" }}
                >
                  New Event
                </Link>
              </p>
            </MDBCol>
            <MDBCol
              md="4"
              lg="3"
              xl="3"
              className="mx-auto mb-md-0 mb-4"
              style={{ color: "#FFFFFF" }}
            >
              <h6 className="fw-bold mb-2">Contact Us</h6>
              <p style={{ fontSize: "13px" }} className="mb-1">
                <MDBIcon icon="home" /> &nbsp;101 Dalmation Drive
                <br></br>
                Pooch Park, California 92620
              </p>
              <p style={{ fontSize: "13px" }} className="mb-1">
                <MDBIcon icon="phone" /> &nbsp;+ 1 (123) 456-7890
              </p>
              <p style={{ fontSize: "13px" }} className="mb-1">
                <MDBIcon icon="print" /> &nbsp;+ 1 (123) 456-7891
              </p>
              <p style={{ fontSize: "13px" }} className="mb-2">
                <MDBIcon fas icon="fax" />
                &nbsp; info@facebark.com
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-1"
        style={{ backgroundColor: "#f0eeeb", fontSize: "11px" }}
      >
        © 2023 Copyright: FaceBark
      </div>
    </MDBFooter>
  );
}

export default Footer;
