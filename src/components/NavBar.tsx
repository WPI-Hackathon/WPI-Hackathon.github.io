import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-indigo-600 p-4 absolute top-0 w-full">
      <div className="flex space-x-8">
        <div>
          <Link to="/home" className="text-white">Home</Link>
        </div>
        <div>
          <Link to="/calendar" className="text-white">My Calendar</Link>
        </div>
        <div>
          <Link to="/dashboard" className="text-white">Dashboard</Link>
        </div>
        <div>
          <Link to="/creategroup" className="text-white">Group Setup</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
