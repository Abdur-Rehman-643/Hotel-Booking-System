import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function GuestRoomCard({ room }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm border-light rounded">
        <img
          src={`https://positive-shining-boat.glitch.me/images/${room.CoverImageURL}`}
          className="card-img-top"
          alt={room.RoomNo}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title mb-3">Room No. {room.RoomNo}</h5>
          <p className="card-text mb-3">
            <strong>Type:</strong> {room.RoomType} <br />
            <strong>Price:</strong> Rs.{" "}
            {parseFloat(room.PricePerDay).toFixed(2)} per day <br />
            <strong>Description:</strong> {room.RoomDescription || "N/A"} <br />
          </p>
          <Link
            to={`/guest/detailedroomview/${room.RoomID}`}
            className="btn btn-primary"
            style={{ width: "100%" }}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

GuestRoomCard.propTypes = {
  room: PropTypes.shape({
    RoomID: PropTypes.number.isRequired,
    RoomNo: PropTypes.string.isRequired,
    RoomType: PropTypes.string.isRequired,
    RoomDescription: PropTypes.string,
    PricePerDay: PropTypes.string.isRequired,
    CoverImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
