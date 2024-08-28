import { useState, useEffect } from "react";
import axios from "axios";
import RoomCard from "./AdminRoomCard";
import { Link } from "react-router-dom";
import AdminHeader from "../AdminHeader";

function AdminViewOccupiedRoom() {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await axios.get(
          "https://positive-shining-boat.glitch.me/api/getoccupiedroom"
        );
        console.log("Fetched rooms data:", response.data);
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    }

    fetchRooms();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRooms = rooms.filter((room) =>
    room.RoomNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AdminHeader />
      <div className="container mt-4">
        <div className="mb-4 d-flex justify-content-center">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search by Room Number"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="row">
          {filteredRooms.length === 0 ? (
            <div className="alert alert-info" role="alert">
              No room is available
            </div>
          ) : (
            filteredRooms.map((room) => (
              <RoomCard key={room.RoomID} room={room} />
            ))
          )}
        </div>
        <div className="mb-3 d-flex justify-content-center">
          <Link to="/admindashboard" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}

export default AdminViewOccupiedRoom;
