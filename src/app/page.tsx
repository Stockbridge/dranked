'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createEvent } from '../../lib/api/event';
import { getEventDetails } from '../../lib/api/event';

interface RecentEvent {
  id: string;
  name: string;
  beverageType: string;
  hostName: string;
}

export default function Home() {
  const [formData, setFormData] = useState({
    hostName: '',
    eventName: '',
    beverageType: 'beer' as const,
    tastingStyle: 'open' as const
  });
  const [isLoading, setIsLoading] = useState(false);
  const [recentEvents, setRecentEvents] = useState<RecentEvent[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Load recent events from localStorage
    const loadRecentEvents = async () => {
      const eventIds: string[] = [];
      
      // Find all event user keys in localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('event_') && key.endsWith('_user')) {
          const eventId = key.replace('event_', '').replace('_user', '');
          eventIds.push(eventId);
        }
      }

      // Fetch details for each event
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
      
      // Store host user in localStorage
      localStorage.setItem(`event_${event.id}_user`, JSON.stringify(event.hostUser));
      
      router.push(event.hostUrl);
    } catch (error) {
      console.error('Failed to create event:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">DRanked</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          required
          value={formData.hostName}
          onChange={(e) => setFormData(prev => ({ ...prev, hostName: e.target.value }))}
          placeholder="Your name"
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          required
          value={formData.eventName}
          onChange={(e) => setFormData(prev => ({ ...prev, eventName: e.target.value }))}
          placeholder="Event name"
          className="w-full p-2 border rounded"
        />

        <select
          value={formData.beverageType}
          onChange={(e) => setFormData(prev => ({ ...prev, beverageType: e.target.value as any }))}
          className="w-full p-2 border rounded"
        >
          <option value="beer">Beer</option>
          <option value="wine">Wine</option>
          <option value="whiskey">Whiskey</option>
        </select>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {isLoading ? 'Creating...' : 'Create Event'}
        </button>
      </form>

      {recentEvents.length > 0 && (
        <div className="mt-8">
          <h2 className="font-bold mb-2">Recent Events</h2>
          <div className="space-y-2">
            {recentEvents.map((evt) => (
              <a
                key={evt.id}
                href={`/event/${evt.id}`}
                className="block p-3 border rounded hover:bg-gray-50"
              >
                <div className="font-medium">{evt.name}</div>
                <div className="text-sm text-gray-600">
                  {evt.hostName} • {evt.beverageType}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
