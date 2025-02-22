import {
  Dialog,
  DialogHeader,
  DialogBody,
  Avatar,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import CommentsSection from "./CommentsSection";

export default function ModalWithImage({ handleOpen, open, post }) {

  return (
    <Dialog size="sm"  open={open} handler={handleOpen} className="h-[80vh] overflow-auto rounded-lg z-1">
      {/* Header Section */}
      <DialogHeader className="flex justify-between items-center pb-2">
        <div className="flex items-center gap-3">
          <Avatar size="sm" variant="circular" alt={post?.user?.profile?.name} src={post?.user?.profile?.picture} />
          <div className="flex flex-col">
            <Typography variant="small" color="blue-gray" className="font-medium">
              {post?.user?.profile?.name}
            </Typography>
            <Typography variant="small" color="gray" className="text-xs">
              {formatDistanceToNow(new Date(post?.created_at), { addSuffix: true })}
            </Typography>
          </div>
        </div>
        <IconButton variant="text" size="sm" onClick={handleOpen}>
          ✖
        </IconButton>
      </DialogHeader>

      {/* Body Section */}
      <DialogBody className="p-4">
        {/* Post Content */}
        <div className="w-full mb-6">
          <Typography variant="paragraph" color="blue-gray" className="text-sm mb-3">
            {post?.content}
          </Typography>
          <img alt="Post" className="w-full h-[20rem] object-cover rounded-lg" src={post?.picture} />
        </div>
        <CommentsSection postId={post?.id} />
        {/* Comments Section */}
      </DialogBody>
    </Dialog>
  );
}

ModalWithImage.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
