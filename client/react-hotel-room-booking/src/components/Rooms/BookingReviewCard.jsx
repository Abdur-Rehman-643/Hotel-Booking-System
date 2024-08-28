import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

export default function BookingReviewCard({ booking }) {
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
      </Card.Body>
    </Card>
  );
}

BookingReviewCard.propTypes = {
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
