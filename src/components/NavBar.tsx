import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="p-4 static top-0 w-full">
      <div className="flex space-x-4">
        <div>
          <Link to="/home" className="text-blue-600/100">Home</Link>
        </div>
        <div>
          <Link to="/calendar" className="text-blue-600/100">My Calendar</Link>
        </div>
        <div>
          <Link to="/dashboard" className="text-blue-600/100">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
