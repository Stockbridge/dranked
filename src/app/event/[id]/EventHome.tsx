'use client';

import { useState, useEffect } from 'react';

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
  const [newItem, setNewItem] = useState({
    name: '',
    producer: '',
    year: '',
    type: ''
  });
  const [items, setItems] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const loadItems = async () => {
      try {
        console.log('Fetching items for event:', event.id);
        const response = await fetch(`/api/event/${event.id}/items`);
        console.log('Response status:', response.status);
        
        if (response.ok) {
          const existingItems = await response.json();
          console.log('Loaded items:', existingItems);
          setItems(existingItems);
        } else {
          console.error('Response not ok:', await response.text());
        }
      } catch (error) {
        console.error('Failed to load items:', error);
      }
    };
    loadItems();
  }, [event.id]);

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;

    setIsAdding(true);
    try {
      const response = await fetch(`/api/event/${event.id}/add-item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newItem.name.trim(),
          producer: newItem.producer.trim() || null,
          year: newItem.year ? parseInt(newItem.year) : null,
          type: newItem.type.trim() || null,
          addedBy: event.host_name
        })
      });

      if (response.ok) {
        const item = await response.json();
        setItems(prev => [...prev, item]);
        setNewItem({ name: '', producer: '', year: '', type: '' });
      }
    } catch (error) {
      console.error('Failed to add item:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl mb-2">{event.name}</h1>
      <p className="mb-4">Join code: <strong>{event.join_code}</strong></p>
      
      <form onSubmit={addItem} className="mb-4 space-y-2">
        <input
          type="text"
          value={newItem.name}
          onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Name"
          className="w-full p-2 border rounded"
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
          {isAdding ? 'Adding...' : 'Add'}
        </button>
      </form>

      <div>
        <h2 className="font-bold mb-2">Items ({items.length})</h2>
        {items.map((item) => (
          <div key={item.id} className="p-2 border-b">
            <div className="font-medium">{item.name}</div>
            {item.producer && <div className="text-sm text-gray-600">{item.producer}</div>}
            {item.type && <div className="text-sm text-gray-600">{item.type}</div>}
            {item.year && <div className="text-sm text-gray-600">{item.year}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
