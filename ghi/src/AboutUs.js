import {
  MDBRow,
  MDBCol,
  MDBIcon
} from "mdb-react-ui-kit";
import EstherKim from "./images/EstherKim.jpeg";
import ConorMcCabe from "./images/ConorMcCabe.jpg";
import DamirRukavina from "./images/DamirRukavina.png";
import IsraelNavarrete from "./images/IsraelNavarrete.jpg";

function AboutUs() {

    return (
      <>
        <div
          className="list-bg"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            textAlign: "center",
            paddingBottom: "50px",
            paddingTop: "50px",
            paddingLeft: "30px",
            paddingRight: "30px",
            minHeight: "70vh",
          }}
        >
          <MDBRow style={{ width: "100%" }}>
            <MDBCol md="12">
              <h4 style={{marginBottom:"1.5rem"}}>Meet Our Team</h4>
            </MDBCol>
            <MDBCol md="3">
              <article className="aboutus">
                <div className="img-container">
                  <img src={ConorMcCabe} id="person-img" alt="" />
                </div>
                <h4 id="author" className="fs-5">
                  Conor McCabe
                </h4>
                <p style={{ marginBottom: "3px" }}>Co-Founder</p>
                <div>
                  <a
                    href="https://www.linkedin.com/in/conorbmccabe/"
                    className="m-3 text-reset"
                  >
                    <MDBIcon fab icon="linkedin" />
                  </a>
                  <a href="https://gitlab.com/cbm65" className="m-3 text-reset">
                    <MDBIcon fab icon="gitlab" />
                  </a>
                </div>
                <p style={{ marginTop: "0.8rem", fontSize: "0.9rem" }}>
                  Conor resides in Denver with his loyal dog, Pearl. A
                  former food truck owner, he is passionate about developing
                  software solutions that enrich people's lives and have a
                  positive impact on the world. In his leisure time, Conor
                  enjoys hitting the slopes for skiing, playing ping pong, and
                  participating in fantasy football.
                </p>
              </article>
            </MDBCol>
            <MDBCol md="3">
              <article className="aboutus">
                <div className="img-container">
                  <img src={DamirRukavina} id="person-img" alt="" />
                </div>
                <h4 id="author" className="fs-5">
                  Damir Rukavina
                </h4>
                <p style={{ marginBottom: "3px" }}>Co-Founder</p>
                <div>
                  <a
                    href="https://www.linkedin.com/in/damir-rukavina-mhsm-8363b6103/"
                    className="m-3 text-reset"
                  >
                    <MDBIcon fab icon="linkedin" />
                  </a>
                  <a
                    href="https://gitlab.com/damir.rukavina"
                    className="m-3 text-reset"
                  >
                    <MDBIcon fab icon="gitlab" />
                  </a>
                </div>
                <p style={{ marginTop: "0.8rem", fontSize: "0.9rem" }}>
                  Damir lives in Boulder, Colorado with his wife, their three
                  dogs, and four backyard chickens. He has a passion for
                  creating software applications that both improve people's
                  lives and make the world a better place. In his free time,
                  Damir enjoys playing guitar, watching NBA basketball, and
                  enjoying the outdoors.
                </p>
              </article>
            </MDBCol>
            <MDBCol md="3">
              <article className="aboutus">
                <div className="img-container">
                  <img src={EstherKim} id="person-img" alt="" />
                </div>
                <h4 id="author" className="fs-5">
                  Esther Kim
                </h4>
                <p style={{ marginBottom: "3px" }}>Co-Founder</p>
                <div>
                  <a
                    href="https://www.linkedin.com/in/kimesther117/"
                    className="m-3 text-reset"
                  >
                    <MDBIcon fab icon="linkedin" />
                  </a>
                  <a
                    href="https://github.com/est-kim"
                    className="m-3 text-reset"
                  >
                    <MDBIcon fab icon="github" />
                  </a>
                </div>
                <p style={{ marginTop: "0.8rem", fontSize: "0.9rem" }}>
                  Coming from a veterinary background with a deep passion for
                  software engineering, Esther finds fulfillment in building
                  applications that foster joy for all users and leave a
                  positive impact on their lives. In her free time, Esther
                  enjoys trying new restaurants, playing pickleball, and going
                  to music festivals.
                </p>
              </article>
            </MDBCol>
            <MDBCol md="3">
              <article className="aboutus">
                <div className="img-container">
                  <img src={IsraelNavarrete} id="person-img" alt="" />
                </div>
                <h4 id="author" className="fs-5">
                  Israel Navarette
                </h4>
                <p style={{ marginBottom: "3px" }}>Co-Founder</p>
                <div>
                  <a
                    href="https://www.linkedin.com/in/israel-navarrete-079666112/"
                    className="m-3 text-reset"
                  >
                    <MDBIcon fab icon="linkedin" />
                  </a>
                  <a
                    href="https://gitlab.com/i.navarrete"
                    className="m-3 text-reset"
                  >
                    <MDBIcon fab icon="gitlab" />
                  </a>
                </div>
                <p style={{ marginTop: "0.8rem", fontSize: "0.9rem" }}>
                  From sunny California, Israel enjoys the year round motorcycle
                  weather, but his true passion is in teaching. He spends his
                  free time volunteering as a math tutor and mentoring at-risk
                  youth with a local non-profit. He strives to empower children
                  by teaching them how to leverage technology for positive
                  change.
                </p>
              </article>
            </MDBCol>
          </MDBRow>
        </div>
      </>
    );
};

export default AboutUs;
