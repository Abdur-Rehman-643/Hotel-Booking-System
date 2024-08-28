import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

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
        "https://positive-shining-boat.glitch.me/api/getuser",
        formData
      );
      console.log("Response:", response.data);

      // Save user details to localStorage
      localStorage.setItem("userDetails", JSON.stringify(response.data));

      // Redirect based on user role
      if (response.data.Role === "Admin") {
        navigate("/admindashboard");
      } else {
        navigate("/guestdashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
      }
    }
  };

  return (
    <div
      className="container mt-5 d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <p>
            Donot have an account?{" "}
            <Link to="/signup" className="text-decoration-none">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
