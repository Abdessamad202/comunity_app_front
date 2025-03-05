import { Heart, MessageCircle } from "lucide-react";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatDistanceToNow } from "date-fns";
import { likeOrUnlikePost } from "../api/apiCalls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NotificationContext } from "../context/NotificationContext";
import ModalWithImage from "./Modal";
import { CommentsContext } from "../context/CommentsContext.jsx";
import PostOptions from "./PostOptions.jsx";
import { UserContext } from "../context/UserContext";
const fallbackImage = "https://via.placeholder.com/600x400?text=No+Image"; // صورة افتراضية

const Post = ({ post }) => {
  const [open, setOpen] = useState(false);
  // const [isFavorite, setIsFavorite] = useState(false);
  const [comments, setComments] = useState(post?.comments_count);
  // console.log(post ,comments);

  const { user } = useContext(UserContext);
  const handleOpen = () => setOpen((cur) => !cur);
  // const handleIsFavorite = () => setIsFavorite((cur) => !cur);
  const notify = useContext(NotificationContext);
  const queryClient = useQueryClient();

  // تحقق من أن المستخدم قام بالإعجاب بالمنشور
  const [likes, setLikes] = useState(post?.likes_count);
  const [isLiked, setIsLiked] = useState(post?.liked);
  // console.log(isLiked);

  const { mutate: likePostMutation } = useMutation({
    mutationFn: ({ id, isLiked }) => (likeOrUnlikePost(id, isLiked)),
    onMutate: () => {
      setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
      setIsLiked((prevIsLiked) => !prevIsLiked);
    },
    onSuccess: (data) => {
      notify("success", data.message);
    },
    onError: (error) => {
      notify("error", error.response?.data?.message || "Something went wrong");
    }
  });
  const isCommentOwner = (post) => post?.user?.id === user?.id;
  return (
    <CommentsContext.Provider provider value={{comments, setComments, post , open , handleOpen}}>
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 transition-transform duration-300 ">
        {/* معلومات المستخدم */}
        {/* {JSON.srtingify(isLiked.toString())} */}
        <div className="flex justify-between items-center">
          <div className="flex items-center py-2">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={post?.user?.profile?.picture}
              alt={post?.user?.profile?.name}
            />
            <div className="ml-3">
              <span className="font-semibold">{post?.user?.profile?.name}</span>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(post?.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
            {isCommentOwner(post) && (
                <PostOptions postId={post?.id} />
              )}

        </div>

        {/* صورة المنشور */}
        <p className="mt-3">{post?.content}</p>

        <LazyLoadImage
          src={post?.picture}
          alt="Post"
          effect="blur"
          placeholderSrc={fallbackImage}
          className="md:w-full sm:w-3/4 mt-4 object-cover rounded-lg"

        />

        {/* محتوى المنشور */}

        {/* أزرار الإعجاب والتعليق */}
        <div className="flex items-center mt-4 space-x-4">
          {/* زر الإعجاب */}
          <button className="flex items-center text-pink-500">
            <Heart
              className={`w-5 h-5 transition cursor-pointer ${isLiked ? "fill-pink-600 text-pink-600" : " text-pink-600"
                }`}
              onClick={() => likePostMutation({ id: post?.id, isLiked })}
            />
            <span className="ml-1 text-sm">Like</span>
            <span className="ml-2 text-sm">{likes}</span>
          </button>
          {/* زر التعليق */}
          <button className="flex items-center text-gray-500 hover:text-gray-600" onClick={handleOpen}>
            <MessageCircle className="w-5 h-5" />
            <span className="ml-1 text-sm">Comment</span>
            <span className="ml-2 text-sm">{comments}</span>
          </button>
        </div>
        <ModalWithImage />
      </div>
    </CommentsContext.Provider>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
