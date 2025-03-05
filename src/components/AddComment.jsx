import { Button } from "@material-tailwind/react"
import PropTypes from "prop-types"

const AddComment = ({ formData, setFormData, handleAddComment, commentPending }) => {
  return (
    <div className="mb-6">
      <textarea
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        placeholder="Add a comment..."
        className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      <Button
        onClick={handleAddComment}
        disabled={!formData.content.trim() || commentPending}
        className="mt-2 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
      >
        {commentPending ? "Adding..." : "Add Comment"}
      </Button>
    </div>
  )
}
// props_types
AddComment.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleAddComment: PropTypes.func.isRequired,
  commentPending: PropTypes.bool.isRequired
}
export default AddComment