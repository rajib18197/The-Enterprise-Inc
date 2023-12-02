import { useEffect } from "react";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import useUser from "../features/authentication/useUser";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1) check the authenticated user, If the user is logged in then re-fetch user's credentials again
  const { isAuthenticated, isLoading } = useUser();

  // 3) if user is not authenticated then redirect to login page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 2) while Loading, then show the loading spinner
  if (isLoading)
    return (
      <>
        <Spinner />
      </>
    );

  // 4) If user is authenticated then render the page (dashboard)
  if (isAuthenticated) return children;
}
