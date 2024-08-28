import { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../AdminHeader";
import BookingAdminCard from "./BookingAdminCard";
import { Button, Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function BookingAdminAccepted() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://positive-shining-boat.glitch.me/api/getbookings/Approved`)
      .then((response) => {
        setBookings(response.data);
        setFilteredBookings(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the bookings!", error);
      });
  }, []);

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setSearchTerm(searchQuery);
    const filtered = bookings.filter((booking) =>
      booking.RoomNo.toLowerCase().includes(searchQuery)
    );
    setFilteredBookings(filtered);
  };

  const containerStyle = {
    marginTop: "3rem",
    padding: "0 1rem",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "2rem",
  };

  const searchContainerStyle = {
    display: "flex",
    justifyContent: "center",
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
          <h2>Approved Bookings</h2>
        </div>
        <div style={searchContainerStyle}>
          <Form className="d-flex">
            <FormControl
              type="text"
              placeholder="Search by Room Number"
              value={searchTerm}
              onChange={handleSearch}
              style={{ width: "800px" }}
            />
          </Form>
        </div>
        {filteredBookings.length > 0 ? (
          <div className="row">
            {filteredBookings.map((booking) => (
              <div className="col-md-4 mb-4" key={booking.BookingID}>
                <BookingAdminCard booking={booking} />
              </div>
            ))}
          </div>
        ) : (
          <div style={noBookingsMessageStyle}>
            <h4>No Approved bookings found</h4>
          </div>
        )}
        <div className="text-center mt-4 mb-4">
          <Button
            variant="primary"
            onClick={() => navigate("/admin/dashboard")}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </>
  );
}
