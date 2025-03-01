import { Member, Service, Transaction } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const dummyMember: Member = {
  id: '1',
  name: 'Rajesh Kumar',
  designation: 'Deputy Superintendent of Police',
  department: 'Criminal Investigation Department',
  membershipId: 'KSP-1234-5678',
  balance: 5000,
  photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
};

export const services: Service[] = [
  {
    id: '1',
    name: 'Accommodation',
    description: 'Comfortable rooms for officers',
    price: 1500,
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '2',
    name: 'Conference Hall',
    description: 'Fully equipped conference facilities',
    price: 3000,
    imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '3',
    name: 'Main Event Hall',
    description: 'Large hall for major events',
    price: 5000,
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '4',
    name: 'Barbeque',
    description: 'Outdoor barbeque facilities',
    price: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '5',
    name: 'Dining',
    description: 'Restaurant and dining services',
    price: 800,
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '6',
    name: 'Badminton',
    description: 'Indoor badminton courts',
    price: 300,
    imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '7',
    name: 'Table Tennis',
    description: 'Table tennis facilities',
    price: 200,
    imageUrl: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '8',
    name: 'GYM',
    description: 'Fully equipped fitness center',
    price: 500,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '9',
    name: 'Mini Theatre',
    description: 'Private movie screening room',
    price: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '10',
    name: 'Billiards',
    description: 'Billiards and pool tables',
    price: 400,
    imageUrl: 'https://images.unsplash.com/photo-1611757297035-7d4c9de9e7c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '11',
    name: 'Parking',
    description: 'Secure parking facilities',
    price: 100,
    imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  }
];

export const generateTransactions = (count: number): Transaction[] => {
  const transactions: Transaction[] = [];
  
  // Add some credit transactions (loading balance)
  for (let i = 0; i < Math.floor(count / 4); i++) {
    transactions.push({
      id: uuidv4(),
      memberId: dummyMember.id,
      serviceId: '',
      serviceName: 'Balance Load',
      amount: Math.floor(Math.random() * 5) * 1000 + 1000, // Random amount between 1000-5000
      date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(), // Random date in last 30 days
      type: 'credit'
    });
  }
  
  // Add debit transactions (service bookings)
  for (let i = 0; i < count - Math.floor(count / 4); i++) {
    const service = services[Math.floor(Math.random() * services.length)];
    transactions.push({
      id: uuidv4(),
      memberId: dummyMember.id,
      serviceId: service.id,
      serviceName: service.name,
      amount: service.price,
      date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(), // Random date in last 30 days
      type: 'debit'
    });
  }
  
  // Sort by date (newest first)
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const transactions = generateTransactions(15);