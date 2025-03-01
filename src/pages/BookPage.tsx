import React, { useState } from 'react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import ServiceCard from '../components/ServiceCard';
import QRScanner from '../components/QRScanner';
import { useApp } from '../context/AppContext';
import { Service } from '../types';
import { X, Check, QrCode } from 'lucide-react';

const BookPage: React.FC = () => {
  const { services, bookService, member, scanQRCode, isScanning, stopScanning } = useApp();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showScanner, setShowScanner] = useState(false);
  const [scannedMemberId, setScannedMemberId] = useState<string | null>(null);
  
  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    setBookingStatus('idle');
  };
  
  const handleBookService = () => {
    if (!selectedService) return;
    
    const success = bookService(selectedService.id);
    setBookingStatus(success ? 'success' : 'error');
    
    // Reset after a few seconds
    if (success) {
      setTimeout(() => {
        setSelectedService(null);
        setBookingStatus('idle');
        setScannedMemberId(null);
      }, 2000);
    }
  };
  
  const handleCloseModal = () => {
    setSelectedService(null);
    setBookingStatus('idle');
    setScannedMemberId(null);
  };
  
  const handleScanQR = () => {
    setShowScanner(true);
    scanQRCode();
  };
  
  const handleScanComplete = (memberId: string) => {
    stopScanning();
    setShowScanner(false);
    setScannedMemberId(memberId);
    
    // Send QR data to server
    const url = `https://sporti.ksp.gov.in/qrData?data=${encodeURIComponent(memberId)}`;
    console.log(`Would send data to: ${url}`);
    
    // In a real app, you would make an API call here
    fetch(url)
      .then(response => {
        // This will fail in this demo environment, but in a real app it would work
        console.log('API response:', response);
      })
      .catch(err => {
        // Expected to fail in this demo
        console.log('API call simulation complete');
      });
  };
  
  return (
    <div className="pb-16 bg-gray-50 min-h-screen">
      <Header title="Book Services" showBackButton />
      
      {!showScanner ? (
        <>
          <div className="p-4">
            <button
              onClick={handleScanQR}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium mb-4 flex items-center justify-center"
            >
              <QrCode size={20} className="mr-2" />
              Scan Membership QR Code
            </button>
            
            {scannedMemberId && (
              <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-4">
                Membership ID: {scannedMemberId}
              </div>
            )}
          </div>
          
          <div className="p-4 grid grid-cols-2 gap-4">
            {services.map(service => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onSelect={handleSelectService}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="p-4">
          <QRScanner onScanComplete={handleScanComplete} />
        </div>
      )}
      
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20">
          <div className="bg-white rounded-lg w-full max-w-sm overflow-hidden">
            <div className="relative">
              <img 
                src={selectedService.imageUrl} 
                alt={selectedService.name} 
                className="w-full h-48 object-cover"
              />
              <button 
                onClick={handleCloseModal}
                className="absolute top-2 right-2 bg-white rounded-full p-1"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{selectedService.name}</h2>
              <p className="text-gray-600 mb-4">{selectedService.description}</p>
              
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">Price:</p>
                <p className="text-xl font-bold text-blue-600">₹{selectedService.price}</p>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">Your Balance:</p>
                <p className={`font-bold ${member.balance < selectedService.price ? 'text-red-600' : 'text-green-600'}`}>
                  ₹{member.balance}
                </p>
              </div>
              
              {scannedMemberId && (
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-600">Membership ID:</p>
                  <p className="font-medium">{scannedMemberId}</p>
                </div>
              )}
              
              {bookingStatus === 'success' ? (
                <div className="bg-green-100 text-green-800 p-3 rounded-lg flex items-center justify-center mb-4">
                  <Check size={20} className="mr-2" />
                  Booking successful!
                </div>
              ) : bookingStatus === 'error' ? (
                <div className="bg-red-100 text-red-800 p-3 rounded-lg flex items-center justify-center mb-4">
                  <X size={20} className="mr-2" />
                  Insufficient balance!
                </div>
              ) : null}
              
              <button
                onClick={handleBookService}
                disabled={bookingStatus === 'success' || member.balance < selectedService.price || !scannedMemberId}
                className={`w-full py-3 rounded-lg font-medium ${
                  bookingStatus === 'success' || member.balance < selectedService.price || !scannedMemberId
                    ? 'bg-gray-300 text-gray-600'
                    : 'bg-blue-600 text-white'
                }`}
              >
                {!scannedMemberId 
                  ? 'Scan QR Code First' 
                  : member.balance < selectedService.price 
                    ? 'Insufficient Balance' 
                    : 'Book Now'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <BottomNavigation />
    </div>
  );
};

export default BookPage;