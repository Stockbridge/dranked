'use client';

import { useState, useEffect } from 'react';
import { getEventItems } from '../../../../lib/api/event';
import { getUserForEvent, type User } from '../../../../lib/user-storage';

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
  const [user, setUser] = useState<User | null>(null);
  const [ratings, setRatings] = useState<Record<string, number>>({});

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

    const userData = getUserForEvent(event.id);
    if (userData) {
      setUser(userData);
      
      // Load user's ratings
      fetch(`/api/event/${event.id}/user/${userData.id}/ratings`)
        .then(res => res.json())
        .then(userRatings => {
          const ratingsMap: Record<string, number> = {};
          userRatings.forEach((rating: any) => {
            ratingsMap[rating.item_id] = rating.score;
          });
          setRatings(ratingsMap);
        })
        .catch(err => console.error('Failed to load ratings:', err));
    }
  }, [event.id]);

  const handleRate = async (itemId: string, score: number) => {
    if (!user) return;

    try {
      await fetch(`/api/event/${event.id}/user/${user.id}/ratings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId,
          score
        })
      });
      
      // Update local state
      setRatings(prev => ({ ...prev, [itemId]: score }));
    } catch (error) {
      console.error('Failed to rate:', error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl mb-2">{event.name}</h1>
      <p className="mb-4">Join code: <strong>{event.join_code}</strong></p>
      
      <a
        href={`/event/${event.id}/add`}
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
            <div key={item.id} className="p-3 border-b">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  {item.producer && <div className="text-sm text-gray-600">{item.producer}</div>}
                  {item.type && <div className="text-sm text-gray-600">{item.type}</div>}
                  {item.year && <div className="text-sm text-gray-600">{item.year}</div>}
                </div>
                <a
                  href={`/event/${event.id}/edit?itemId=${item.id}`}
                  className="ml-2 text-blue-500 text-sm hover:underline"
                >
                  Edit
                </a>
              </div>
              
              {user && (
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                    <button
                      key={score}
                      onClick={() => handleRate(item.id, score)}
                      className={`flex-1 p-1 text-xs border rounded ${
                        ratings[item.id] === score 
                          ? 'bg-blue-500 text-white' 
                          : 'hover:bg-blue-500 hover:text-white'
                      }`}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
