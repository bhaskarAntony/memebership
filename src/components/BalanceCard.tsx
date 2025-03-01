import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const BalanceCard: React.FC = () => {
  const { member } = useApp();
  const navigate = useNavigate();
  
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-4 text-white shadow-lg mx-4 my-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold opacity-80">Current Balance</h2>
          <p className="text-3xl font-bold">₹{member.balance.toLocaleString()}</p>
        </div>
        <button 
          onClick={() => navigate('/load-balance')}
          className="bg-white text-blue-600 rounded-full p-2 flex items-center"
        >
          <PlusCircle size={20} />
          <span className="ml-1 font-medium">Add Balance</span>
        </button>
      </div>
      
      <div className="text-sm opacity-80">
        <p>Membership ID: {member.membershipId}</p>
      </div>
    </div>
  );
};

export default BalanceCard;