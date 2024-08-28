import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import GuestHeader from "../GuestHeader";
import moment from "moment";

export default function GetDetailedRoomView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(
    moment().format("YYYY-MM-DDTHH:mm")
  );
  const [departureDate, setDepartureDate] = useState(
    moment().add(1, "days").format("YYYY-MM-DDTHH:mm")
  );
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [numberOfAdults, setNumberOfAdults] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDays, setTotalDays] = useState(1);

  useEffect(() => {
    async function fetchRoom() {
      try {
        const response = await axios.get(
          `https://positive-shining-boat.glitch.me/api/getroombyid/${id}`
        );
        setRoom(response.data);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    }
    fetchRoom();
  }, [id]);

  useEffect(() => {
    if (room) {
      const fromDate = moment(arrivalDate);
      const toDate = moment(departureDate);
      const days = moment.duration(toDate.diff(fromDate)).asDays() + 1;
      setTotalDays(days);
      setTotalAmount(room.PricePerDay * days);
    }
  }, [arrivalDate, departureDate, room]);

  const handleBooking = async () => {
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    const userID = storedUserDetails ? storedUserDetails.UserID : null;

    if (!userID) {
      alert("User not logged in. Please log in to continue.");
      return;
    }

    const bookingData = {
      UserID: userID,
      RoomID: id,
      ArrivalDateTime: arrivalDate,
      DepartureDateTime: departureDate,
      NumberOfChildren: numberOfChildren,
      NumberOfAdults: numberOfAdults,
      TotalDays: totalDays,
      TotalAmount: totalAmount,
    };

    console.log(bookingData);

    try {
      const response = await axios.post(
        "https://positive-shining-boat.glitch.me/api/bookroom",
        bookingData
      );
      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        alert("Payment failed or booking request could not be submitted.");
      }
    } catch (error) {
      console.error("Error submitting booking request:", error);
      alert("An error occurred while processing your request.");
    }
  };

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GuestHeader />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <h2 className="mb-4">Room Details</h2>
            <div className="card mb-4 shadow-sm">
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={`https://positive-shining-boat.glitch.me/images/${room.CoverImageURL}`}
                    alt="Room"
                  />
                </Carousel.Item>
                {room.Image1URL && (
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={`https://positive-shining-boat.glitch.me/images/${room.Image1URL}`}
                      alt="Room"
                    />
                  </Carousel.Item>
                )}
                {room.Image2URL && (
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={`https://positive-shining-boat.glitch.me/images/${room.Image2URL}`}
                      alt="Room"
                    />
                  </Carousel.Item>
                )}
              </Carousel>
              <div className="card-body">
                <h5 className="card-title">Room No. {room.RoomNo}</h5>
                <p className="card-text">
                  <strong>Room Type:</strong> {room.RoomType} <br />
                  <strong>Servant Name:</strong> {room.RoomServantName || "N/A"}{" "}
                  <br />
                  <strong>Servant Contact:</strong>{" "}
                  {room.ServantContact || "N/A"} <br />
                  <strong>Price per Day:</strong> Rs.{" "}
                  {parseFloat(room.PricePerDay).toFixed(2)} <br />
                  <strong>Description:</strong> {room.RoomDescription || "N/A"}{" "}
                  <br />
                  <strong>Status:</strong> {room.AvailabilityStatus} <br />
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <h2 className="mb-4">Book This Room</h2>
            <div className="card p-4 shadow-sm">
              <form>
                <div className="mb-3">
                  <label htmlFor="arrivalDate" className="form-label">
                    Arrival Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="arrivalDate"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="departureDate" className="form-label">
                    Departure Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="departureDate"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="numberOfChildren" className="form-label">
                    Number of Children
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="numberOfChildren"
                    value={numberOfChildren}
                    onChange={(e) =>
                      setNumberOfChildren(parseInt(e.target.value, 10))
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="numberOfAdults" className="form-label">
                    Number of Adults
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="numberOfAdults"
                    value={numberOfAdults}
                    onChange={(e) =>
                      setNumberOfAdults(parseInt(e.target.value, 10))
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="totalDays" className="form-label">
                    Total Days
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalDays"
                    value={totalDays}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="totalAmount" className="form-label">
                    Total Amount (Rs.)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalAmount"
                    value={totalAmount}
                    readOnly
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-success mb-3 shadow-lg rounded-pill px-4 py-2 fw-bold"
                  onClick={handleBooking}
                >
                  <i className="bi bi-credit-card"></i> Pay Now To Book Room
                </button>
              </form>
              <button
                onClick={() => navigate("/guestdashboard")}
                className="btn btn-secondary shadow-lg rounded-pill px-4 py-2 fw-bold text-white"
              >
                <i className="bi bi-arrow-left-circle"></i> Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
