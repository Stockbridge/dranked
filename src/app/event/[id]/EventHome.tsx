'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getEventItems } from '../../../../lib/api/event';

interface Event {
  id: string;
  name: string;
  beverage_type: string;
  join_code: string;
  host_name: string;
}

interface EventHomeProps {
  event: Event;
}

export default function EventHome({ event }: EventHomeProps) {
  const [items, setItems] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const loadItems = async () => {
      try {
        const existingItems = await getEventItems(event.id);
        setItems(existingItems);
      } catch (error) {
        console.error('Failed to load items:', error);
      }
    };
    loadItems();
  }, [event.id]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl mb-2">{event.name}</h1>
      <p className="mb-4">Join code: <strong>{event.join_code}</strong></p>
      
      <a
        href={`/event/${event.id}/add?token=${token}`}
        className="block w-full bg-green-500 text-white p-2 rounded text-center mb-4"
      >
        Add New Item
      </a>

      <div>
        <h2 className="font-bold mb-2">Items ({items.length})</h2>
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No items added yet. Add your first {event.beverage_type} above!
          </p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="p-2 border-b flex justify-between items-start">
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                {item.producer && <div className="text-sm text-gray-600">{item.producer}</div>}
                {item.type && <div className="text-sm text-gray-600">{item.type}</div>}
                {item.year && <div className="text-sm text-gray-600">{item.year}</div>}
              </div>
              <a
                href={`/event/${event.id}/edit?token=${token}&itemId=${item.id}`}
                className="ml-2 text-blue-500 text-sm hover:underline"
              >
                Edit
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
