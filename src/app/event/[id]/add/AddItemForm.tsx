'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { addItem } from '@/utils/api/items';
import ItemForm from '@/components/ItemForm';
import { getUserForEvent } from '@/utils/user-storage';
import type { User, Event } from '../../../../../types/data';

interface AddItemFormProps {
  event: Event;
}

export default function AddItemForm({ event }: AddItemFormProps) {
  const [user] = useState<User | null>(() => getUserForEvent(event.id));
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(`/join/${event.join_code}`);
    }
  }, [user, event.join_code, router]);

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
