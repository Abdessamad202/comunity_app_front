import { Avatar, Typography } from "@material-tailwind/react";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import CommentOptions from "./CommentOptions";
import CommentContent from "./CommentContent";
import { useState } from "react";

const CommentItem = ({ comment, onDelete, onUpdate, isCommentOwner }) => {
  const [editedComment, setEditedComment] = useState(comment);

  const handleUpdate = (commentId, newContent) => {
    const updatedComment = { ...editedComment, content: newContent };
    setEditedComment(updatedComment);
    onUpdate(commentId, newContent);
  };

  return (
    <div className="flex items-start mb-6">
      <Avatar size="sm" variant="circular" alt={editedComment?.user?.profile?.name} src={editedComment?.user?.profile?.picture} />
      <div className="ml-3 flex-1">
        <div className="flex justify-between items-center">
          <Typography variant="small" color="blue-gray" className="font-medium">
            {editedComment?.user?.profile?.name}
          </Typography>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(editedComment?.created_at), { addSuffix: true })}
            </span>
            {isCommentOwner(editedComment) && (
              <CommentOptions
                onEdit={() => handleUpdate(editedComment.id, editedComment.content)}
                onDelete={() => onDelete(editedComment.id)}
              />
            )}
          </div>
        </div>
        <CommentContent comment={editedComment} isCommentOwner={isCommentOwner} onUpdate={handleUpdate} />
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  isCommentOwner: PropTypes.func.isRequired,
};

export default CommentItem;
