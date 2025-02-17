import { Outlet, useLocation } from "react-router"; // React Router hooks for dynamic routing
import RegisterHeader from "../components/RegisterHeader"; // Import RegisterHeader component
import Steps from "../components/Steps"; // Import Steps component

const RegisterLayout = () => {
  const location = useLocation(); // Get current route path

  // Define dynamic content based on the route
  let headerContent = null;
  switch (location.pathname) {
    case "/register":
      headerContent = (
        <RegisterHeader title="Create an account" description="Join us today!" />
      );
      break;
    case "/verify":
      headerContent = (
        <RegisterHeader title="Verify your email" description="Enter the verification code we sent to your email." />
      );
      break;
    case "/profile":
      headerContent = (
        <RegisterHeader title="Complete your profile" description="Tell us more about you" />
      );
      break;
    default:
      return null; // If no matching route, return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Main container with background gradient */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Steps component for the registration flow */}
        <Steps />
        {/* Dynamic header content based on the current route */}
        {headerContent}
        {/* Outlet for nested route components */}
        <Outlet />
      </div>
    </div>
  );
};

export default RegisterLayout;
