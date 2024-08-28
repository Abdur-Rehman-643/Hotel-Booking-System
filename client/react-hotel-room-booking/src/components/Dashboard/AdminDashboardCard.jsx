import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function AdminDashboardItem({
  title,
  text,
  link,
  linkText,
  iconClass,
}) {
  return (
    <div className="col-md-4 mb-4">
      <div className="p-4 text-center border rounded shadow-lg bg-light">
        <div className="mb-3">
          <i className={`bi ${iconClass} fa-3x text-primary`}></i>
        </div>
        <h5 className="mb-2">{title}</h5>
        <p className="text-muted mb-4">{text}</p>
        <Link to={link} className="btn btn-outline-primary">
          {linkText}
        </Link>
      </div>
    </div>
  );
}

AdminDashboardItem.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
};
