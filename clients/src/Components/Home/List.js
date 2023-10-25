import React, { useState } from "react";
import Projects from "./Projects";
import Search from "./Search";

function List({ users }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [project, setProject] = useState("");

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType("");
  };

  const handleViewClick = (projectId) => {
    setIsModalOpen(true);
    setModalType("view");
    setProject(projectId)
  };

 
  if (!users || !users.length) {
    return <p>No users available.</p>;
  }

  return (
    <>
      <Search />
      <div className="flow-root mt-4 max-h-screen overflow-y-auto col-span-2">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          
          {users.map((user) => (
            <li key={user.id} className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    <div>
                      <a className="flex items-center" href="#">
                        <img
                          className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
                          src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80"
                          alt="avatar"
                        />
                        <h1 className="text-gray-700 font-bold">
                          Khatab wedaa
                        </h1>
                      </a>
                    </div>
                  </p>
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    <div className="flex justify-between items-center">
                      <span className="font-light text-gray-600">
                        Posted on: {user.created_at}
                      </span>
                      <button
                        type="button"
                        className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
                        onClick={()=> handleViewClick(user.id)}
                      >
                        Read More
                      </button>
                    </div>
                    {user.name}
                  </p>
                  <div className="mt-2">
                    <a
                      className="text-2xl text-gray-700 font-bold hover:text-gray-600"
                      href="#"
                    >
                      {user.projects}
                    </a>
                    <p className="mt-2 text-gray-600">
                      {user.description.substring(0, 200)}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {user.category}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    <p>{user.description.substring(0, 100)}</p>
                  </p>
                </div>
              </div>
              
            </li>
          ))}
        </ul>
        {isModalOpen && modalType === "view" && ( <Projects id={project} onClose={handleCloseModal} />
              )}
      </div>
    </>
  );
}

export default List;
