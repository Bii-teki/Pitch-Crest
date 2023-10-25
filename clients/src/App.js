import React, { useState, useEffect } from "react";
import './App.css';

import Loader from "./Components/Home/Loader";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";


function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => setLoaded(true), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      {!loaded ? (
        <div className="flex w-full mt-52 justify-center">
          <Loader />
        </div>
      ) : (
        <div>
          <Navbar />        
         
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
