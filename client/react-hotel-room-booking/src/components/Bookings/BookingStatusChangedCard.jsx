import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

export default function BookingStatusChangedCard({ booking }) {
  const [status, setStatus] = useState(booking.BookingStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "green";
      case "Rejected":
        return "red";
      case "Pending":
      default:
        return "yellow";
    }
  };

  function updateStatus(newStatus) {
    axios
      .get(
        `https://positive-shining-boat.glitch.me/api/changebookingstatus/${booking.BookingID}?BookingStatus=${newStatus}`
      )
      .then((response) => {
        setStatus(newStatus); // Update the status state only if the API call is successful
        console.log(`Status updated to ${newStatus}:`, response.data);
      })
      .catch((error) => {
        console.error(`Error updating status to ${newStatus}:`, error);
      });
  }

  return (
    <Card className="mb-4" style={{ borderColor: getStatusColor(status) }}>
      <Card.Img
        variant="top"
        src={`https://positive-shining-boat.glitch.me/images/${booking.CoverImageURL}`}
      />
      <Card.Body>
        <Card.Title>
          Room No: {booking.RoomNo} ({booking.RoomType})
        </Card.Title>
        <Card.Text>
          <strong>Booked By:</strong> {booking.UserName}
          <br />
          <strong>Servant:</strong> {booking.RoomServantName}
          <br />
          <strong>Servant Contact:</strong> {booking.ServantContact}
          <br />
          <strong>Price Per Day:</strong> {booking.PricePerDay}
          <br />
          <strong>Arrival:</strong>{" "}
          {new Date(booking.ArrivalDateTime).toLocaleString()}
          <br />
          <strong>Departure:</strong>{" "}
          {new Date(booking.DepartureDateTime).toLocaleString()}
          <br />
          <strong>Adults:</strong> {booking.NumberOfAdults},{" "}
          <strong>Children:</strong> {booking.NumberOfChildren}
          <br />
          <strong>Total Days:</strong> {booking.TotalDays}
          <br />
          <strong>Total Amount:</strong> {booking.TotalAmount}
          <br />
          <strong>Status:</strong>{" "}
          <span style={{ color: getStatusColor(status) }}>{status}</span>
        </Card.Text>
        <div className="d-flex justify-content-between">
          <Button
            variant="success"
            onClick={() => updateStatus("Approved")}
            disabled={status !== "Pending"}
          >
            Accept
          </Button>
          <Button
            variant="danger"
            onClick={() => updateStatus("Rejected")}
            disabled={status !== "Pending"}
          >
            Reject
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

BookingStatusChangedCard.propTypes = {
  booking: PropTypes.shape({
    BookingID: PropTypes.number.isRequired,
    UserID: PropTypes.number.isRequired,
    UserName: PropTypes.string.isRequired,
    RoomID: PropTypes.number.isRequired,
    RoomNo: PropTypes.string.isRequired,
    RoomType: PropTypes.oneOf(["Single", "Double"]).isRequired,
    RoomServantName: PropTypes.string,
    ServantContact: PropTypes.string,
    PricePerDay: PropTypes.number.isRequired,
    RoomDescription: PropTypes.string,
    CoverImageURL: PropTypes.string,
    ArrivalDateTime: PropTypes.string.isRequired,
    DepartureDateTime: PropTypes.string.isRequired,
    NumberOfChildren: PropTypes.number,
    NumberOfAdults: PropTypes.number,
    TotalDays: PropTypes.number.isRequired,
    TotalAmount: PropTypes.number.isRequired,
    BookingStatus: PropTypes.oneOf(["Pending", "Approved", "Rejected"])
      .isRequired,
    Rating: PropTypes.number,
    ReviewText: PropTypes.string,
  }).isRequired,
};
