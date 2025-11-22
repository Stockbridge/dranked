'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createEvent } from '@/utils/api/event';
import { getEventDetails } from '@/utils/api/event';
import { setUserForEvent, getAllEventIds } from '@/utils/user-storage';
import { Button, Link } from '@/components/Actions';
import { Input, Select } from '@/components/Inputs';

interface RecentEvent {
  id: string;
  name: string;
  beverageType: string;
  hostName: string;
}

export default function Home() {
  const [formData, setFormData] = useState<{
    hostName: string;
    eventName: string;
    beverageType: 'beer' | 'wine' | 'whiskey';
    tastingStyle: 'open' | 'blind';
  }>({
    hostName: '',
    eventName: '',
    beverageType: 'beer',
    tastingStyle: 'open'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [recentEvents, setRecentEvents] = useState<RecentEvent[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadRecentEvents = async () => {
      const eventIds = getAllEventIds();
      const events = await Promise.all(
        eventIds.map(async (id) => {
          try {
            return await getEventDetails(id);
          } catch {
            return null;
          }
        })
      );
      setRecentEvents(events.filter(Boolean) as RecentEvent[]);
    };

    loadRecentEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const event = await createEvent(formData);
      setUserForEvent(event.id, event.hostUser);
      router.push(event.hostUrl);
    } catch (error) {
      console.error('Failed to create event:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Create a new event</h1>
      
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          type="text"
          required
          value={formData.hostName}
          onChange={(e) => setFormData(prev => ({ ...prev, hostName: e.target.value }))}
          placeholder="Your name"
        />

        <Input
          type="text"
          required
          value={formData.eventName}
          onChange={(e) => setFormData(prev => ({ ...prev, eventName: e.target.value }))}
          placeholder="Event name"
        />

        <Select
          value={formData.beverageType}
          onChange={(e) => setFormData(prev => ({ ...prev, beverageType: e.target.value as 'beer' | 'wine' | 'whiskey' }))}
          className="w-full p-2 border rounded"
        >
          <option value="beer">Beer</option>
          <option value="wine">Wine</option>
          <option value="whiskey">Whiskey</option>
        </Select>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full p-2 rounded"
        >
          {isLoading ? 'Creating...' : 'Create Event'}
        </Button>
      </form>

      {recentEvents.length > 0 && (
        <div className="mt-8">
          <h1 className="text-2xl mb-4">Join a recent event</h1>
          <div className="space-y-2">
            {recentEvents.map((evt) => (
              <Link
                key={evt.id}
                href={`/event/${evt.id}`}
                className="block p-3 border rounded hover:bg-gray-50"
              >
                <div className="font-medium">{evt.name}</div>
                <div className="text-sm text-secondary">
                  {evt.hostName} • {evt.beverageType}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
