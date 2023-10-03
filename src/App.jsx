import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Users from "./pages/Users";
// import Homes from "./pages/Homes";
import VacationHome from "./pages/VacationHome";
// import Bookings from "./pages/Bookings";
// import Booking from "./pages/Booking";
// import Dashboard from "./pages/Dashboard";
import VacationHomes from "./pages/VacationHomes";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="vacationhomes" />} />
          {/* <Route path="users" element={<Users />} /> */}
          <Route path="vacationhomes" element={<VacationHomes />} />
          <Route path="vacationhomes/:homeId" element={<VacationHome />} />

          {/* <Route path="homes" element={<Homes />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="bookings/:bookingId" element={<Booking />} />
          <Route path="dashboard" element={<Dashboard />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
