import { useState, useEffect } from "react";
import axios from "axios";
import GuestHeader from "../GuestHeader";
import GuestRoomCard from "./GuestRoomCard";

export default function GuestDashBoardRoomView() {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function fetchRooms() {
      let url = "https://positive-shining-boat.glitch.me/api/getavaibleroom";
      if (filter === "Single") {
        url =
          "https://positive-shining-boat.glitch.me/api/getsingleavailableroom";
      } else if (filter === "Double") {
        url =
          "https://positive-shining-boat.glitch.me/api/getdoubleavailableroom";
      }

      try {
        const response = await axios.get(url);
        console.log("Fetched rooms data:", response.data);
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    }

    fetchRooms();
  }, [filter]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredRooms = rooms.filter((room) =>
    room.RoomNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <GuestHeader />
      <div className="container mt-4">
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Room Number"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div className="form-check me-3">
              <input
                type="radio"
                className="form-check-input"
                id="all"
                name="roomFilter"
                value="All"
                checked={filter === "All"}
                onChange={handleFilterChange}
              />
              <label className="form-check-label" htmlFor="all">
                All
              </label>
            </div>
            <div className="form-check me-3">
              <input
                type="radio"
                className="form-check-input"
                id="single"
                name="roomFilter"
                value="Single"
                checked={filter === "Single"}
                onChange={handleFilterChange}
              />
              <label className="form-check-label" htmlFor="single">
                Single
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="double"
                name="roomFilter"
                value="Double"
                checked={filter === "Double"}
                onChange={handleFilterChange}
              />
              <label className="form-check-label" htmlFor="double">
                Double
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          {filteredRooms.length === 0 ? (
            <div className="alert alert-info" role="alert">
              No room is available
            </div>
          ) : (
            filteredRooms.map((room) => (
              <GuestRoomCard key={room.RoomID} room={room} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
