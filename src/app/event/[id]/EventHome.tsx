'use client';

import { useState, useEffect } from 'react';
import { getUserRatings, submitRating } from '@/utils/api/ratings';
import { getUserForEvent } from '@/utils/user-storage';
import type { User, Event, Item } from '../../../../types/data';
import { Button, ButtonLink, Link } from '@/components/Actions';

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
      <div className='border-b pb-3'>
        <div className='flex justify-between items-center'>
        <h1 className="text-xl mb-2">{event.name}</h1>
        <p className="mb-4">Join code: <Link href={`/join/${event.join_code}`}><strong>{event.join_code}</strong></Link></p>
        </div>
        <div className='flex justify-between items-center'>
          <h2 className="font-bold">Items ({items.length})</h2>
          <Link href={`/event/${event.id}/add`}>
            Add a {event.beverage_type}<span className='text-lg px-1.5'>+</span>
          </Link>
        </div>
      </div>
      <div>
        {items.length === 0 && (
          <>
          <p className="text-secondary text-center py-8">
            No items added yet. Add your first {event.beverage_type}!
          </p>
          <ButtonLink
            href={`/event/${event.id}/add`}
            className='inline-block text-center'
          >
            Add New Item
          </ButtonLink>
        </>
        ) }
        {items.length > 0 && ( 
          items.map((item) => (
            <div key={item.id} className="p-3 border-b border-secondary py-5 mb-2">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <ul className='flex gap-2'>
                  {item.producer && <li className="text-sm text-secondary">{item.producer}</li>}
                  {item.type && <li className="text-sm text-secondary">{item.type}</li>}
                  {item.year && <li className="text-sm text-secondary">{item.year}</li>}
                  </ul>
                </div>
                {canEditItem(item) && (
                  <Link
                    href={`/event/${event.id}/edit?itemId=${item.id}`}
                  >
                    Edit
                  </Link>
                )}
              </div>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                  <Button
                    key={score}
                    onClick={() => handleRate(item.id, score)}
                    buttonType={ratings[item.id] === score ? 'primary' : 'outline'}
                    className='flex-1 p-1 text-xs'
                  >
                    <>{score}</>
                  </Button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
