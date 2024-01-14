import { User, onAuthStateChanged, getAuth, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const NavBar: React.FC = () => {
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);
  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user)
      } else {
        setUser(user)
      }
    })
  })



  const logout = () => {
    signOut(auth).then(() => {
      setUser(null)
    }).catch((error) => {
      console.error(error)
    })
  }

  return (
    <nav className="bg-indigo-600 p-4 absolute top-0 w-full">
      <div className="flex justify-between items-center">
        <div className="space-x-8">
          <Link to="/home" className="text-white">
            Home
          </Link>
          <Link to="/calendar" className="text-white">
            My Calendar
          </Link>
          <Link to="/dashboard" className="text-white">
            Dashboard
          </Link>
          <Link to="/creategroup" className="text-white">
            Create Group
          </Link>
          <Link to="/joingroup" className="text-white">
            Join Group
          </Link>
        </div>

        {user ? (
          <div className="flex items-center">
            <div>
              <button onClick={logout}>Logout</button>
            </div>
            <div className="text-white">Hello {user?.displayName}</div>
          </div>
        ) : (
          <button className="bg-white hover:bg-gray-100 text-indigo-600 text-sm">
            <Link to="/login">Login</Link>
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
