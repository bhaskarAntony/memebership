import React, { createContext, useContext, useState, useEffect } from 'react';
import { Member, Service, Transaction } from '../types';
import { dummyMember, services, transactions as initialTransactions } from '../data/dummyData';
import { v4 as uuidv4 } from 'uuid';

interface AppContextType {
  member: Member;
  services: Service[];
  transactions: Transaction[];
  loadBalance: (amount: number) => void;
  bookService: (serviceId: string) => boolean;
  scanQRCode: () => void;
  isScanning: boolean;
  stopScanning: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [member, setMember] = useState<Member>(dummyMember);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isScanning, setIsScanning] = useState(false);

  const loadBalance = (amount: number) => {
    if (amount <= 0) return;
    
    // Update member balance
    setMember(prev => ({
      ...prev,
      balance: prev.balance + amount
    }));
    
    // Add transaction
    const newTransaction: Transaction = {
      id: uuidv4(),
      memberId: member.id,
      serviceId: '',
      serviceName: 'Balance Load',
      amount: amount,
      date: new Date().toISOString(),
      type: 'credit'
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
  };
  
  const bookService = (serviceId: string): boolean => {
    const service = services.find(s => s.id === serviceId);
    if (!service) return false;
    
    // Check if member has enough balance
    if (member.balance < service.price) return false;
    
    // Update member balance
    setMember(prev => ({
      ...prev,
      balance: prev.balance - service.price
    }));
    
    // Add transaction
    const newTransaction: Transaction = {
      id: uuidv4(),
      memberId: member.id,
      serviceId: service.id,
      serviceName: service.name,
      amount: service.price,
      date: new Date().toISOString(),
      type: 'debit'
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    return true;
  };
  
  const scanQRCode = () => {
    setIsScanning(true);
  };
  
  const stopScanning = () => {
    setIsScanning(false);
  };
  
  return (
    <AppContext.Provider value={{
      member,
      services,
      transactions,
      loadBalance,
      bookService,
      scanQRCode,
      isScanning,
      stopScanning
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};