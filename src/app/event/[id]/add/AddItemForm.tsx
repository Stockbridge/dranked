'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { addItem } from '../../../../../lib/api/items';
import ItemForm from '../../../../components/ItemForm';
import { getUserForEvent } from '../../../../../lib/user-storage';
import type { User, EventSummary } from '../../../../../types/models';

interface AddItemFormProps {
  event: EventSummary;
}

export default function AddItemForm({ event }: AddItemFormProps) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = getUserForEvent(event.id);
    if (!userData) {
      router.push(`/join/${event.join_code}`);
      return;
    }
    setUser(userData);
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
