'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setUserForEvent } from '@/utils/user-storage';
import type { Event } from '../../../../types/data';
import { Button } from '@/components/Actions';
import { Input } from '@/components/Inputs';

interface JoinFormProps {
  event: Event;
}

export default function JoinForm({ event }: JoinFormProps) {
  const [name, setName] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const router = useRouter();

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsJoining(true);
    try {
      const response = await fetch(`/api/event/${event.id}/add-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to join event');
      }

      const user = await response.json();
      setUserForEvent(event.id, user);
      router.push(`/event/${event.id}`);
    } catch (error) {
      console.error('Failed to join:', error);
      alert('Failed to join event. Please try again.');
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2">Join Event</h1>
      <div className="mb-6">
        <h2 className="text-xl">{event.name}</h2>
        <p className="text-secondary">Hosted by {event.host_name}</p>
        <p className="text-secondary capitalize">{event.beverage_type} tasting</p>
      </div>

      <form onSubmit={handleJoin} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Your Name
          </label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            autoFocus
          />
        </div>

        <Button
          type="submit"
          disabled={isJoining || !name.trim()}
        >
          {isJoining ? 'Joining...' : 'Join Event'}
        </Button>
      </form>
    </div>
  );
}
