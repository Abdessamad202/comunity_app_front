import { useMutation, useInfiniteQuery } from "@tanstack/react-query";
import { addComment, deleteComment, updateComment, getCommetsPost } from "../api/apiCalls";
import { useContext, useState } from "react";
import { Avatar, Button, Typography } from "@material-tailwind/react";
import { NotificationContext } from "../context/NotificationContext";
import { UserContext } from "../context/UserContext";
import { CommentsContext } from "../context/CommentsContext";
import CommentItem from "./CommentItem";
import DeleteModal from "./DeleteModal";
import { formatDistanceToNow } from "date-fns";
import AddComment from "./AddComment";
import CommentAdding from "./CommentAdding";

// Main Component
export default function CommentsSection() {
  const notify = useContext(NotificationContext);
  const { user } = useContext(UserContext);
  const {post} = useContext(CommentsContext)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [pendingComment, setPendingComment] = useState(null);
  const [formData, setFormData] = useState({ content: "" });

  // Fetch Comments using Infinite Query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", post.id],
    queryFn: ({ pageParam = 1 }) => getCommetsPost(post.id, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const { mutate: deleteCommentMutation, isPending: deletePending } = useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      notify("success", "Comment deleted successfully");
      setDeleteModalOpen(false);
      setCommentToDelete(null);
    },
    onError: () => {
      notify("error", "Failed to delete comment");
      setDeleteModalOpen(false);
      setCommentToDelete(null);
    },
  });

  const { mutate: addCommentMutation, isPending: commentPending } = useMutation({
    mutationFn: ({ id, data }) => addComment(id, data),
    onMutate:()=>{
      setPendingComment({
        id: data?.pages?.[0]?.total + 1,
        content: formData.content,
        created_at: new Date().toISOString(),
        user: user,
      });
    },
    onSuccess: () => {
      notify("success", "Comment added successfully");
      setFormData({ content: "" });
    },
  });
  console.log(formData);

  const { mutate: updateCommentMutation } = useMutation({
    mutationFn: ({ id, data }) => updateComment(id, data),
    onSuccess: () => {
      notify("success", "Comment updated successfully");
      setFormData({ content: "" });
    },
  });

  const handleAddComment = () => {
    if (formData.content.trim()) {
      addCommentMutation({ id: post.id, data: formData });
    }
  };

  const handleDeleteComment = (commentId) => {
    setCommentToDelete(commentId);
    setDeleteModalOpen(true);
  };

  const isCommentOwner = (comment) => comment?.user?.id === user?.id;

  return (
    <div className="m-6 pt-4">
      <Typography variant="h6" color="blue-gray" className="mb-4">
        Comments ({data?.pages?.[0]?.total ?? 0})
      </Typography>

      <AddComment formData={formData} setFormData={setFormData} handleAddComment={handleAddComment} commentPending={commentPending} />
      <CommentAdding commentPending={commentPending} pendingComment={pendingComment} />

      {data?.pages?.map((page) =>
        page.comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onDelete={handleDeleteComment}
            isCommentOwner={isCommentOwner}
            onUpdate={(commentId, content) => updateCommentMutation({ id: commentId, data: { content } })}
          />
        ))
      )}

      {hasNextPage && (
        <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} className="mt-4">
          {isFetchingNextPage ? "Loading more..." : "Load More"}
        </Button>
      )}

      <DeleteModal
        isOpen={deleteModalOpen}
        title="Are you sure you want to delete this comment?"
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => deleteCommentMutation(commentToDelete)}
        isDeleting={deletePending}
      />
    </div>
  );
}
