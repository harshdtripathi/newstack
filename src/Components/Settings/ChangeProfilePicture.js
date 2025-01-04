import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateDisplayPicture } from '../../services/operations/SettingsAPI';
import { setLoading } from '../../slices/authSlice';
import toast from 'react-hot-toast';

const ChangeProfilePicture = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [imagefile, setImagefile] = useState(null);
  const [preview, setPreview] = useState(null); // State to store the preview image URL

  const handleFileUpload = () => {
    try {
      setLoading(true); // Start loading
      const fileInput = document.getElementById("fileInput");

      if (fileInput && fileInput.files.length > 0) {
        const selectedFile = fileInput.files[0];
        setImagefile(selectedFile); // Set selected file

        const formdata = new FormData();
        formdata.append("displaypicture", selectedFile);

        // Dispatch update display picture action
        dispatch(updateDisplayPicture(token, formdata));
        setLoading(false);
      } else {
        toast.error("Please select a file first.");
        setLoading(false); // Set loading to false on failure
      }
    } catch (e) {
      setLoading(false); // Set loading to false on error
      toast.error(e.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Set the preview to the file URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center mx-auto   bg-richblack-900 px-4 py-8 overflow-hidden">
      <div className="bg-richblack-700 p-6 w-32 h-32 rounded-full  flex items-center justify-center">
  <img
    src={preview || user.image} // Show preview or fallback to the current image
    alt="Profile"
    className="w-full h-full rounded-full object-cover border-4 border-richblack-500"
  />
</div>

      <div className="flex flex-col items-center justify-center mb-6">

        <h2 className="text-sm font-medium flex  mb-4">Change Profile Picture</h2>
        <div className="flex flex-row gap-4">
          {/* Trigger file input on click */}
          <button
            onClick={() => document.getElementById("fileInput").click()}
            className="cursor-pointer py-2 px-5 bg-richblack-700 rounded-lg text-richblack-50 items-center bg-richBlack-800 font-semibold hover:bg-richblack-600 transition-all duration-300"
          >
            Select File
          </button>

          {/* Hidden file input */}
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleFileChange} // Handle file selection and preview
            className="hidden"
          />

          <button
            onClick={handleFileUpload}
            disabled={loading}
            className="cursor-pointer py-2 px-5 bg-richblack-700 rounded-lg text-richblack-50 bg-richBlack-800 font-semibold hover:bg-richblack-600 transition-all duration-300 disabled:bg-gray-500"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

    </div>
  );
};

export default ChangeProfilePicture;
