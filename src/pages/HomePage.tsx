import React from 'react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import BalanceCard from '../components/BalanceCard';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Clock, ShoppingBag } from 'lucide-react';

const HomePage: React.FC = () => {
  const { member, transactions } = useApp();
  const navigate = useNavigate();
  
  // Get the last 3 transactions
  const recentTransactions = transactions.slice(0, 3);
  
  return (
    <div className="pb-16 bg-gray-50 min-h-screen">
      <Header title="SPORTI" showMenuButton />
      
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img 
            src={member.photoUrl} 
            alt={member.name} 
            className="w-12 h-12 rounded-full mr-3 object-cover"
          />
          <div>
            <h2 className="font-semibold text-lg">{member.name}</h2>
            <p className="text-sm text-gray-600">{member.designation}</p>
          </div>
        </div>
      </div>
      
      <BalanceCard />
      
      <div className="grid grid-cols-3 gap-4 p-4">
        <button 
          onClick={() => navigate('/book')}
          className="bg-white rounded-lg p-4 shadow flex flex-col items-center"
        >
          <div className="bg-blue-100 p-3 rounded-full mb-2">
            <ShoppingBag size={24} className="text-blue-600" />
          </div>
          <span className="text-sm font-medium">Quick Book</span>
        </button>
        
        <button 
          onClick={() => navigate('/load-balance')}
          className="bg-white rounded-lg p-4 shadow flex flex-col items-center"
        >
          <div className="bg-green-100 p-3 rounded-full mb-2">
            <CreditCard size={24} className="text-green-600" />
          </div>
          <span className="text-sm font-medium">Add Balance</span>
        </button>
        
        <button 
          onClick={() => navigate('/history')}
          className="bg-white rounded-lg p-4 shadow flex flex-col items-center"
        >
          <div className="bg-purple-100 p-3 rounded-full mb-2">
            <Clock size={24} className="text-purple-600" />
          </div>
          <span className="text-sm font-medium">History</span>
        </button>
      </div>
      
      <div className="mt-4 p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <button 
            onClick={() => navigate('/history')}
            className="text-blue-600 text-sm"
          >
            View All
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {recentTransactions.length > 0 ? (
            recentTransactions.map(transaction => (
              <div key={transaction.id} className="p-3 border-b border-gray-100 last:border-b-0">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{transaction.serviceName}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className={`font-semibold ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="p-4 text-center text-gray-500">No recent transactions</p>
          )}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default HomePage;