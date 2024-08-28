import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ViewOccupiedRoom from "./components/Rooms/AdminViewOccupiedRoom";
import Signup from "./components/UserLogin/Signup";
import Login from "./components/UserLogin/Login";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import AdminViewFreeRoom from "./components/Rooms/AdminViewFreeRoom";
import AdminAddRoomForm from "./components/Rooms/AdminAddRoom";
import AdminViewOccupiedRoom from "./components/Rooms/AdminViewOccupiedRoom";
import AdminViewTotalRoom from "./components/Rooms/AdminViewTotalRoom";
import GuestDashBoardRoomView from "./components/Rooms/GuestDashboardRoomView";
import GetDetailedRoomView from "./components/Rooms/GetDetailedRoomView";
import ViewGuestBookings from "./components/Bookings/ViewGuestBookings";
import ReviewForm from "./components/Bookings/ReviewForm";
import ViewTotalBookings from "./components/Bookings/ViewTotalBookings";
import BookingAdminAccepted from "./components/Bookings/BookingAdminAccepted";
import BookingAdminRejected from "./components/Bookings/BookingAdminrejected";
import BookingAdminPending from "./components/Bookings/BookingAdminPending";
import GeneratedRevenue from "./components/Bookings/GeneratedRevenue";
import ManageRooms from "./components/Rooms/ManageRooms";
import DetailedRoomHistory from "./components/Rooms/DetailedRoomHistory";
import ManageBookings from "./components/Bookings/ManageBookings";
import Review from "./components/Rooms/Review";
import AddEmployee from "./components/Employees/AddEmployee";
import ManageEmployees from "./components/Employees/ManageEmployees";
import EditEmployee from "./components/Employees/EditEmployee";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/guest/detailedroomview/:id"
          element={<GetDetailedRoomView />}
        />
        <Route path="/admin/addemployee" element={<AddEmployee />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/guestdashboard" element={<GuestDashBoardRoomView />} />
        <Route
          path="/admin/viewOccupiedRooms"
          element={<AdminViewOccupiedRoom />}
        />
        <Route path="/admin/viewTotalRooms" element={<AdminViewTotalRoom />} />
        <Route
          path="/admin/viewTotalBookings"
          element={<ViewTotalBookings />}
        />
        <Route
          path="/admin/viewApprovedBookings"
          element={<BookingAdminAccepted />}
        />
        <Route
          path="/admin/viewRejectedBookings"
          element={<BookingAdminRejected />}
        />
        <Route
          path="/admin/viewPendingBookings"
          element={<BookingAdminPending />}
        />
        <Route path="/guest/review/:bookingid" element={<ReviewForm />} />

        <Route
          path="/dashboard/viewOccupiedRooms"
          element={<ViewOccupiedRoom />}
        />
        <Route
          path="/admin/roomhistorydetailedview/:roomid"
          element={<DetailedRoomHistory />}
        />

        <Route path="/admin/manage-bookings" element={<ManageBookings />} />
        <Route path="/admin/viewRevenue" element={<GeneratedRevenue />} />
        <Route path="/guest/my-bookings" element={<ViewGuestBookings />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/viewFreeRooms" element={<AdminViewFreeRoom />} />
        <Route path="/admin/addRoom" element={<AdminAddRoomForm />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/editemployee/:id" element={<EditEmployee />} />
        <Route path="/admin/manage-employees" element={<ManageEmployees />} />
        <Route path="/admin/manage-rooms" element={<ManageRooms />} />
        <Route path="/admin/reviews" element={<Review />} />
      </Routes>
    </Router>
  );
}

export default App;
