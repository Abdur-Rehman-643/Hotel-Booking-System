import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Contact: "",
    Password: "",
    Role: "Guest",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://positive-shining-boat.glitch.me/api/adduser",
        formData
      );
      alert("You signed up successfully! Please login.");
      console.log("Success:", response.data);
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Error:", error);
      alert("Error registering user.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <div className="card shadow p-4">
          <h2 className="text-center mb-4">Signup</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contact" className="form-label">
                Contact
              </label>
              <input
                type="text"
                className="form-control"
                id="contact"
                name="Contact"
                value={formData.Contact}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                required
              />
            </div>
            {/* <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                className="form-select"
                id="role"
                name="Role"
                value={formData.Role}
                onChange={handleChange}
              >
                <option value="Guest">Guest</option>
                <option value="Admin">Admin</option>
              </select>
            </div> */}
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
          <div className="mt-3 text-center">
            <p>
              Already have an account?{" "}
              <Link to="/" className="text-decoration-none">
                Go to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
