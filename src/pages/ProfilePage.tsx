import React from 'react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import { useApp } from '../context/AppContext';
import { User, Mail, Briefcase, CreditCard } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { member } = useApp();
  
  return (
    <div className="pb-16 bg-gray-50 min-h-screen">
      <Header title="Profile" showBackButton />
      
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="bg-blue-600 p-6 flex flex-col items-center">
            <img 
              src={member.photoUrl} 
              alt={member.name} 
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
            <h2 className="text-white font-bold text-xl mt-2">{member.name}</h2>
            <p className="text-blue-100">{member.designation}</p>
          </div>
          
          <div className="p-4">
            <div className="flex items-center py-3 border-b border-gray-100">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <CreditCard size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Membership ID</p>
                <p className="font-medium">{member.membershipId}</p>
              </div>
            </div>
            
            <div className="flex items-center py-3 border-b border-gray-100">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <Mail size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">rajesh.kumar@ksp.gov.in</p>
              </div>
            </div>
            
            <div className="flex items-center py-3 border-b border-gray-100">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <User size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Designation</p>
                <p className="font-medium">{member.designation}</p>
              </div>
            </div>
            
            <div className="flex items-center py-3">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <Briefcase size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">{member.department}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold text-lg mb-3">Account Information</h3>
          
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Current Balance</span>
            <span className="font-bold">₹{member.balance.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Membership Status</span>
            <span className="text-green-600 font-medium">Active</span>
          </div>
          
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Valid Until</span>
            <span className="font-medium">31 Dec 2025</span>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ProfilePage;