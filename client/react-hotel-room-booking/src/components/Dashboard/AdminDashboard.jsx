import AdminHeader from "../AdminHeader";
import AdminDashboardItem from "./AdminDashboardCard";

export default function AdminDashboard() {
  return (
    <>
      <AdminHeader />
      <div className="container mt-5">
        <div className="row">
          <AdminDashboardItem
            title="Total Rooms"
            text="View rooms available."
            link="/admin/viewTotalRooms"
            linkText="View Total Rooms"
            iconClass="bi-house-fill"
          />
          <AdminDashboardItem
            title="Occupied Rooms"
            text="View currently occupied rooms."
            link="/admin/viewOccupiedRooms"
            linkText="View Occupied Rooms"
            iconClass="bi-door-closed-fill"
          />
          <AdminDashboardItem
            title="Free Rooms"
            text="View free and available rooms."
            link="/admin/viewFreeRooms"
            linkText="View Free Rooms"
            iconClass="bi-door-open-fill"
          />
          <AdminDashboardItem
            title="Total Bookings"
            text="See the total number of bookings made."
            link="/admin/viewTotalBookings"
            linkText="View Total Bookings"
            iconClass="bi-calendar-check-fill"
          />
          <AdminDashboardItem
            title="Approved Bookings"
            text="View the number of bookings that have been approved."
            link="/admin/viewApprovedBookings"
            linkText="View Approved Bookings"
            iconClass="bi-check-circle-fill"
          />
          <AdminDashboardItem
            title="Pending Bookings"
            text="See the number of bookings that are pending approval."
            link="/admin/viewPendingBookings"
            linkText="View Pending Bookings"
            iconClass="bi-hourglass-split"
          />
          <AdminDashboardItem
            title="Rejected Bookings"
            text="See the number of bookings that are rejected approval."
            link="/admin/viewRejectedBookings"
            linkText="View Rejected Bookings"
            iconClass="bi-x-circle-fill"
          />
          <AdminDashboardItem
            title="Generated Revenue"
            text="View the total revenue generated from bookings."
            link="/admin/viewRevenue"
            linkText="View Revenue"
            iconClass="bi-currency-dollar"
          />
        </div>
      </div>
    </>
  );
}
