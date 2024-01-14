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
          <Link to="/creategroup" className="text-white">Create Group</Link>
        </div>
        <div>
          <Link to="/joingroup" className="text-white">Join Group</Link>
        </div>

        {user ?
          <div>
            <div>
              <button onClick={logout}>Logout</button>
            </div>
            <div>Hello {user?.displayName}</div>
          </div>
          :
          <button>
            <Link to="/login" className="text-white">Login</Link>
          </button>
        }
      </div>
    </nav>
  );
};

export default NavBar;
