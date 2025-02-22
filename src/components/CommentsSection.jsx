import { useMutation, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { addComment, getCommetsPost } from "../api/apiCalls";
import { useContext, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, Button, Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useInView } from "react-intersection-observer";
import LoadingDots from "./LoadingDots";
import { NotificationContext } from "../context/NotificationContext";
import { UserContext } from "../context/UserContext";
import { CommentsContext } from "../context/CommentsContext";
// import { profile } from "console";
// import { UserCheck } from "lucide-react";

export default function CommentsSection() {
  const { post } = useContext(CommentsContext);
  const queryClient = useQueryClient();
  const notify = useContext(NotificationContext);
  const [pendingComment, setPendingComment] = useState(null);
  const [formData, setFormData] = useState({ content: "" });

  const { comments, setComments } = useContext(CommentsContext)

  const { user } = useContext(UserContext)

  const { mutate: addCommentMutation, isPending: commentPending } = useMutation({
    mutationFn: ({ id, data }) => addComment(id, data),
    onMutate: () => {

      setPendingComment({
        content: formData.content,
        created_at: new Date().toISOString(),
        user: user,
      });
    },
    onSuccess: () => {
      setComments(prev => [pendingComment, ...prev])
      notify("success", "Comment added successfully");
      setFormData({ content: "" });
    },
  });

  const handleAddComment = () => {
    if (formData.content.trim()) {
      addCommentMutation({ id: post.id, data: formData });
    }
  };

  return (
    <div className="m-6 pt-4">
      <Typography variant="h6" color="blue-gray" className="mb-4">
        Comments ({comments.length}) {/* Use totalComments from the first page */}
      </Typography>
      <div className="mb-6">
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Add a comment..."
          className="w-full h-15 p-2 rounded-lg resize-none"
        />
        <Button onClick={handleAddComment} color="blue" className="mt-2 w-full" disabled={!formData.content.trim() || commentPending}>
          {commentPending ? "Adding..." : "Add Comment"}
        </Button>
      </div>
      {commentPending && (
        <div className="flex items-start mb-4 opacity-50">
          <Avatar size="sm" variant="circular" alt={pendingComment?.user?.profile?.name} src={pendingComment?.user?.profile?.picture} />
          <div className="ml-3 w-full">
            <div className="flex justify-between items-center">
              <Typography variant="small" color="blue-gray" className="font-medium">
                {pendingComment?.user?.profile?.name}
              </Typography>
              <Typography variant="small" color="gray" className="text-xs">
                {formatDistanceToNow(new Date(pendingComment?.created_at), { addSuffix: true })}
              </Typography>
            </div>
            <Typography variant="paragraph" color="blue-gray" className="bg-gray-100 p-2 rounded-lg mt-1 text-sm">
              {pendingComment?.content}
            </Typography>
          </div>
        </div>
      )}
      {
        comments?.map((comment, index) => (
          <div key={index} className="flex items-start mb-4">
            <Avatar size="sm" variant="circular" alt={comment?.user?.profile?.name} src={comment?.user?.profile?.picture} />
            <div className="ml-3 w-full">
              <div className="flex justify-between items-center">
                <Typography variant="small" color="blue-gray" className="font-medium">
                  {comment?.user?.profile?.name}
                </Typography>
                <Typography variant="small" color="gray" className="text-xs">
                  {formatDistanceToNow(comment?.created_at, { addSuffix: true })}
                </Typography>
              </div>
              <Typography variant="paragraph" color="blue-gray" className="bg-gray-100  p-2 rounded-lg mt-1 text-sm">
                {comment?.content}
              </Typography>
            </div>
          </div>
        ))}
    </div>
  );
}

CommentsSection.propTypes = {
  post: PropTypes.object.isRequired,
};
