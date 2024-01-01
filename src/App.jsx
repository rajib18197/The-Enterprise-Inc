import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyles from "./styles/GlobalStyles";
import ThemeProvider from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";

import { Suspense, lazy } from "react";
import Spinner from "./ui/Spinner";

import ProtectedRoute from "./ui/ProtectedRoute";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AppLayout = lazy(() => import("./ui/AppLayout"));
const Jobs = lazy(() => import("./pages/Jobs"));
const Applications = lazy(() => import("./pages/Applications"));
const Application = lazy(() => import("./pages/Application"));
const SelectedCandidate = lazy(() =>
  import("./features/selected-rejected/SelectedCandidate")
);
const Login = lazy(() => import("./pages/Login"));
const Users = lazy(() => import("./pages/Users"));
const Account = lazy(() => import("./pages/Account"));
const Settings = lazy(() => import("./pages/Settings"));

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
          <Suspense fallback={<Spinner />}>
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
              </Route>

              <Route path="login" element={<Login />} />
            </Routes>
          </Suspense>
        </BrowserRouter>

        <Toaster
          position="top-right"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 4000,
            },

            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

// ------ Before
// dist/index.html                   1.08 kB │ gzip:   0.48 kB
// dist/assets/index-6d3c405e.css    5.17 kB │ gzip:   1.65 kB
// dist/assets/index-ba90fc1d.js   735.63 kB │ gzip: 215.58 kB

// ------ After
// dist/index.html                              1.08 kB │ gzip:   0.48 kB
// dist/assets/Applications-c48ed37a.css        0.65 kB │ gzip:   0.31 kB
// dist/assets/index-8da85d73.css               2.15 kB │ gzip:   0.90 kB
// dist/assets/Select-e0e2a3a5.css              2.37 kB │ gzip:   0.77 kB
// dist/assets/Section-3ebee09a.js              0.32 kB │ gzip:   0.23 kB
// dist/assets/Row-702a564e.js                  0.33 kB │ gzip:   0.24 kB
// dist/assets/SpinnerMini-eb7275d1.js          0.48 kB │ gzip:   0.35 kB
// dist/assets/useSetting-09a51d2f.js           0.57 kB │ gzip:   0.30 kB
// dist/assets/FileInput-874db28f.js            0.58 kB │ gzip:   0.31 kB
// dist/assets/Logo-a0530238.js                 0.62 kB │ gzip:   0.39 kB
// dist/assets/ContainerBox-9fd9dde4.js         0.76 kB │ gzip:   0.42 kB
// dist/assets/Checkbox-5ef9f8ec.js             0.77 kB │ gzip:   0.43 kB
// dist/assets/helpers-1b928822.js              0.80 kB │ gzip:   0.48 kB
// dist/assets/Heading-0ca8c87e.js              0.91 kB │ gzip:   0.33 kB
// dist/assets/Button-5efc8ded.js               1.15 kB │ gzip:   0.45 kB
// dist/assets/iconBase-f2d233ff.js             1.51 kB │ gzip:   0.74 kB
// dist/assets/Settings-09cbe823.js             1.64 kB │ gzip:   0.72 kB
// dist/assets/Users-cce40113.js                1.65 kB │ gzip:   0.74 kB
// dist/assets/Login-8b861425.js                1.70 kB │ gzip:   0.89 kB
// dist/assets/Modal-2bfc0b42.js                1.78 kB │ gzip:   0.81 kB
// dist/assets/FormRow-ae4aca6b.js              2.08 kB │ gzip:   0.90 kB
// dist/assets/ObservationBox-5e50d21b.js       2.17 kB │ gzip:   0.93 kB
// dist/assets/apiApplications-6cee9659.js      2.37 kB │ gzip:   0.97 kB
// dist/assets/useMutation-eb950c9e.js          2.84 kB │ gzip:   1.16 kB
// dist/assets/Account-b9fb1bce.js              2.99 kB │ gzip:   1.21 kB
// dist/assets/Application-ba29cf30.js          5.48 kB │ gzip:   2.04 kB
// dist/assets/Select-73a8be60.js               7.58 kB │ gzip:   2.35 kB
// dist/assets/SelectedCandidate-6d1a2f37.js    7.98 kB │ gzip:   3.35 kB
// dist/assets/AppLayout-062172ae.js            9.59 kB │ gzip:   2.62 kB
// dist/assets/Jobs-765fa010.js                11.28 kB │ gzip:   3.82 kB
// dist/assets/index.esm-30ca59c5.js           13.78 kB │ gzip:   3.71 kB
// dist/assets/Applications-c85ef3e1.js        17.30 kB │ gzip:   5.27 kB
// dist/assets/SearchBox-4c5c5d56.js           26.83 kB │ gzip:  10.20 kB
// dist/assets/index-7bcc7a5a.js              239.01 kB │ gzip:  77.76 kB
// dist/assets/Dashboard-a6831d32.js          376.56 kB │ gzip: 104.88 kB
