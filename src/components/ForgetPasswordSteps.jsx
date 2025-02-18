import { useContext } from "react";
import { UserContext } from "../context/UserContext"; // Import UserContext to access the current user's data
import { getStepColor } from "../utils/getStepColor"; // Import utility function to get the color based on the step

const ForgetPasswordSteps = () => {
  // Destructure user data from UserContext
  const { user } = useContext(UserContext);

  return (
    <div className="text-center mb-8">
      {/* Step navigation container */}
      <div className="flex justify-around items-center steps">

        {/* Step 1 - Register */}
        <div className="flex flex-col items-center space-y-2 step">
          {/* Step circle */}
          <div
            className={`w-8 h-8 rounded-full ${getStepColor(1, "/verify-email", user?.phase || 0)} text-white flex items-center justify-center`}
          >
            <span>1</span>
          </div>
          {/* Step description */}
          <p className="text-xs text-gray-600">Verify Email</p>
        </div>

        {/* Step 2 - Verify Email */}
        <div className="flex flex-col items-center space-y-2 step">
          {/* Step circle */}
          <div
            className={`w-8 h-8 rounded-full ${getStepColor(2, "/verify-code", user?.phase)} text-white flex items-center justify-center`}
          >
            <span>2</span>
          </div>
          {/* Step description */}
          <p className="text-xs text-gray-600">Verify Code</p>
        </div>

        {/* Step 3 - Complete Profile */}
        <div className="flex flex-col items-center space-y-2 step">
          {/* Step circle */}
          <div
            className={`w-8 h-8 rounded-full ${getStepColor(3, "/change-password", user?.phase)} text-white flex items-center justify-center`}
          >
            <span>3</span>
          </div>
          {/* Step description */}
          <p className="text-xs text-gray-600">Change Password</p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordSteps;
