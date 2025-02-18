import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import { UserContext } from "../context/UserContext";

const StepsGuard = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const {user} = useContext(UserContext);
  useEffect(() => {
    // Retrieve user data from localStorage
    const token = user?.token;
    const step = user?.step;
    const profileId = user?.profileId;

    // Check if the user is logged in
    if (!token || !step) {
      navigate("/register"); // Redirect to registration if no token
    } else if (profileId) {
      navigate("/home"); // Redirect to home if all steps are complete
    } else {
      switch (step) {
        case 1:
          navigate("/verify"); // Redirect to verification if step 1
          break;
        case 2:
          navigate("/profile"); // Redirect to profile if step 2
          break;
        default:
          navigate("/home"); // Redirect to home if all steps are complete
          break;
      }

    }
  }, [navigate, user]); // Runs the effect whenever `navigate` changes

  return <Outlet />; // Render the matched route component if no redirection
};

export default StepsGuard;
