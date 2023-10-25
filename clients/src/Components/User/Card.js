import React, { useState } from "react"
import View from "./View"
import Update from "./Update";
import DeletePost from "./DeletePost";

function Card({ projects, loading, error, deleteProject, updateProject}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentProjectId, setCurrentProjectId] = useState(null);
 
  const handleViewClick = (projectId) => {
    setIsModalOpen(true);
    setCurrentProjectId(projectId)
    setModalType("view");
  };

  const handleUpdateClick = (projectId) => {
    setIsModalOpen(true);
    setCurrentProjectId(projectId)
    setModalType("update");
  };
  const handleDeleteClick = (projectId) => {
    setIsModalOpen(true);
    setCurrentProjectId(projectId)
    setModalType("delete");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType("");
  }

  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  if (Array.isArray(projects) && projects.length > 0) {
    return (
      <div className="max-w-4xl max-h-screen overflow-y-auto px-2 mr-4 mt-6 py-2 bg-white rounded-lg shadow-md">
      {projects.map((user) => (
        <div key={user.id} className="p-6 mb-4 border border-blue-500  bg-gray-100 rounded-lg shadow-md">
          <div>
            <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-sm text-gray-600 mt-2">{user.description}</p>
            <span className="text-sm text-gray-600 mt-2">{user.category}</span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <a onClick={() => handleViewClick(user.id)} className="text-blue-600 hover:underline" href="#">
              Read more
            </a>
          </div>
    
          <div className="flex items-center justify-center mt-4 space-x-4">
  <button
    type="button"
    className="px-3 py-1.5 bg-blue-500 text-white font-medium rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
    onClick={() => handleViewClick(user.id)}
  >
    View
  </button>

  <button
    type="button"
    onClick={() => handleUpdateClick(user.id)}
    className="px-3 py-1.5 bg-green-500 text-white font-medium rounded-md text-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
  >
    Update
  </button>

  <button
    type="button"
    onClick={() => handleDeleteClick(user.id)}
    className="px-3 py-1.5 bg-red-500 text-white font-medium rounded-md text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
  >
    Delete
  </button>
</div>

        </div>
      ))}
      {isModalOpen && modalType === "view" && (
        <View project_id={currentProjectId} onClose={handleCloseModal} />
      )}
      {isModalOpen && modalType === "update" && (
        <Update id={currentProjectId} onClose={handleCloseModal} updateProject={updateProject} />
      )}
      {isModalOpen && modalType === "delete" && (
        <DeletePost id={currentProjectId} onClose={handleCloseModal} deleteProject={deleteProject} />
      )}
    </div>
    
    );
  } else if (projects) {
    // Handle a single user investor object
    return (
      <div className="max-w-4xl max-h-screen overflow-y-auto px-2 mr-4 mt-6 py-2 bg-white rounded-lg shadow-md">
        {/* Display details for the single user investor */}
        <h1 className="text-gray-700 font-bold">{projects.name}</h1>
        <p className="font-light text-gray-600">{projects.description}</p>
        <span className="font-light text-gray-600">{projects.category}</span>
      </div>
    );
  } else {
    return <div>No user investors found.</div>;
  }
  






}

export default Card
