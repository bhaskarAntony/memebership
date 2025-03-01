import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Scan, Camera } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface QRScannerProps {
  onScanComplete: (memberId: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanComplete }) => {
  const { isScanning, scanQRCode } = useApp();
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerId = 'qr-reader';
  
  useEffect(() => {
    // Initialize scanner when component mounts
    scannerRef.current = new Html5Qrcode(scannerContainerId);
    
    // Cleanup on unmount
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(err => console.error('Error stopping scanner:', err));
      }
    };
  }, []);
  
  useEffect(() => {
    if (isScanning && scannerRef.current) {
      startScanner();
    } else if (!isScanning && scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current.stop().catch(err => console.error('Error stopping scanner:', err));
    }
  }, [isScanning]);
  
  const startScanner = () => {
    if (!scannerRef.current) return;
    
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0
    };
    
    scannerRef.current.start(
      { facingMode: "environment" },
      config,
      onScanSuccess,
      onScanFailure
    ).catch(err => {
      console.error('Error starting scanner:', err);
      setError('Could not start camera. Please check permissions.');
    });
  };
  
  const onScanSuccess = (decodedText: string) => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current.stop().catch(err => console.error('Error stopping scanner:', err));
    }
    
    console.log(`QR Code detected: ${decodedText}`);
    
    // Send QR data to server
    sendQRDataToServer(decodedText);
    
    // Call the callback with the scanned data
    onScanComplete(decodedText);
  };
  
  const onScanFailure = (error: string) => {
    // Handle scan failure silently (don't show errors during normal scanning)
    console.warn(`QR scan error: ${error}`);
  };
  
  const sendQRDataToServer = (qrData: string) => {
    // In a real app, you would make an API call here
    // For now, we'll just log the URL we would call
    const url = `https://sporti.ksp.gov.in/qrData?data=${encodeURIComponent(qrData)}`;
    console.log(`Would send data to: ${url}`);
    
    // Simulate API call
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
    <div className="flex flex-col items-center justify-center p-6">
      <div className="relative w-full max-w-sm mb-6">
        <div 
          id={scannerContainerId}
          className="bg-gray-100 w-full h-72 rounded-lg flex items-center justify-center relative overflow-hidden"
        >
          {!isScanning && (
            <div className="flex flex-col items-center justify-center">
              <Camera size={80} className="text-gray-400 mb-2" />
              <p className="text-gray-500">Camera will appear here</p>
            </div>
          )}
        </div>
        
        {/* Scanning animation overlay */}
        {isScanning && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Corner markers */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-blue-500"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-blue-500"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-blue-500"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-blue-500"></div>
            
            {/* Scanning line */}
            <div className="absolute left-0 right-0 h-1 bg-blue-500 opacity-70 animate-scan"></div>
            
            {/* Pulsing center frame */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 border-2 border-blue-500 animate-pulse"></div>
            </div>
            
            {/* Radar-like animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-transparent rounded-full animate-ping">
                <div className="absolute inset-0 border-2 border-blue-400 rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-4 text-sm w-full max-w-sm">
          {error}
        </div>
      )}
      
      <button
        onClick={scanQRCode}
        disabled={isScanning}
        className={`px-6 py-3 rounded-lg font-medium w-full max-w-sm ${
          isScanning 
            ? 'bg-gray-300 text-gray-600' 
            : 'bg-blue-600 text-white'
        }`}
      >
        {isScanning ? 'Scanning...' : 'Scan QR Code'}
      </button>
      
      <p className="text-sm text-gray-600 mt-4 text-center w-full max-w-sm">
        Position the QR code on the membership card within the frame to scan
      </p>
    </div>
  );
};

export default QRScanner;