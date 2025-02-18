import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import { UserContext } from "../context/UserContext";

const ForgetPasswordGuard = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const {user} = useContext(UserContext);
  useEffect(() => {
    // Retrieve user data from localStorage
    // const token = user.token;
    const phase = user?.phase;
    const profileId = user?.profileId;
    console.log(user);

    // Check if the user is logged in
    if ( !phase ) {
      navigate("/verify-email"); // Redirect to registration if no token
    }
    else if (profileId){
      navigate("/home"); // Redirect to home if all steps are complete
    }
    else {
      switch (phase) {
        case 1:
          navigate("/verify-code"); // Redirect to verification if step 1
          break;
        case 2:
          navigate("/change-password"); // Redirect to profile if step 2
          break;
        default:
          break;
      }
    }
  }, [navigate, user]); // Runs the effect whenever `navigate` changes

  return <Outlet />; // Render the matched route component if no redirection
};

export default ForgetPasswordGuard;
