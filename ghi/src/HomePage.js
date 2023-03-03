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
import { useEffect, useState } from "react";
import { useAuthContext, getTokenInternal, useToken } from "./Authentication";

function HomePage() {
  const { setIsLoggedIn } = useAuthContext();
  const [accountId, setAccountId] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [token] = useToken();

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
        async function getAccountId() {
            const url = `http://localhost:8000/api/things`;
            const response = await fetch(url, { method: "GET", headers: { Authorization: `Bearer ${token}` } });
            if (response.ok) {
                const data = await response.json();
                setAccountId(data)
            }
        }
        getAccountId();
    }, [token]);


    useEffect(() => {
        async function getStatusesOfAccountsFollowing() {
            const url = `http://localhost:8000/feed/${accountId}`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setStatuses(data)
            }
        }
        getStatusesOfAccountsFollowing();
    }, [accountId, token]);

  return (
    <>
      <section className="home-feed">
        <h5 style={{ paddingLeft: "10px" }}>My Feed</h5>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Message</th>
                </tr>
            </thead>
            <tbody>
                {statuses.map(status => {
                    return (
                        <tr key={status.id} value={status.id}>
                        <td>
                            <img src={status.account_image_url} className="img-thumbnail shoes" width="200"></img> At {
                            new Date(status.time_stamp).toLocaleTimeString("en-US", {
                                hour: '2-digit',
                                minute: '2-digit'
                                })} on {
                            new Date(status.time_stamp).toLocaleDateString("en-US", {
                                month: '2-digit',
                                day: '2-digit',
                                year: '2-digit'
                                })} {status.name} posted: <br></br>"{status.status_text}"
                        </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
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
