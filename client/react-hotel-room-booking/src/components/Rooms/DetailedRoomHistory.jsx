import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DetailedRoomHistory() {
  const { roomid } = useParams();
  const [history, setHistory] = useState([]);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    async function fetchRoomHistory() {
      try {
        const response = await axios.get(
          `https://positive-shining-boat.glitch.me/api/getroomhistory/${roomid}`
        );
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching room history:", error);
      }
    }

    fetchRoomHistory();
  }, [roomid]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return { color: "green", fontWeight: "bold" };
      case "Rejected":
        return { color: "red", fontWeight: "bold" };
      case "Pending":
        return { color: "yellow", fontWeight: "bold" };
      default:
        return {};
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Room History Details</h2>
      {history.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No history available for this room.
        </div>
      ) : (
        <div className="row">
          {history.map((entry) => (
            <div className="col-md-6 mb-4" key={entry.HistoryID}>
              <div className="card shadow-lg border-light rounded">
                <div className="card-body">
                  <h5 className="card-title mb-3">Booking Details</h5>
                  <p className="card-text">
                    <strong>Booked By:</strong> {entry.UserName} <br />
                    <strong>{entry.UserName} Contact Number:</strong>{" "}
                    {entry.UserContact} <br />
                    <strong>Number of Children:</strong>{" "}
                    {entry.NumberOfChildren} <br />
                    <strong>Number of Adults:</strong> {entry.NumberOfAdults}{" "}
                    <br />
                    <strong>Total Days:</strong> {entry.TotalDays} <br />
                    <strong>Total Price:</strong> Rs.{" "}
                    {parseFloat(entry.TotalAmount).toFixed(2)} <br />
                    <strong>Booking Status:</strong>{" "}
                    <span style={getStatusStyle(entry.BookingStatus)}>
                      {entry.BookingStatus}
                    </span>{" "}
                    <br />
                    <strong>Arrival Date:</strong>{" "}
                    {new Date(entry.ArrivalDateTime).toLocaleDateString()}{" "}
                    <br />
                    <strong>Departure Date:</strong>{" "}
                    {new Date(entry.DepartureDateTime).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="text-center mt-4">
        <button
          className="btn btn-primary shadow-sm"
          onClick={() => navigate("/admin/manage-rooms")}
        >
          Back to Manage Rooms
        </button>
      </div>
    </div>
  );
}
