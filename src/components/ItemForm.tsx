'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './Buttons';
import { Input } from './Inputs';

interface ItemFormData {
  name: string;
  producer: string;
  year: string;
  type: string;
}

interface ItemFormProps {
  eventId: string;
  eventName: string;
  beverageType: string;
  initialData?: ItemFormData;
  onSubmit: (data: ItemFormData) => Promise<void>;
  submitLabel: string;
  title: string;
}

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
