import { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../AdminHeader";
import BookingStatusChangedCard from "./BookingStatusChangedCard";
import { Form, Container } from "react-bootstrap";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(`https://positive-shining-boat.glitch.me/api/getallbookings`)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the bookings!", error);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.RoomNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerStyle = {
    marginTop: "3rem",
    padding: "0 1rem",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "2rem",
  };

  const noBookingsMessageStyle = {
    marginTop: "2rem",
    color: "#777",
    textAlign: "center",
  };

  return (
    <>
      <AdminHeader />
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2>Manage Bookings</h2>
        </div>
        <Container>
          <Form>
            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                placeholder="Search by Room Number"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ width: "800px", margin: "0 auto" }}
              />
            </Form.Group>
          </Form>
        </Container>
        {filteredBookings.length > 0 ? (
          <div className="row">
            {filteredBookings.map((booking) => (
              <div className="col-md-4 mb-4" key={booking.BookingID}>
                <BookingStatusChangedCard booking={booking} />
              </div>
            ))}
          </div>
        ) : (
          <div style={noBookingsMessageStyle}>
            <h4>No bookings found</h4>
          </div>
        )}
      </div>
    </>
  );
}
