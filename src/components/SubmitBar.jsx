import { useContext } from "react";
import { motion } from "framer-motion";
import { SubmitContext } from "../context/SubmitContext";

const SubmitBar = () => {
  const { submit } = useContext(SubmitContext);

  if (!submit) return null; // Don't render if not submitting

  return (
    <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 rounded-t-2xl overflow-hidden">
      <motion.div
        className="h-full bg-indigo-600 rounded-full"
        initial={{ x: "-50%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse", // Moves back and forth
          duration: 1.5,
          ease: "easeInOut",
        }}
        style={{ width: "50%" }} // Adjust width for smooth effect
      />
    </div>
  );
};

export default SubmitBar;
