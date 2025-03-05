import { Avatar, Typography } from "@material-tailwind/react";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";

const CommentAdding = ({ commentPending, pendingComment }) => {
  if (!commentPending) return null; // Prevent rendering when false

  return (
    <div className="flex items-start mb-4 opacity-50">
      <Avatar
        size="sm"
        variant="circular"
        alt={pendingComment?.user?.profile?.name}
        src={pendingComment?.user?.profile?.picture}
      />
      <div className="ml-3 flex-1">
        <div className="flex justify-between items-center">
          <Typography variant="small" color="blue-gray" className="font-medium">
            {pendingComment?.user?.profile?.name}
          </Typography>
          <Typography variant="small" color="gray" className="text-xs">
            {formatDistanceToNow(new Date(pendingComment?.created_at), { addSuffix: true })}
          </Typography>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg mt-2 text-sm">
          {pendingComment?.content}
        </div>
      </div>
    </div>
  );
};

// Add PropTypes for type safety
CommentAdding.propTypes = {
  commentPending: PropTypes.bool.isRequired,
  pendingComment: PropTypes.object,
};

export default CommentAdding;
