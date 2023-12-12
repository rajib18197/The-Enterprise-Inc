import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Users from "./pages/Users";
// import Homes from "./pages/Homes";
// import Bookings from "./pages/Bookings";
// import Booking from "./pages/Booking";
// import Dashboard from "./pages/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Jobs from "./pages/Jobs";
import Applications from "./pages/Applications";
import Application from "./pages/Application";
import ThemeProvider from "./context/ThemeContext";
import SelectedCandidate from "./features/selected-rejected/SelectedCandidate";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ui/ProtectedRoute";
import Users from "./pages/Users";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import TableSort from "./ui/TableSort";
import ReusableInput from "./ui/ReusableInput";
import Paginations from "./ui/Paginations";
import FolderExplorer from "./ui/FolderExplorer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000 * 10,
    },
  },
});
// But as soon as you get something that works, it's equally important to zoom out and really understand *why* it works the way it does.
export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="selected/:id" element={<SelectedCandidate />} />
              <Route path="applications" element={<Applications />} />
              <Route path="applications/:id" element={<Application />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="users" element={<Users />} />
              <Route path="account" element={<Account />} />
              <Route path="settings" element={<Settings />} />
              <Route path="folders" element={<FolderExplorer />} />
            </Route>

            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

// The previous files code are able to found in [JS-PRACTICE-HOME] folder
{
  /* Test */
}
{
  /* <Route
                path="resuabletable"
                element={
                  <>
                    <TableSort />
                    <ReusableInput />
                    <Paginations />
                  </>
                }
              />
            </Route> */
}

// import { useState } from "react";

// const makeRating = function (number) {
//   return Array.from({ length: number }, (_, i) => ({
//     half: i + 1 - 0.5,
//     full: i + 1,
//   }));
// };

// export default function StarRating({
//   initialRating = 0,
//   onSetRate,
//   maxRatingNumber,
// }) {
//   const rates = makeRating(maxRatingNumber);

//   console.log(rates);
//   const [rating, setRating] = useState(initialRating);
//   const [tempRating, setTempRating] = useState(0);

//   return (
//     <StarContainer>
//       <StarList
//         rates={rates}
//         rating={rating}
//         onRating={setRating}
//         tempRating={tempRating}
//         onTempRating={setTempRating}
//         onSetRateOutside={onSetRate}
//       />
//       <Text>{tempRating || rating || ""}</Text>
//     </StarContainer>
//   );
// }

// const starContainerStyle = {
//   width: "100%",
//   height: "6rem",
//   background: "var(--color-grey-800)",
//   color: "white",
//   borderRadius: "3px",
//   display: "flex",
//   gap: "1rem",
//   alignItems: "center",
//   padding: "3rem",
//   //   justifyContent: "center",
// };

// function StarContainer({ children }) {
//   return <div style={starContainerStyle}>{children}</div>;
// }

// const starListStyle = {
//   display: "flex",
//   alignItems: "center",
//   gap: ".6rem",
//   width: "80%",
// };

// function StarList({
//   rates,
//   rating,
//   onRating,
//   tempRating,
//   onTempRating,
//   onSetRateOutside,
// }) {
//   return (
//     <div style={starListStyle}>
//       {rates.map((rate) => (
//         <Star
//           key={rate.half}
//           rate={rate}
//           rating={rating}
//           onRating={(r) => onRating(r)}
//           onSetRateOutside={onSetRateOutside}
//           tempRating={tempRating}
//           onTempRating={(r) => onTempRating(r)}
//           isFull={tempRating ? tempRating >= rate.full : rating >= rate.full}
//         />
//       ))}
//     </div>
//   );
// }

// const starStyle = {
//   display: "block",
//   cursor: "pointer",
// };

// const iconStyle = {
//   width: "3.2rem",
//   height: "3.2rem",
//   color: "var(--color-brand-600)",
// };

// function Star({
//   rate,
//   rating,
//   onRating,
//   tempRating,
//   onTempRating,
//   isFull,
//   onSetRateOutside,
// }) {
//   const isHalf = tempRating === rate.half || rating === rate.half;

//   function handleRate(e) {
//     const coords = e.target.getBoundingClientRect();
//     const leftCoords = coords.x;
//     const clickedCoords = e.clientX;
//     console.log(clickedCoords - leftCoords, coords);

//     if (clickedCoords - leftCoords < Math.floor(coords.width / 2)) {
//       onRating(rate.half);
//       onSetRateOutside(rate.half);
//       return;
//     }

//     onRating(rate.full);
//     onSetRateOutside(rate.full);
//   }

//   function handleEnter(e) {
//     const coords = e.target.getBoundingClientRect();
//     const leftCoords = coords.x;
//     const clickedCoords = e.clientX;

//     if (clickedCoords - leftCoords <= Math.floor(coords.width / 2)) {
//       onTempRating(rate.half);
//       return;
//     }

//     onTempRating(rate.full);
//   }

//   return (
//     <span
//       role="button"
//       style={starStyle}
//       onClick={handleRate}
//       onMouseMove={handleEnter}
//       onMouseOut={() => onTempRating(0)}
//     >
//       {!isFull && !isHalf && (
//         <ion-icon name="star-outline" style={iconStyle}></ion-icon>
//       )}

//       {isFull && <ion-icon name="star" style={iconStyle}></ion-icon>}

//       {isHalf && (
//         <ion-icon name="star-half-outline" style={iconStyle}></ion-icon>
//       )}
//     </span>
//   );
// }

// const textStyle = {
//   fontSize: "1.6rem",
//   fontWeight: "600",
//   textTransform: "uppercase",
// };

// function Text({ children }) {
//   return <p style={textStyle}>{children}</p>;
// }
