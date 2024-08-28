import { Link } from "react-router-dom";

function GuestHeader() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/guestdashboard">
          Hotel Guest Portal
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/guestdashboard">
                View Rooms
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/guest/my-bookings">
                My Bookings
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default GuestHeader;
