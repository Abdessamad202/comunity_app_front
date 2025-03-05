import { MoreVertical, Trash, Edit } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const CommentOptions = ({ onEdit, onDelete }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpenDropdown(!openDropdown)}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none"
        aria-label="Comment options"
      >
        <MoreVertical className="w-4 h-4 text-gray-500" />
      </button>
      {openDropdown && (
        <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 transition-colors duration-200"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors duration-200"
          >
            <Trash className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};

CommentOptions.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CommentOptions;
