import React, { useState } from 'react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import TransactionItem from '../components/TransactionItem';
import { useApp } from '../context/AppContext';

const HistoryPage: React.FC = () => {
  const { transactions } = useApp();
  const [filter, setFilter] = useState<'all' | 'debit' | 'credit'>('all');
  
  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  });
  
  return (
    <div className="pb-16 bg-gray-50 min-h-screen">
      <Header title="Transaction History" showBackButton />
      
      <div className="p-4">
        <div className="flex bg-gray-200 rounded-lg p-1 mb-4">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-2 text-center rounded-md ${
              filter === 'all' ? 'bg-white shadow' : ''
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('debit')}
            className={`flex-1 py-2 text-center rounded-md ${
              filter === 'debit' ? 'bg-white shadow' : ''
            }`}
          >
            Debits
          </button>
          <button
            onClick={() => setFilter('credit')}
            className={`flex-1 py-2 text-center rounded-md ${
              filter === 'credit' ? 'bg-white shadow' : ''
            }`}
          >
            Credits
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map(transaction => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <p className="p-4 text-center text-gray-500">No transactions found</p>
          )}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default HistoryPage;