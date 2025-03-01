import React, { useState } from 'react';
import Header from '../components/Header';
import { useApp } from '../context/AppContext';
import { CreditCard, Check } from 'lucide-react';
import QRScanner from '../components/QRScanner';

const LoadBalancePage: React.FC = () => {
  const { loadBalance, member, stopScanning } = useApp();
  const [amount, setAmount] = useState<string>('');
  const [step, setStep] = useState<'amount' | 'payment' | 'success'>('amount');
  const [scannedMemberId, setScannedMemberId] = useState<string>(member.membershipId);
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setAmount(value);
    }
  };
  
  const handleScanComplete = (memberId: string) => {
    stopScanning();
    setScannedMemberId(memberId);
  };
  
  const handleProceedToPayment = () => {
    if (!amount || parseInt(amount) <= 0) return;
    setStep('payment');
  };
  
  const handleCompletePayment = () => {
    const amountValue = parseInt(amount);
    if (amountValue > 0) {
      loadBalance(amountValue);
      setStep('success');
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Add Balance" showBackButton />
      
      <div className="p-4">
        {step === 'amount' && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Enter Amount to Add</h2>
            
            <div className="mb-6">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount (₹)
              </label>
              <input
                type="text"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xl"
              />
            </div>
            
            <div className="flex flex-col gap-2 mb-4">
              {[1000, 2000, 5000, 10000].map(quickAmount => (
                <button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount.toString())}
                  className="bg-blue-50 text-blue-700 border border-blue-200 rounded-lg py-2"
                >
                  ₹{quickAmount.toLocaleString()}
                </button>
              ))}
            </div>
            
            <button
              onClick={handleProceedToPayment}
              disabled={!amount || parseInt(amount) <= 0}
              className={`w-full py-3 rounded-lg font-medium ${
                !amount || parseInt(amount) <= 0
                  ? 'bg-gray-300 text-gray-600'
                  : 'bg-blue-600 text-white'
              }`}
            >
              Proceed to Payment
            </button>
          </div>
        )}
        
        {step === 'payment' && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Member ID:</span>
                <span className="font-medium">{scannedMemberId}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Member Name:</span>
                <span className="font-medium">{member.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">₹{parseInt(amount).toLocaleString()}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Payment Method</h3>
              <div className="border border-blue-200 bg-blue-50 rounded-lg p-3 flex items-center">
                <CreditCard className="text-blue-600 mr-2" size={20} />
                <span>Credit/Debit Card</span>
                <div className="ml-auto">
                  <input type="radio" checked readOnly />
                </div>
              </div>
            </div>
            
            <button
              onClick={handleCompletePayment}
              className="w-full py-3 rounded-lg font-medium bg-blue-600 text-white"
            >
              Pay ₹{parseInt(amount).toLocaleString()}
            </button>
          </div>
        )}
        
        {step === 'success' && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
              <Check size={40} className="text-green-600" />
            </div>
            
            <h2 className="text-xl font-semibold mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">
              ₹{parseInt(amount).toLocaleString()} has been added to your balance.
            </p>
            
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Previous Balance:</span>
                <span className="font-medium">₹{(member.balance - parseInt(amount)).toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Added Amount:</span>
                <span className="font-medium text-green-600">+₹{parseInt(amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">New Balance:</span>
                <span className="font-bold">₹{member.balance.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadBalancePage;