import { MDBSpinner } from "mdb-react-ui-kit";

export default function App() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <MDBSpinner role="status">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    </div>
  );
}
