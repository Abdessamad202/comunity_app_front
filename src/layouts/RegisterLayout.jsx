import { Outlet, useLocation } from "react-router"; // React Router hooks for dynamic routing
import FormHeader from "../components/FormHeader"; // Import RegisterHeader component
import RegisterSteps from "../components/RegisterSteps";
import SubmitBar from "../components/SubmitBar";
import { motion } from "framer-motion";
const RegisterLayout = () => {
  const location = useLocation(); // Get current route path

  // Define dynamic content based on the route
  let headerContent = null;
  switch (location.pathname) {
    case "/register":
      headerContent = (
        <FormHeader title="Create an account" description="Join us today!" />
      );
      break;
    case "/verify":
      headerContent = (
        <FormHeader title="Verify your email" description="Enter the verification code we sent to your email." />
      );
      break;
    case "/profile":
      headerContent = (
        <FormHeader title="Complete your profile" description="Tell us more about you" />
      );
      break;
    default:
      return null; // If no matching route, return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8"
        initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and slightly down
        animate={{ opacity: 1, y: 0 }}   // Animate to opacity 1 and original position
        transition={{ duration: 0.6 }}    // Set the duration of the animation
      >
        <SubmitBar />
        {/* Steps component for the registration flow */}
        <RegisterSteps />
        {/* Dynamic header content based on the current route */}
        {headerContent}
        {/* Outlet for nested route components */}
        <Outlet />
      </motion.div>
    </div>
  );
};

export default RegisterLayout;
