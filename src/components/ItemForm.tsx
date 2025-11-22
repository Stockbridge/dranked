'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './Actions';
import { Input } from './Inputs';

/**
 * Form data structure for beverage items
 */
interface ItemFormData {
  name: string;
  producer: string;
  year: string;
  type: string;
}

/**
 * Props for the ItemForm component
 */
interface ItemFormProps {
  /** UUID of the event */
  eventId: string;
  /** Display name of the event */
  eventName: string;
  /** Type of beverage (beer, wine, whiskey) */
  beverageType: string;
  /** Initial form values for editing existing items */
  initialData?: ItemFormData;
  /** Async handler called when form is submitted */
  onSubmit: (data: ItemFormData) => Promise<void>;
  /** Text to display on submit button */
  submitLabel: string;
  /** Title prefix for the form (e.g., "Add" or "Edit") */
  title: string;
}

/**
 * Reusable form component for adding or editing beverage items.
 * Handles form state, validation, and navigation after submission.
 * 
 * @example
 * ```tsx
 * <ItemForm
 *   eventId="abc-123"
 *   eventName="Friday Beer Night"
 *   beverageType="beer"
 *   onSubmit={async (data) => await addItem(eventId, data)}
 *   submitLabel="Add Item"
 *   title="Add"
 * />
 * ```
 */
export default function ItemForm({ 
  eventId, 
  eventName, 
  beverageType, 
  initialData, 
  onSubmit, 
  submitLabel,
  title 
}: ItemFormProps) {
  const [formData, setFormData] = useState<ItemFormData>(
    initialData || { name: '', producer: '', year: '', type: '' }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      router.push(`/event/${eventId}`);
    } catch (error) {
      console.error('Failed to submit:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl mb-2">{title} {beverageType}</h1>
      <p className="mb-4">{eventName}</p>
      
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Name"
          required
        />
        <Input
          type="text"
          value={formData.producer}
          onChange={(e) => setFormData(prev => ({ ...prev, producer: e.target.value }))}
          placeholder="Producer (brewery/winery/distillery)"
        />
        <Input
          type="text"
          value={formData.type}
          onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
          placeholder="Type (IPA, Pinot Noir, etc.)"
        />
        <Input
          type="number"
          value={formData.year}
          onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
          placeholder="Year"
        />
        <Button
          type="submit"
          disabled={isSubmitting || !formData.name.trim()}
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </Button>
      </form>

      <Button
        onClick={() => router.back()}
        buttonType='secondary'
        className="mt-2"
      >
        Cancel
      </Button>
    </div>
  );
}
