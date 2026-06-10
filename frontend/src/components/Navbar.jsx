import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Briefcase, User, LogOut, PlusCircle } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-1.5 rounded-lg transform group-hover:rotate-12 transition-transform duration-300">
                <Briefcase size={24} />
              </div>
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
                B2R
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link to="/jobs" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Find Jobs</Link>
            {user ? (
              <>
                <Link to="/post-job" className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                  <PlusCircle size={18} />
                  <span>Post a Job</span>
                </Link>
                <div className="h-6 w-px bg-gray-300 mx-2"></div>
                <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Dashboard</Link>
                <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </Link>
                <button 
                  onClick={logout}
                  className="flex items-center gap-1.5 text-gray-500 hover:text-red-500 font-medium transition-colors"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Log In</Link>
                <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full font-medium shadow-md shadow-indigo-200 transition-all hover:shadow-lg hover:-translate-y-0.5">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
