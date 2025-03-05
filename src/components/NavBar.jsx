import { Link, useLocation } from "react-router";
import { Bell, Home, MessageCircle, User } from "lucide-react";

const NavBar = () => {
  const {pathname} = useLocation();

  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-indigo-600">SocialApp</h1>
          <div className="flex space-x-4">
            <Link
              to="/home"
              className={`p-2 ${pathname === "/home" ? "text-indigo-600" : "text-gray-600"}`}
            >
              <Home />
            </Link>
            <Link
              to="/messages"
              className={`p-2 ${pathname === "/messages" ? "text-indigo-600" : "text-gray-600"}`}
            >
              <MessageCircle />
            </Link>
            <Link
              to="/notifications"
              className={`p-2 ${pathname === "/notifications" ? "text-indigo-600" : "text-gray-600"}`}
            >
              <Bell />
            </Link>
            <Link
              to="/profile"
              className={`p-2 ${pathname === "/profile" ? "text-indigo-600" : "text-gray-600"}`}
            >
              <User />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
