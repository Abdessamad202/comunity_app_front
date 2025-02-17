import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";

const StepsGuard = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    // Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const token = user.token;
    const step = user.step;

    // Check if the user is logged in
    if (!token) {
      navigate("/register"); // Redirect to registration if no token
    } else if (step === 1) {
      navigate("/verify"); // Redirect to verification if step 1
    } else if (step === 2) {
      navigate("/profile"); // Redirect to profile if step 2
    } else {
      navigate("/home"); // Redirect to home if all steps are complete
    }
  }, [navigate]); // Runs the effect whenever `navigate` changes

  return <Outlet />; // Render the matched route component if no redirection
};

export { StepsGuard };
