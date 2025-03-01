import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CreditCard, Clock, User } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 z-10">
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          `flex flex-col items-center p-2 ${isActive ? 'text-blue-600' : 'text-gray-600'}`
        }
        end
      >
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </NavLink>
      
      <NavLink 
        to="/book" 
        className={({ isActive }) => 
          `flex flex-col items-center p-2 ${isActive ? 'text-blue-600' : 'text-gray-600'}`
        }
      >
        <CreditCard size={24} />
        <span className="text-xs mt-1">Book</span>
      </NavLink>
      
      <NavLink 
        to="/history" 
        className={({ isActive }) => 
          `flex flex-col items-center p-2 ${isActive ? 'text-blue-600' : 'text-gray-600'}`
        }
      >
        <Clock size={24} />
        <span className="text-xs mt-1">History</span>
      </NavLink>
      
      <NavLink 
        to="/profile" 
        className={({ isActive }) => 
          `flex flex-col items-center p-2 ${isActive ? 'text-blue-600' : 'text-gray-600'}`
        }
      >
        <User size={24} />
        <span className="text-xs mt-1">Profile</span>
      </NavLink>
    </nav>
  );
};

export default BottomNavigation;