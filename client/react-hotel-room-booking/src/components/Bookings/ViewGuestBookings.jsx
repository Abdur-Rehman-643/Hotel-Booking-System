import { useState, useEffect } from "react";
import axios from "axios";
import BookingCard from "./BookingCard";
import GuestHeader from "../GuestHeader";

export default function ViewGuestBookings() {
  const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
  const userID = storedUserDetails ? storedUserDetails.UserID : null;

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!userID) {
      alert("User not logged in. Please log in to continue.");
      return;
    }

    axios
      .get(
        `https://positive-shining-boat.glitch.me/api/getuserbookings/${userID}`
      )
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the bookings!", error);
      });
  }, [userID]);

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
      <GuestHeader />
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2>My Bookings</h2>
        </div>
        {bookings.length > 0 ? (
          <div className="row">
            {bookings.map((booking) => (
              <div className="col-md-4 mb-4" key={booking.BookingID}>
                <BookingCard booking={booking} />
              </div>
            ))}
          </div>
        ) : (
          <div style={noBookingsMessageStyle}>
            <h4>No bookings yet</h4>
          </div>
        )}
      </div>
    </>
  );
}
