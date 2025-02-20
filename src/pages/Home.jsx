import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, logOut } from "../api/apiCalls";
import { useNavigate } from "react-router";
import { NotificationContext } from "../context/NotificationContext";

const Home = () => {
  // notification
  const notify = useContext(NotificationContext);
  // context
  const { user, setUser } = useContext(UserContext);

  // router
  const navigate = useNavigate();

  // query
  const { data: profile, isLoading: isGettingUser, error } = useQuery({
    queryKey: ['user', user?.profileId], // ✅ Update query key to include user ID
    queryFn: () => getUser(user.profileId),
    enabled: !!user?.profileId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  // mutations
  const { mutate: logOutMutation, isPending: isLogout } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      notify("success", "Logged out successfully");
      setUser({});
      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // handlers
  const handleLogOut = (e) => {
    e.preventDefault();
    logOutMutation();
  };

  if (error) {
    return (
      <div className="p-6 flex flex-col items-center">
        <p>Error fetching profile. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col items-center">
      {(isGettingUser || isLogout) && (
        <div className="mt-6 flex justify-center">
          <div className="w-10 h-10 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      {!isGettingUser && !isLogout && profile && (
        <>
          <h1 className="text-2xl font-bold text-indigo-600">Welcome to the App</h1>
          <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Profile Data:</h2>
            <p className="text-gray-600"><strong>Name:</strong> {profile.name}</p>
            <p className="text-gray-600"><strong>Email:</strong> {profile.user?.email || "Not available"}</p>
            <p className="text-gray-600"><strong>Sex:</strong> {profile.gender}</p>
            <p className="text-gray-600"><strong>Date of Birth:</strong> {profile.date_of_birth}</p>
          </div>
        </>
      )}

      <button
        onClick={handleLogOut}
        className="mt-4 text-indigo-600 hover:text-indigo-500 font-medium cursor-pointer"
        disabled={isLogout || isGettingUser} // Disable while fetching or logging out
      >
        {isLogout ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
};

export default Home;
