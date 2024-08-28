import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminHeader from "../AdminHeader";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminAddRoomForm() {
  const [roomNo, setRoomNo] = useState("");
  const [roomType, setRoomType] = useState("Single");
  const [roomServantName, setRoomServantName] = useState("");
  const [servantContact, setServantContact] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("Available");
  const [coverImage, setCoverImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("roomNo", roomNo);
    formData.append("roomType", roomType);
    formData.append("roomServantName", roomServantName);
    formData.append("servantContact", servantContact);
    formData.append("pricePerDay", pricePerDay);
    formData.append("roomDescription", roomDescription);
    formData.append("availabilityStatus", availabilityStatus);
    formData.append("coverImage", coverImage);
    formData.append("image1", image1);
    formData.append("image2", image2);

    try {
      const response = await axios.post(
        "https://positive-shining-boat.glitch.me/api/addroom",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Room added successfully!");
        setRoomNo("");
        setRoomType("Single");
        setRoomServantName("");
        setServantContact("");
        setPricePerDay("");
        setRoomDescription("");
        setAvailabilityStatus("Available");
        setCoverImage(null);
        setImage1(null);
        setImage2(null);
        navigate("/admin/manage-rooms");
      }
    } catch (error) {
      console.error("Error adding room:", error);
      alert("Failed to add room. Please try again.");
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="container mt-4">
        <div className="card shadow-sm rounded p-4">
          <h2 className="mb-4 text-center">Add New Room</h2>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="roomNo" className="col-sm-3 col-form-label">
                Room Number
              </label>
              <div className="col-sm-9">
                <input
                  id="roomNo"
                  type="text"
                  value={roomNo}
                  onChange={(e) => setRoomNo(e.target.value)}
                  className="form-control"
                  placeholder="Enter Room Number"
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="roomType" className="col-sm-3 col-form-label">
                Room Type
              </label>
              <div className="col-sm-9">
                <select
                  id="roomType"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="form-select"
                >
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="roomServantName"
                className="col-sm-3 col-form-label"
              >
                Room Servant Name
              </label>
              <div className="col-sm-9">
                <input
                  id="roomServantName"
                  type="text"
                  value={roomServantName}
                  onChange={(e) => setRoomServantName(e.target.value)}
                  className="form-control"
                  placeholder="Enter Servant's Name"
                />
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="servantContact"
                className="col-sm-3 col-form-label"
              >
                Servant Contact
              </label>
              <div className="col-sm-9">
                <input
                  id="servantContact"
                  type="text"
                  value={servantContact}
                  onChange={(e) => setServantContact(e.target.value)}
                  className="form-control"
                  placeholder="Enter Contact Number"
                />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="pricePerDay" className="col-sm-3 col-form-label">
                Price Per Day
              </label>
              <div className="col-sm-9">
                <input
                  id="pricePerDay"
                  type="number"
                  value={pricePerDay}
                  onChange={(e) => setPricePerDay(e.target.value)}
                  className="form-control"
                  placeholder="Enter Price Per Day"
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="roomDescription"
                className="col-sm-3 col-form-label"
              >
                Room Description
              </label>
              <div className="col-sm-9">
                <textarea
                  id="roomDescription"
                  value={roomDescription}
                  onChange={(e) => setRoomDescription(e.target.value)}
                  className="form-control"
                  placeholder="Enter Room Description"
                  rows="3"
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="availabilityStatus"
                className="col-sm-3 col-form-label"
              >
                Availability Status
              </label>
              <div className="col-sm-9">
                <select
                  id="availabilityStatus"
                  value={availabilityStatus}
                  onChange={(e) => setAvailabilityStatus(e.target.value)}
                  className="form-select"
                >
                  <option value="Available">Available</option>
                  <option value="Occupied">Occupied</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="coverImage" className="col-sm-3 col-form-label">
                Cover Image
              </label>
              <div className="col-sm-9">
                <input
                  id="coverImage"
                  type="file"
                  onChange={(e) => setCoverImage(e.target.files[0])}
                  accept="image/*"
                  className="form-control"
                />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="image1" className="col-sm-3 col-form-label">
                Image 1
              </label>
              <div className="col-sm-9">
                <input
                  id="image1"
                  type="file"
                  onChange={(e) => setImage1(e.target.files[0])}
                  accept="image/*"
                  className="form-control"
                />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="image2" className="col-sm-3 col-form-label">
                Image 2
              </label>
              <div className="col-sm-9">
                <input
                  id="image2"
                  type="file"
                  onChange={(e) => setImage2(e.target.files[0])}
                  accept="image/*"
                  className="form-control"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 mt-3 shadow-sm"
            >
              Add Room
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminAddRoomForm;
