import { Navigate, Outlet } from "react-router"; // Import React Router components
import { useContext } from "react"; // Hook for accessing context
import { UserContext } from "../context/UserContext"; // User context to access the authenticated user's data

const ProtectedRoute = () => {
  const { user } = useContext(UserContext); // Access the current user's data from context

  // Check if the user is authenticated and has a profileId
  return (user?.token && user?.profileId)
    ? <Outlet /> // If the user is authenticated, render the child routes
    : <Navigate to="/login" />; // If not, redirect the user to the login page
};

export default ProtectedRoute;
