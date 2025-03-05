import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const CommentContent = ({ comment, isCommentOwner, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    if (isCommentOwner(comment)) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    if (editedContent.trim() !== comment.content) {
      onUpdate(comment.id, editedContent);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  return isEditing ? (
    <input
      ref={inputRef}
      type="text"
      value={editedContent}
      onChange={(e) => setEditedContent(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className="w-full p-2 border border-gray-300 rounded-md mt-2 text-sm"
    />
  ) : (
    <div
      className="bg-gray-100 p-3 rounded-lg mt-2 text-sm cursor-pointer"
      onDoubleClick={handleDoubleClick}
    >
      {comment?.content}
    </div>
  );
};

CommentContent.propTypes = {
  comment: PropTypes.object.isRequired,
  isCommentOwner: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CommentContent;
