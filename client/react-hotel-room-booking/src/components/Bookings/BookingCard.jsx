import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function BookingCard({ booking }) {
  const navigate = useNavigate();

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

  const handleReviewClick = () => {
    navigate(`/guest/review/${booking.BookingID}`);
  };

  return (
    <Card
      className="mb-4"
      style={{ borderColor: getStatusColor(booking.BookingStatus) }}
    >
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
          <span style={{ color: getStatusColor(booking.BookingStatus) }}>
            {booking.BookingStatus}
          </span>
          <br />
          {booking.Rating && (
            <>
              <strong>Rating:</strong> {booking.Rating} / 5<br />
            </>
          )}
          {booking.ReviewText && (
            <>
              <strong>Review:</strong> {booking.ReviewText}
              <br />
            </>
          )}
        </Card.Text>
        <Button variant="primary" onClick={handleReviewClick}>
          Give Review
        </Button>
      </Card.Body>
    </Card>
  );
}

BookingCard.propTypes = {
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