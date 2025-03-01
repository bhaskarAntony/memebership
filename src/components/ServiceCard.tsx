import React from 'react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onSelect: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden"
      onClick={() => onSelect(service)}
    >
      <img 
        src={service.imageUrl} 
        alt={service.name} 
        className="w-full h-32 object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-gray-800">{service.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{service.description}</p>
        <p className="text-blue-600 font-bold">₹{service.price}</p>
      </div>
    </div>
  );
};

export default ServiceCard;