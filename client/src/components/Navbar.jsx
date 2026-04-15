import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, PlusSquare, User, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">MERN Blog</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/create" className="flex items-center text-gray-600 hover:text-indigo-600">
                  <PlusSquare className="w-5 h-5 mr-1" />
                  <span className="hidden sm:inline">Create Post</span>
                </Link>
                <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-indigo-600">
                  <LayoutDashboard className="w-5 h-5 mr-1" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <div className="flex items-center text-gray-800 font-medium ml-2">
                  <User className="w-5 h-5 mr-1" />
                  <span className="hidden sm:inline">{user.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center text-red-500 hover:text-red-700 font-medium"
                >
                  <LogOut className="w-5 h-5 mr-1" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium">Login</Link>
                <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition font-medium">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
