import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

export const UserProvider = ({ children }) => {
  // ✅ Store user data in state, initializing from localStorage if available
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // ✅ Update localStorage whenever the user state changes
  useEffect(() => {
    user ? localStorage.setItem("user", JSON.stringify(user)) : localStorage.clear();
  }, [user]);

  // ✅ Provide user state and setUser function to the application
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

// ✅ Ensure `children` is a valid React node
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
