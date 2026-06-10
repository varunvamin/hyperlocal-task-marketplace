import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { User, LogOut, PlusCircle, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive(path)
        ? 'text-blue-600'
        : 'text-gray-600 hover:text-blue-600'
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-gray-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="bg-blue-600 text-white px-2 py-1 rounded-lg text-sm font-black group-hover:bg-blue-700 transition-colors">
              b2r
            </div>
            <span className="text-lg font-bold text-gray-900 hidden sm:inline">
              Berozgaar to Rozgaar
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={navLinkClass('/')}>Home</Link>
            <Link to="/jobs" className={navLinkClass('/jobs')}>Jobs</Link>
            <Link to="/dashboard" className={navLinkClass('/dashboard')}>Dashboard</Link>
            <Link to="/profile" className={navLinkClass('/profile')}>Profile</Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link
                  to="/post-job"
                  className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
                >
                  <PlusCircle size={16} />
                  <span>Post a Job</span>
                </Link>
                <div className="h-5 w-px bg-gray-300"></div>
                <Link to="/profile" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:shadow-md transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-fadeIn">
          <div className="px-4 py-4 space-y-3">
            <Link to="/" className={`block py-2 ${navLinkClass('/')}`} onClick={() => setMobileOpen(false)}>Home</Link>
            <Link to="/jobs" className={`block py-2 ${navLinkClass('/jobs')}`} onClick={() => setMobileOpen(false)}>Jobs</Link>
            <Link to="/dashboard" className={`block py-2 ${navLinkClass('/dashboard')}`} onClick={() => setMobileOpen(false)}>Dashboard</Link>
            <Link to="/profile" className={`block py-2 ${navLinkClass('/profile')}`} onClick={() => setMobileOpen(false)}>Profile</Link>
            
            <div className="pt-3 border-t border-gray-100 space-y-2">
              {user ? (
                <>
                  <Link
                    to="/post-job"
                    className="flex items-center gap-2 py-2 text-blue-600 font-semibold text-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    <PlusCircle size={16} />
                    Post a Job
                  </Link>
                  <button
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="flex items-center gap-2 py-2 text-red-500 font-medium text-sm w-full cursor-pointer"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block py-2 text-sm font-medium text-gray-600"
                    onClick={() => setMobileOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block text-center bg-blue-600 text-white py-2.5 rounded-lg text-sm font-bold"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
