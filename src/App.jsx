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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000 * 10,
    },
  },
});

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
              {/* Test */}
              <Route
                path="resuabletable"
                element={
                  <>
                    {/* <TableSort /> */}
                    {/* <ReusableInput /> */}
                    <Paginations />
                  </>
                }
              />
            </Route>
            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

// The previous files code are able to found in [JS-PRACTICE-HOME] folder
