import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const NavBar: React.FC = () => {
  const user = getAuth().currentUser;

  return (
    <nav className="bg-indigo-600 p-4 absolute top-0 w-full">
      <div className="flex space-x-8">
        <Link to="/home" className={`text-white ${user ? '' : 'hidden'}`}>Home</Link>
        <Link to="/calendar" className={`text-white ${user ? '' : 'hidden'}`}>My Calendar</Link>
        <Link to="/dashboard" className={`text-white ${user ? '' : 'hidden'}`}>Dashboard</Link>
        <Link to="/login" className={`text-white ${user ? 'hidden' : ''}`}>Login</Link>
        <Link to="/signup" className={`text-white ${user ? 'hidden' : ''}`}>Sign Up</Link>
      </div>
    </nav>
  );
};

export default NavBar;
