import React, { useState } from "react";

function DeletePost({ onClose, id,  deleteProject}) {
  console.log(id);
  const userId = id;
  const [isDeleted, setIsDeleted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleConfirmDelete = () => {
    fetch(`https://pitch-crest.onrender.com/users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        deleteProject(id)
        console.log("User investor deleted successfully:", data.message);
        setSuccessMessage("User investor deleted successfully!");
        onClose();
      })
      .catch((error) => {
        console.error("Error deleting user investor:", error);
      });
  };

  const handleClose = () => {
    setIsDeleted(true);
    onClose();
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-4 rounded shadow-lg text-center">
        <div className="text-center p-5 flex-auto justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-16 h-16 flex items-center text-red-500 mx-auto"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <p className="text-xl font-bold mb-4">Confirm Deletion</p>
          <p>Are you sure you want to delete this user Poject?</p>
        </div>
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <div className="mt-4">
          <button
            onClick={handleConfirmDelete}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Confirm Delete
          </button>
          <button
            onClick={handleClose}
            className="bg-gray-200 px-4 py-2 rounded ml-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePost;
