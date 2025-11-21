'use client';

import { useState, useEffect } from 'react';
import { getUserRatings, submitRating } from '@/utils/api/ratings';
import { getUserForEvent } from '@/utils/user-storage';
import type { User, Event, Item } from '../../../../types/data';

interface EventHomeProps {
  event: Event;
  items: Item[];
}

export default function EventHome({ event, items }: EventHomeProps) {
  const [user, setUser] = useState<User | null>(null);
  const [ratings, setRatings] = useState<Record<string, number>>({});

  const canEditItem = (item: Item) => {
    if (!user) return false;
    return user.id === item.added_by_user_id || user.name === event.host_name;
  };

  useEffect(() => {
    setUser(getUserForEvent(event.id))
  }, [])

  useEffect(() => {
    if (user) {
      getUserRatings(event.id, user.id)
        .then(userRatings => {
          const ratingsMap: Record<string, number> = {};
          userRatings.forEach(rating => {
            ratingsMap[rating.item_id] = rating.score;
          });
          setRatings(ratingsMap);
        })
        .catch(err => console.error('Failed to load ratings:', err));
    }
  }, [user]);

  const handleRate = async (itemId: string, score: number) => {
    if (!user) return;

    try {
      await submitRating(event.id, user.id, itemId, score);
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
                {canEditItem(item) && (
                  <a
                    href={`/event/${event.id}/edit?itemId=${item.id}`}
                    className="ml-2 text-blue-500 text-sm hover:underline"
                  >
                    Edit
                  </a>
                )}
              </div>
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
            </div>
          ))
        )}
      </div>
    </div>
  );
}
