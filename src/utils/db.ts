import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

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
  producer?: string;
  year?: number;
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

export default pool;
