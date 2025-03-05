import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Image, X } from 'lucide-react';
import { addPost } from '../api/apiCalls';
import { UserContext } from '../context/UserContext';
import { NotificationContext } from '../context/NotificationContext';
const AddPost = () => {
  const { user, posts, setPosts } = useContext(UserContext);
  const [isDragging, setIsDragging] = useState(false);
  const [isImageUploadVisible, setIsImageUploadVisible] = useState(false);
  const notify = useContext(NotificationContext);
  const [formData, setFormData] = useState({
    content: '',
    picture: null,
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      content: e.target.value,
    }));
  };

  const handleImageChange = (file) => {
    if (file) {
      console.log("✅ Image selected:", file); // تأكد من وجود الصورة

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          picture: file, // ✅ تأكد بأن الصورة تخزنت
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      console.log("⚠️ No file selected!");
    }
  };


  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
    setIsDragging(false);
  };

  const toggleImageUpload = () => {
    setIsImageUploadVisible(!isImageUploadVisible);
    if (isImageUploadVisible) {
      setFormData((prev) => ({
        ...prev,
        picture: null,
        imagePreview: null,
      }));
    }
  };
  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: (data) => addPost(data), // Send post data to backend
    onMutate: () => {
      notify("info", "Posting...");
    },
    onSuccess: async(data) => {
      console.log("✅ Post created successfully:", data);

      await queryClient.cancelQueries({ queryKey: ['posts', user.id] });

      // Ensure old data is always an array
      queryClient.setQueryData(['posts', user.id], (old = []) => [data.post, ...old]);

      notify("success", data.message);
      setFormData({ content: '', picture: null, imagePreview: null });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', user.id] });
    },

    onError: (error) => {
      console.error("❌ Error submitting post:", error.message || error);
      notify("error", "Failed to post. Please try again.");
    }
  });




  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('content', formData.content);

    if (formData.picture) {
      console.log("📸 Picture is being added:", formData.picture); // ✅ تأكد من وجود الصورة
      data.append('picture', formData.picture, formData.picture.name);
    } else {
      console.log("⚠️ No picture found!"); // ❌ إذا الصورة فارغة
    }
    console.log(data.getAll(['picture', 'content']));

    // ✅ طبع كل القيم لي غادي يتسيفطو
    for (let pair of data.entries()) {
      console.log(pair[0], pair[1]); // ✅ باش نشوفو `FormData`
    }

    postMutation.mutate(data);
  };



  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-4"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="h-10 w-10 rounded-full bg-gray-200">
          <img
            src={user.profile.picture}
            alt="User Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <input
          name="content"
          type="text"
          value={formData.content}
          onChange={handleInputChange}
          placeholder="What's on your mind?"
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Image Preview */}
      {formData.imagePreview && (
        <div className="relative mb-4">
          <img
            src={formData.imagePreview}
            alt="Preview"
            className="w-full rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, picture: null, imagePreview: null }))}
            className="absolute top-2 right-2 bg-gray-800/70 text-white rounded-full p-1 hover:bg-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Image Upload Area */}
      {isImageUploadVisible && !formData.imagePreview && (
        <div
          className={`mb-4 relative border-2 border-dashed rounded-lg p-4 transition-colors
            ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
        >
          <div className="text-center">
            <Image className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-500">Drag and drop an image here, or</p>
            <label className="mt-2 inline-block">
              <span className="cursor-pointer text-indigo-600 hover:text-indigo-700">
                browse to upload
              </span>
              <input
                type="file"
                accept="image/*"
                name="picture"
                onChange={(e) => handleImageChange(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between pt-4 border-t border-gray-200">
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={toggleImageUpload}
            className={`flex items-center ${isImageUploadVisible ? 'text-indigo-600' : 'text-gray-600'} hover:text-indigo-600`}
          >
            <Image className="w-6 h-6 mr-2" />
            Photo
          </button>
        </div>
        <button
          type="submit"
          disabled={!formData.content.trim()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {postMutation.isLoading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </form>
  );
};

export default AddPost;
