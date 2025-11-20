'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { addItem } from '../../../../../lib/api/items';
import ItemForm from '../../../../components/ItemForm';

interface Event {
  id: string;
  name: string;
  beverage_type: string;
  host_name: string;
  join_code: string;
}

interface AddItemFormProps {
  event: Event;
}

export default function AddItemForm({ event }: AddItemFormProps) {
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userJson = localStorage.getItem(`event_${event.id}_user`);
    if (!userJson) {
      router.push(`/join/${event.join_code}`);
      return;
    }
    setUser(JSON.parse(userJson));
  }, [event.id, event.join_code, router]);

  const handleSubmit = async (formData: { name: string; producer: string; year: string; type: string }) => {
    if (!user) return;
    
    await addItem(event.id, {
      name: formData.name.trim(),
      producer: formData.producer.trim() || undefined,
      year: formData.year ? parseInt(formData.year) : undefined,
      type: formData.type.trim() || undefined,
      addedByUserId: user.id,
      addedByName: user.name
    });
  };

  if (!user) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <ItemForm
      eventId={event.id}
      eventName={event.name}
      beverageType={event.beverage_type}
      onSubmit={handleSubmit}
      submitLabel="Add Item"
      title="Add"
    />
  );
}
