import React, { useState } from 'react';
import Home from './Home/Home';
import User from './User/User';
import Contact from './Contact';
import SignUp from './SignUp';
import Login from "./Login";

function Navbar() {
  const [activePage, setActivePage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleLogout = () => {
    setActivePage('home');
    setIsLoggedIn(false);
  };

  const renderContent = () => {
    if (isLoggedIn) {
      switch (activePage) {
        case 'home':
          return <Home />;
        case 'user':
          return <User />;
        case 'contact':
          return <Contact />;
        default:
          return null;
      }
    } else {
      switch (activePage) {
        case 'home':
          return <Home />;
        case 'contact':
          return <Contact />;
          case 'user':
          return <User />;  
        case 'signup':
          return <SignUp />;
        case 'login':
          return <Login onLogin={() => setIsLoggedIn(true)} />;
        default:
          return null;
      }
    }
  };

  return (
    <>
      <div>
        <div className="navbar bg-gray-300 flex justify-between  sticky top-0 items-center p-6 shadow-lg">
          <h1 className="text-5xl ml-60 font-extrabold">
            <span className="text-blue-500">Pitch</span><span className="text-teal-500">Crest</span>
          </h1>
          <ul className="links flex mr-40 space-x-4">
            <li><a href="#home" className="text-blue-500" onClick={() => handlePageChange('home')}>Home</a></li>
            {isLoggedIn ? (
              <li><a href="#user" className="text-blue-500" onClick={() => handlePageChange('user')}>User</a></li>
            ) : (
              <li><a href="#signup" className="text-blue-500" onClick={() => handlePageChange('signup')}>Sign up</a></li>
            )}
            <li><a href="#contact" className="text-blue-500" onClick={() => handlePageChange('contact')}>Contact</a></li>
            {isLoggedIn ? (
              <li><button className="text-blue-500" onClick={handleLogout}>Logout</button></li>
            ) : (
              <li><a href="#login" className="text-blue-500" onClick={() => handlePageChange('login')}>Login</a></li>
            )}
          </ul>
        </div>
        {renderContent()}
      </div>
    </>
  );
}

export default Navbar;
