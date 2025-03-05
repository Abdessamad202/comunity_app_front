import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

const Layout = () => {
  
  return (
    <>
      <NavBar />
      <div className=""> {/* Push content down to avoid overlap with fixed navbar */}
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
