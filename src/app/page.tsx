'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [formData, setFormData] = useState({
    hostName: '',
    eventName: '',
    beverageType: 'beer' as const,
    tastingStyle: 'open' as const
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const event = await response.json();
      router.push(`/host/${event.id}?token=${event.hostToken}`);
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
    </div>
  );
}
