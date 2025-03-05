import { useEffect } from "react";
import { useLocation } from "react-router"; // Use react-router's useLocation hook to track the route changes

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page on route change
  }, [location]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
