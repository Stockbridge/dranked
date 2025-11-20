'use client';

import { updateItem } from '../../../../../lib/api/items';
import ItemForm from '../../../../components/ItemForm';

interface Event {
  id: string;
  name: string;
  beverage_type: string;
}

interface Item {
  id: string;
  name: string;
  producer?: string;
  year?: number;
  type?: string;
}

interface EditItemFormProps {
  event: Event;
  item: Item;
}

export default function EditItemForm({ event, item }: EditItemFormProps) {
  const handleSubmit = async (formData: { name: string; producer: string; year: string; type: string }) => {
    await updateItem(event.id, {
      itemId: item.id,
      name: formData.name.trim(),
      producer: formData.producer.trim() || undefined,
      year: formData.year ? parseInt(formData.year) : undefined,
      type: formData.type.trim() || undefined
    });
  };

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
