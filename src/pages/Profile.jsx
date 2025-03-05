import { Bookmark, Calendar, Heart, MapPin, MessageSquare, Share2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router"; // Fixed import
import { UserContext } from "../context/UserContext";
import { getUserPosts } from "../api/apiCalls";
import { useQuery } from "@tanstack/react-query";
import Post from "../components/Post";

const ProfilePage = () => {
  const { posts, setPosts, user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("posts");

  const { data: postsData, isLoading, isRefetching, isSuccess, error } = useQuery({
    queryKey: ["posts", user?.id],
    queryFn: () => getUserPosts(user.id),
    staleTime: 300000, // 5 minutes, keep data fresh in cache
    cacheTime: 600000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  useEffect(() => {
    if (postsData) {
      setPosts(postsData);
    }

  }, [postsData, setPosts]);
  return (
    <main className="pt-20 pb-16 max-w-6xl mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg"></div>
          <div className="px-6 pb-6">
            <div className="flex justify-between items-end -mt-16">
              {/* Profile Image */}
              <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                {user?.profile?.picture ? (
                  <img src={user.profile.picture} alt="User Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              <button className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition">
                Edit Profile
              </button>
            </div>

            {/* Profile Info */}
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-gray-900">{user?.profile?.name || "John Doe"}</h2>
              <p className="text-gray-600">@{user?.profile?.username || "johndoe"}</p>
              <p className="mt-2 text-gray-700">
                {user?.profile?.bio || "Digital creator and tech enthusiast. Sharing my journey in web development and design."}
              </p>

              {/* Additional Info */}
              <div className="flex flex-wrap gap-4 mt-4 text-gray-600 text-sm">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-gray-500" /> {user?.profile?.location || "New York, USA"}
                </span>
                <span className="flex items-center">
                  <Link to={user?.profile?.website || "#"} className="flex items-center hover:text-blue-600">
                    <span className="mr-1">
                      <Calendar className="w-4 h-4 text-gray-500" />
                    </span>
                    {user?.profile?.website || "website.com"}
                  </Link>
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-gray-500" /> {user?.profile?.joined || "Joined 2024"}
                </span>
              </div>

              {/* Stats */}
              <div className="flex space-x-6 mt-4 text-gray-800 font-semibold">
                <span>{user?.profile?.following || "1,234"} <span className="text-gray-500">Following</span></span>
                <span>{user?.profile?.followers || "5,678"} <span className="text-gray-500">Followers</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            {["posts", "media", "likes"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 font-medium ${activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Profile Posts */}
        {activeTab === "posts" && (
          <div>
            {isLoading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-gray-200 animate-pulse p-4 rounded-lg shadow-lg">
                    <div className="w-full h-60 bg-gray-300 rounded-lg"></div>
                    <div className="mt-3 h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <p className="text-center text-red-500">Error fetching posts: {error.message}</p>
            ) : (
              <div className="flex flex-wrap ">
                <div className="flex flex-col w-full lg:w-1/2">
                  {postsData?.filter((_, index) => index % 2 === 0).map((post, index) => (
                    <div key={index} className="h-fit p-1">
                      <Post post={post} />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col w-full lg:w-1/2">
                  {postsData?.filter((_, index) => index % 2 !== 0).map((post, index) => (
                    <div key={index} className="h-fit p-1">
                      <Post post={post} />
                    </div>
                  ))}
                </div>
              </div>
              // <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              //   {postsData?.map((post, index) => (
              //     <div key={index} className="h-fit p-1">
              //       <Post post={post} />
              //     </div>
              //   ))}
              // </div>





            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default ProfilePage;
