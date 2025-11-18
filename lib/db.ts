export interface Event {
  id: string;
  name: string;
  beverageType: 'beer' | 'wine' | 'whiskey';
  tastingStyle: 'open' | 'blind';
  joinCode: string;
  hostName: string;
  hostToken: string;
  createdAt: Date;
  isActive: boolean;
}

export interface Item {
  id: string;
  eventId: string;
  name: string;
  type: string;
  addedBy: string;
  createdAt: Date;
}

export interface Rating {
  id: string;
  eventId: string;
  itemId: string;
  userId: string;
  userName: string;
  score: number;
  createdAt: Date;
}

export interface User {
  id: string;
  eventId: string;
  name: string;
  joinedAt: Date;
}
