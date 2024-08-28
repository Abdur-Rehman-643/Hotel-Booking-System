import { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../AdminHeader";
import BookingReviewCard from "./BookingReviewCard";
import { Form, FormControl, Container, Row, Col } from "react-bootstrap";

export default function Review() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(`https://positive-shining-boat.glitch.me/api/getallbookings`)
      .then((response) => {
        const reviewedBookings = response.data.filter(
          (booking) => booking.Rating !== null && booking.ReviewText
        );
        setBookings(reviewedBookings);
        setFilteredBookings(reviewedBookings);
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
  };

  const headerContainerStyle = {
    textAlign: "center",
    marginBottom: "2rem",
  };

  const searchContainerStyle = {
    textAlign: "center",
    marginBottom: "2rem",
  };

  const noBookingsMessageStyle = {
    marginTop: "2rem",
    color: "#777",
    textAlign: "center",
  };

  const reviewListContainerStyle = {
    marginTop: "2rem",
  };

  return (
    <>
      <AdminHeader />
      <Container style={containerStyle}>
        <div style={headerContainerStyle}>
          <h2>Reviews</h2>
        </div>
        <div style={searchContainerStyle}>
          <Form>
            <FormControl
              type="text"
              placeholder="Search by Room Number"
              value={searchTerm}
              onChange={handleSearch}
              style={{ width: "50%", margin: "0 auto" }}
            />
          </Form>
        </div>
        {filteredBookings.length > 0 ? (
          <div style={reviewListContainerStyle}>
            <Row>
              {filteredBookings.map((booking) => (
                <Col md={4} className="mb-4" key={booking.BookingID}>
                  <BookingReviewCard booking={booking} />
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <div style={noBookingsMessageStyle}>
            <h4>No reviews found</h4>
          </div>
        )}
      </Container>
    </>
  );
}
