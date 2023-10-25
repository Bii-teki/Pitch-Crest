import Profile from "./Profile"
import Card from "./Card";
import NewPost from "./NewPost";
import { useEffect, useState } from "react";



function User({ authUser, onLogout }) {
  const user_id = authUser?.id
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://pitch-crest.onrender.com/users/${user_id}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("API Response:", data); 
        setProjects(data.investors_info);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [user_id]);

  const deleteProject = (id) => {
    const new_user_projects = projects.filter(project => project.id !== id)
    setProjects(new_user_projects)
   }
  
   const addProject = (data) =>{
     const new_projects= [data, ...projects]
     setProjects(new_projects)
   }

   const updateProject = (id, updatedData) => {
    const updatedProjects = projects.map(project => {
      if (project.id === id) {
        return { ...project, ...updatedData };
      }
      return project;
    });
  
    setProjects(updatedProjects);
  };
  

  const handleLogout = () => {

    onLogout();
};

  return (
<>
    <section id="projects" className="flex flex-col justify-center items-center mr-6 mt-2">
    <div className="custom-grid">
   
      <div className="custom-grid-item"><Profile/></div>
      <div className="custom-grid-item"> 
      <div>        
           
      
        </div>      
       
        <Card projects={projects} loading={loading} error={error} deleteProject={deleteProject} updateProject={updateProject}/>
      </div>
      <div className="custom-grid-item"> 
      <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 mr-10 rounded">
      {authUser.name}
    </button>
       <button 
      onClick={handleLogout} 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
      Logout
    </button>
       <NewPost users_id ={user_id} addProject={addProject}/></div>
    </div>
  </section>
   
    </>
  );
}

export default User;
