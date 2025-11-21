'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateItem } from '@/utils/api/items';
import ItemForm from '@/components/ItemForm';
import { getUserForEvent } from '@/utils/user-storage';
import type { EventSummary, ItemSummary, User } from '../../../../../types/models';

interface EditItemFormProps {
  event: EventSummary;
  item: ItemSummary;
}

export default function EditItemForm({ event, item }: EditItemFormProps) {
  const [user] = useState<User | null>(() => getUserForEvent(event.id));
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(`/join/${event.join_code}`);
    }
  }, [user, event.join_code, router]);

  const handleSubmit = async (formData: { name: string; producer: string; year: string; type: string }) => {
    if (!user) return;

    await updateItem(event.id, {
      id: item.id,
      userId: user.id,
      name: formData.name.trim(),
      producer: formData.producer.trim() || undefined,
      year: formData.year ? parseInt(formData.year) : undefined,
      type: formData.type.trim() || undefined
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
      initialData={{
        name: item.name,
        producer: item.producer || '',
        year: item.year?.toString() || '',
        type: item.type || ''
      }}
      onSubmit={handleSubmit}
      submitLabel="Update Item"
      title="Edit"
    />
  );
}
