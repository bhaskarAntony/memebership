import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showMenuButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBackButton = false,
  showMenuButton = false
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleBack = () => {
    if (location.pathname === '/') {
      // Do nothing if we're already at home
      return;
    }
    navigate(-1);
  };
  
  return (
    <header className="bg-blue-800 text-white p-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center">
        {showBackButton && (
          <button 
            onClick={handleBack}
            className="mr-2"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      
      {showMenuButton && (
        <button>
          <Menu size={24} />
        </button>
      )}
    </header>
  );
};

export default Header;