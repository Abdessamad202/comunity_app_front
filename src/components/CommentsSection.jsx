import { useMutation, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { addComment, getCommetsPost } from "../api/apiCalls";
import { useContext, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, Button, Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useInView } from "react-intersection-observer";
import LoadingDots from "./LoadingDots";
import { NotificationContext } from "../context/NotificationContext";

export default function CommentsSection({ postId }) {
  const queryClient = useQueryClient();
  const  notify = useContext(NotificationContext);
  const [formData, setFormData] = useState({ content: "" });
  const { ref, inView } = useInView();
    const {
      data: comments,
      isLoading,
      // error,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    } = useInfiniteQuery({
      queryKey: ["comments",postId],
      queryFn: ({ pageParam = 1 }) => getCommetsPost(postId, pageParam),
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  // const { ref, inView } = useInView();

  // // Use Infinite Query to fetch paginated comments
  // const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
  //   queryKey: ["comments", postId],
  //   queryFn: ({ pageParam = 1 }) => getCommetsPost(postId, pageParam),
  //   getNextPageParam: (lastPage) => lastPage.nextPage || false,
  // });

  // if (inView && hasNextPage && !isFetchingNextPage) {
  //   fetchNextPage();
  // }
  // Mutation for adding a comment
  const { mutate: addCommentMutation, isPending: commentPending } = useMutation({
    mutationFn: ({ id, data }) => addComment(id, data),
    onSuccess: () => {
      notify("success", "Comment added successfully");
      queryClient.invalidateQueries(["comments", postId]);
      setFormData({ content: "" });
    },
  });

  const handleAddComment = () => {
    if (formData.content.trim()) {
      addCommentMutation({ id: postId, data: formData });
    }
  };

  return (
    <div className="mt-6 pt-4">
      <Typography variant="h6" color="blue-gray" className="mb-4">
        Comments ({comments?.pages[0]?.total}) {/* Use totalComments from the first page */}
      </Typography>


      {/* Show Loading Skeleton if data is loading */}
      {isLoading ? (
        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-gray-200 animate-pulse p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <Avatar size="sm" variant="circular" className="bg-gray-300" />
                <div className="ml-3 w-full">
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
              <div className="mt-3 h-4 bg-gray-300 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : (
        // Render real comments after data is loaded
        comments?.pages?.map((page, pageIndex) => (
          <div key={pageIndex}>
            {console.log(comments)}
            {page.comments?.map((comment, index) => (
              <div key={index} className="flex items-start mb-4">
                <Avatar size="sm" variant="circular" alt={comment?.user?.profile?.name} src={comment?.user?.profile?.picture} />
                <div className="ml-3 w-full">
                  <div className="flex justify-between items-center">
                    <Typography variant="small" color="blue-gray" className="font-medium">
                      {comment?.user?.profile?.name}
                    </Typography>
                    <Typography variant="small" color="gray" className="text-xs">
                      {formatDistanceToNow(new Date(comment?.created_at), { addSuffix: true })}
                    </Typography>
                  </div>
                  <Typography variant="paragraph" color="blue-gray" className="bg-gray-100 p-2 rounded-lg mt-1 text-sm">
                    {comment?.content}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
      <div ref={ref}>
      {isFetchingNextPage &&(
      <div className="h-20 flex justify-center items-center">
        <LoadingDots />
      </div>)}</div>
      {/* Add Comment Section */}
      <div className="mt-6">
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Add a comment..."
          className="w-full h-20 p-2 rounded-lg resize-none"
        />
        <Button onClick={handleAddComment} color="blue" className="mt-2 w-full" disabled={!formData.content.trim() || commentPending}>
          {commentPending ? "Adding..." : "Add Comment"}
        </Button>
      </div>

      {/* Load more comments button */}

    </div>
  );
}

CommentsSection.propTypes = {
  postId: PropTypes.string.isRequired,
};
