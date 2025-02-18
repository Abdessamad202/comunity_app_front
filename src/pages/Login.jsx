import { Mail } from "lucide-react";
import LoginForm from "../components/LoginForm";
import FormHeader from "../components/FormHeader";
import SubmitBar from "../components/SubmitBar"; // Import SubmitBar
import { motion } from "framer-motion"; // Import motion from framer-motion

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Apply motion.div to animate the container */}
      <motion.div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8"
        initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and slightly down
        animate={{ opacity: 1, y: 0 }}   // Animate to opacity 1 and original position
        transition={{ duration: 0.6 }}    // Set the duration of the animation
      >
        {/* Use SubmitBar Component */}
        <SubmitBar />

        <FormHeader title={"Welcome Back"} description={"Please sign in to continue"}>
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-indigo-600" />
          </div>
        </FormHeader>

        <LoginForm />
      </motion.div>
    </div>
  );
};

export default Login;
