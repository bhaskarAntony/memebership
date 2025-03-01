import React from 'react';
import { Transaction } from '../types';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const date = new Date(transaction.date);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center">
        <div className={`p-2 rounded-full mr-3 ${transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'}`}>
          {transaction.type === 'credit' ? (
            <ArrowDownLeft size={20} className="text-green-600" />
          ) : (
            <ArrowUpRight size={20} className="text-red-600" />
          )}
        </div>
        <div>
          <h3 className="font-medium text-gray-800">{transaction.serviceName}</h3>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
      </div>
      <p className={`font-semibold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
        {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
      </p>
    </div>
  );
};

export default TransactionItem;