import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getPosts } from "../api/apiCalls";
import Post from "./Post";
import LoadingDots from "./LoadingDots";
// import { useContext } from "react";
// import { CommentsContext } from "../context/CommentsContext";

const Posts = () => {
  const { ref, inView } = useInView();
  const {
    data: { pages = [] } = {}, // Destructure to avoid errors if pages is undefined
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    getNextPageParam: (lastPage) => {
      // Ensure lastPage is not undefined and has nextPage
      return lastPage?.nextPage ?? null;
    },
    staleTime: 300000, // 5 minutes: Data stays fresh in cache for 5 minutes
    refetchOnWindowFocus: true, // Refetch data when the window regains focus
    refetchInterval: 600000, // Refetch every 10 minutes
  });

  // Trigger fetching next page when the user is in view
  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  return (
    <div className="">

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
        <div className="grid grid-cols-1 gap-6">
          {pages.map((page, pageIndex) => (
            <div key={pageIndex} className="space-y-6">
              {page.posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Loading more posts when near the bottom */}
      <div ref={ref} className="h-20 flex justify-center items-center">
        {isFetchingNextPage && <LoadingDots />}
      </div>
    </div>
  );
};

export default Posts;
