import { User, onAuthStateChanged, getAuth, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const NavBar: React.FC = () => {
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);
  const location = useLocation();
  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user)
      } else {
        setUser(user)
      }
    })
  }, [])

  const logout = () => {
    signOut(auth).then(() => {
      setUser(null)
    }).catch((error) => {
      console.error(error)
    })
  }

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-indigo-600 p-4 fixed top-0 w-full">
      <div className="flex justify-between items-center">
        <div className="space-x-8">
          <Link to="/home" className={`text-white ${isActive('/home') ? 'font-extrabold' : ''}`}>
            Home
          </Link>
          <Link to="/calendar" className={`text-white ${isActive('/calendar') ? 'font-extrabold' : ''}`}>
            My Calendar
          </Link>
          <Link to="/dashboard" className={`text-white ${isActive('/dashboard') ? 'font-extrabold' : ''}`}>
            Dashboard
          </Link>
          <Link to="/creategroup" className={`text-white ${isActive('/creategroup') ? 'font-extrabold' : ''}`}>
            Create Group
          </Link>
          <Link to="/joingroup" className={`text-white ${isActive('/joingroup') ? 'font-extrabold' : ''}`}>
            Join Group
          </Link>
        </div>

        {user ? (
          <div className="flex items-center space-x-4">
            <div className="text-white font-medium">Hello, {user?.displayName}!</div>
            <div>
              <button className='bg-white font-medium hover:bg-gray-100 text-slate-800 text-sm' onClick={logout}>Logout</button>
            </div>
          </div>
        ) : (
          <button className="bg-white font-medium hover:bg-gray-100 text-slate-800 text-sm">
            <Link to="/login">Login</Link>
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
