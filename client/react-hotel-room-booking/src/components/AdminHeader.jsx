import { Link } from "react-router-dom";

function AdminHeader() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/admindashboard">
          Hotel Admin Portal
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
              <Link className="nav-link" to="/admindashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/manage-employees">
                Manage Employees
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/manage-rooms">
                Manage Rooms
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/manage-bookings">
                Manage Bookings
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/reviews">
                Reviews
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

export default AdminHeader;
