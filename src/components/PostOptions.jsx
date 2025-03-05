import { MoreVertical, Trash, Edit } from "lucide-react";
import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import DeleteModal from "./DeleteModal";
import { deletePost } from "../api/apiCalls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NotificationContext } from "../context/NotificationContext";
import { UserContext } from "../context/UserContext";

const PostOptions = ({ postId }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const notify = useContext(NotificationContext);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: deletePostMutation, isPending } = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: async({  message }) => {
      await queryClient.cancelQueries({ queryKey: ['posts', user.id] });
      queryClient.removeQueries({queryKey:["comments", postId]});
      // Get the current posts data and remove the deleted post
      queryClient.setQueryData(['posts', user.id], (old = []) => {
        return old.filter((item) => item.id !== postId);
      });


      // Show success notification
      notify("success", message);
      setIsOpen(false);
      setOpenDropdown(false);
    },
    onError: () => {
      notify("error", "Failed to delete post");
      setIsOpen(false);
      setOpenDropdown(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', user.id] });
    }
  });
  const onConfirm = (e) => {
    e.preventDefault();
    deletePostMutation(postId);
  }
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpenDropdown(!openDropdown)}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none"
        aria-label="Post options"
      >
        <MoreVertical className="w-4 h-4 text-gray-500" />
      </button>
      {openDropdown && (
        <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
          <button
            // onClick={onEdit}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 transition-colors duration-200"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors duration-200"
          >
            <Trash className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      )}
      <DeleteModal isOpen={isOpen} onClose={() => setIsOpen(false)} onConfirm={onConfirm} isDeleting={isPending} title="Are you sure you want to delete this post?" />
    </div>
  );
};

PostOptions.propTypes = {
  postId: PropTypes.number.isRequired,
};
export default PostOptions;
