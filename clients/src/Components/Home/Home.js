import React, { useEffect, useState } from "react";

import Intro from "./Intro";
import List from "./List";
import Category from "./Category"
import Projo from "./Projo";

function Home() {
  const [users, setUsers] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "https://pitch-crest.onrender.com/user_investors";
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUsers(data.User_investors);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
 
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <section id="landing">
        <Intro />
      </section>
      <section id="projects" className="flex flex-col justify-center items-center mr-24 ml-24 mt-2">
        <div className="custom-grid">
          <div className="custom-grid-item"><Category/></div>
          <div className="custom-grid-item">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {users && <List users={users} />}
          </div>
          <div className="custom-grid-item"><Projo /></div>
        </div>
      </section>
    </>
  );
}

export default Home;
