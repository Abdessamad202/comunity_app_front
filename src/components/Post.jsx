import { Heart, MessageCircle } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatDistanceToNow } from "date-fns";
const fallbackImage = "https://via.placeholder.com/600x400?text=No+Image"; // صورة افتراضية

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes((prevLikes) => prevLikes - 1);
      setIsLiked(false);
    }else{
      setLikes((prevLikes) => prevLikes + 1);
      setIsLiked(true);
    }
  };
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 transition-transform duration-300 "
    >
      {/* استبدال img بـ LazyLoadImage */}
      <div className="flex items-center py-2">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={post.profile.picture}
          alt={post.profile.name}
        />
        <div className="ml-3">
          <span className="font-semibold">{post.profile.name}</span>
          <p className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
          </p>
        </div>
      </div>
      <LazyLoadImage
        src={post.picture}
        alt="Post"
        effect="blur" // تأثير الضبابية أثناء التحميل
        placeholderSrc={fallbackImage}
        className="w-full h-60 object-cover rounded-lg" // إضافة block لضمان العرض الكامل
      />

      <p className="mt-3 text-gray-700 text-lg">{post.content}</p>
      <div className="flex items-center mt-4 space-x-4">
        {/* Like Button */}
        <button
          className={`flex items-center text-pink-500 `}
        >
          <Heart className={`w-5 h-5text-pink-600  ${isLiked ? "fill-pink-600" : ""} transition cursor-pointer`} onClick={handleLike}/>
          <span className="ml-1 text-sm" >Like</span>
          <span className="ml-2 text-sm">{likes}</span>
        </button>

        {/* Comment Button */}
        <button
          className="flex items-center text-gray-500 hover:text-gray-600"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="ml-1 text-sm">Comment</span>
          <span className="ml-2 text-sm">{post.comments.length}</span>
        </button>
      </div>
    </div>
  );
}
// prop-types
Post.propTypes = {
  post: PropTypes.object.isRequired
}
export default Post