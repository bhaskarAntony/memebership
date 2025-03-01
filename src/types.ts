export interface Member {
  id: string;
  name: string;
  designation: string;
  department: string;
  membershipId: string;
  balance: number;
  photoUrl: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface Transaction {
  id: string;
  memberId: string;
  serviceId: string;
  serviceName: string;
  amount: number;
  date: string;
  type: 'debit' | 'credit';
}