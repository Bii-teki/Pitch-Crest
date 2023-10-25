import React, { useState } from 'react';
import User from './User/User';
import jwt_decode from "jwt-decode";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://pitch-crest.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const authenticatedUser = data.access_token;
            // console.log('User ID:', data.user_id);
            
            // const users_id = data.user_id
            

            if (authenticatedUser) {
                onLogin(authenticatedUser);
                
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Error authenticating:', error);
            alert('Error authenticating. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authUser, setAuthUser] = useState(null);  

   
    const handleLogin = (authenticatedUser) => {
        // Store user data in localStorage
        localStorage.setItem('authToken', authenticatedUser);
        const decoded_user = jwt_decode(authenticatedUser)
        setAuthUser(decoded_user.sub)
        console.log(decoded_user.sub);
        // localStorage.setItem('user_id', users_id);
    
        // setEmail(authenticatedUser);
        setIsLoggedIn(true);
        // setId(users_id);
    };

    const handleLogout = () => {
        // Clear user data and token from localStorage
        localStorage.removeItem('authToken');        
        setIsLoggedIn(false);
       
    };


    return (
        <div>
            {!isLoggedIn ? <Login onLogin={handleLogin} /> : <User authUser={authUser}  onLogout={handleLogout}   />}
            
        </div>
    );
};

export default App;