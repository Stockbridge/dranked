'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addItem } from '../../../../../lib/api/items';

interface Event {
  id: string;
  name: string;
  beverage_type: string;
  host_name: string;
}

interface AddItemFormProps {
  event: Event;
}

export default function AddItemForm({ event }: AddItemFormProps) {
  const [newItem, setNewItem] = useState({
    name: '',
    producer: '',
    year: '',
    type: ''
  });
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;

    setIsAdding(true);
    try {
      await addItem(event.id, {
        name: newItem.name.trim(),
        producer: newItem.producer.trim() || undefined,
        year: newItem.year ? parseInt(newItem.year) : undefined,
        type: newItem.type.trim() || undefined,
        addedBy: event.host_name
      });

      // Redirect back to event home
      router.push(`/event/${event.id}?token=${new URLSearchParams(window.location.search).get('token')}`);
    } catch (error) {
      console.error('Failed to add item:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl mb-2">Add {event.beverage_type}</h1>
      <p className="mb-4">{event.name}</p>
      
      <form onSubmit={handleAddItem} className="space-y-2">
        <input
          type="text"
          value={newItem.name}
          onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          value={newItem.producer}
          onChange={(e) => setNewItem(prev => ({ ...prev, producer: e.target.value }))}
          placeholder="Producer (brewery/winery/distillery)"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={newItem.type}
          onChange={(e) => setNewItem(prev => ({ ...prev, type: e.target.value }))}
          placeholder="Type (IPA, Pinot Noir, etc.)"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={newItem.year}
          onChange={(e) => setNewItem(prev => ({ ...prev, year: e.target.value }))}
          placeholder="Year"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={isAdding || !newItem.name.trim()}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {isAdding ? 'Adding...' : 'Add Item'}
        </button>
      </form>

      <button
        onClick={() => router.back()}
        className="w-full mt-2 bg-gray-500 text-white p-2 rounded"
      >
        Cancel
      </button>
    </div>
  );
}
