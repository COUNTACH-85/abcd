import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, TrendingUp, Layers, Settings, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">ILNB Invest</span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            <NavLink to="/dashboard" icon={<Layers className="w-5 h-5" />} text="Dashboard" />
            <NavLink to="/compare" icon={<TrendingUp className="w-5 h-5" />} text="Compare" />
            <NavLink to="/execute" icon={<DollarSign className="w-5 h-5" />} text="Invest" />
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center text-gray-700 hover:text-blue-600">
                  <User className="w-5 h-5 mr-1" />
                  <span>{user.name}</span>
                </Link>
                <button 
                  onClick={logout}
                  className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, text }) => (
  <Link to={to} className="flex items-center text-gray-700 hover:text-blue-600">
    {icon}
    <span className="ml-1">{text}</span>
  </Link>
);

export default Navbar;