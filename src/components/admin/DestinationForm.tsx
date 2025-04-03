
import { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { Destination } from '@/lib/types';

interface DestinationFormProps {
  destination?: Destination;
  onSubmit: (data: Partial<Destination>) => void;
  onCancel: () => void;
}

const DestinationForm = ({ destination, onSubmit, onCancel }: DestinationFormProps) => {
  const [formData, setFormData] = useState<Partial<Destination>>({
    id: '',
    name: '',
    country: '',
    description: '',
    longDescription: '',
    image: '',
    gallery: [''],
    rating: 0,
    reviews: 0,
    latitude: 0,
    longitude: 0,
    tags: [''],
    bestTimeToVisit: '',
    localCurrency: '',
    language: '',
    travelTips: ['']
  });

  useEffect(() => {
    if (destination) {
      setFormData({
        ...destination,
        // Ensure arrays have at least one empty item if they're empty
        gallery: destination.gallery?.length ? [...destination.gallery] : [''],
        tags: destination.tags?.length ? [...destination.tags] : [''],
        travelTips: destination.travelTips?.length ? [...destination.travelTips] : ['']
      });
    }
  }, [destination]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleArrayChange = (index: number, field: 'gallery' | 'tags' | 'travelTips', value: string) => {
    setFormData(prev => {
      const newArray = [...(prev[field] || [])];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const handleAddArrayItem = (field: 'gallery' | 'tags' | 'travelTips') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), '']
    }));
  };

  const handleRemoveArrayItem = (index: number, field: 'gallery' | 'tags' | 'travelTips') => {
    setFormData(prev => {
      const newArray = [...(prev[field] || [])];
      newArray.splice(index, 1);
      if (newArray.length === 0) newArray.push(''); // Keep at least one empty input
      return { ...prev, [field]: newArray };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clean up empty array values
    const cleanedData = {
      ...formData,
      gallery: formData.gallery?.filter(url => url.trim() !== '') || [],
      tags: formData.tags?.filter(tag => tag.trim() !== '') || [],
      travelTips: formData.travelTips?.filter(tip => tip.trim() !== '') || []
    };
    
    onSubmit(cleanedData);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        {destination ? 'Edit Destination' : 'Add New Destination'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              disabled={!!destination}
              placeholder="unique-destination-id"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-blue"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              {destination ? "ID cannot be changed" : "Unique identifier (use kebab-case)"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Destination Name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-blue"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-blue"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <input
              type="number"
              name="rating"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={handleNumberChange}
              placeholder="Rating (0-5)"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-blue"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Reviews</label>
            <input
              type="number"
              name="reviews"
              min="0"
              value={formData.reviews}
              onChange={handleNumberChange}
              placeholder="Number of Reviews"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-blue"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Best Time to Visit</label>
            <input
              type="text"
              name="bestTimeToVisit"
              value={formData.bestTimeToVisit}
              onChange={handleChange}
              placeholder="e.g., April to October"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-blue"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="A brief description of the destination"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-blue"
            rows={2}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Long Description</label>
          <textarea
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            placeholder="A detailed description of the destination"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-blue"
            rows={5}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
            <input
              type="number"
              name="latitude"
              step="any"
              value={formData.latitude}
              onChange={handleNumberChange}
              placeholder="Latitude"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-blue"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
            <input
              type="number"
              name="longitude"
              step="any"
              value={formData.longitude}
              onChange={handleNumberChange}
              placeholder="Longitude"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-blue"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Local Currency</label>
            <input
              type="text"
              name="localCurrency"
              value={formData.localCurrency}
              onChange={handleChange}
              placeholder="e.g., Euro (€)"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-blue"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              placeholder="e.g., English, Spanish"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-blue"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Main Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-blue"
            required
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Gallery Images</label>
            <button
              type="button"
              onClick={() => handleAddArrayItem('gallery')}
              className="text-travel-blue hover:text-travel-blue/80 text-sm flex items-center"
            >
              <Plus size={16} className="mr-1" /> Add Image
            </button>
          </div>

          {formData.gallery?.map((url, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={url}
                onChange={(e) => handleArrayChange(index, 'gallery', e.target.value)}
                placeholder="https://example.com/gallery-image.jpg"
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-travel-blue"
              />
              <button
                type="button"
                onClick={() => handleRemoveArrayItem(index, 'gallery')}
                className="bg-gray-200 hover:bg-gray-300 px-3 rounded-r-md flex items-center"
                disabled={formData.gallery?.length === 1 && url === ''}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Tags</label>
            <button
              type="button"
              onClick={() => handleAddArrayItem('tags')}
              className="text-travel-blue hover:text-travel-blue/80 text-sm flex items-center"
            >
              <Plus size={16} className="mr-1" /> Add Tag
            </button>
          </div>

          {formData.tags?.map((tag, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={tag}
                onChange={(e) => handleArrayChange(index, 'tags', e.target.value)}
                placeholder="e.g., beaches, nature, adventure"
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-travel-blue"
              />
              <button
                type="button"
                onClick={() => handleRemoveArrayItem(index, 'tags')}
                className="bg-gray-200 hover:bg-gray-300 px-3 rounded-r-md flex items-center"
                disabled={formData.tags?.length === 1 && tag === ''}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Travel Tips</label>
            <button
              type="button"
              onClick={() => handleAddArrayItem('travelTips')}
              className="text-travel-blue hover:text-travel-blue/80 text-sm flex items-center"
            >
              <Plus size={16} className="mr-1" /> Add Tip
            </button>
          </div>

          {formData.travelTips?.map((tip, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={tip}
                onChange={(e) => handleArrayChange(index, 'travelTips', e.target.value)}
                placeholder="Enter a travel tip"
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-travel-blue"
              />
              <button
                type="button"
                onClick={() => handleRemoveArrayItem(index, 'travelTips')}
                className="bg-gray-200 hover:bg-gray-300 px-3 rounded-r-md flex items-center"
                disabled={formData.travelTips?.length === 1 && tip === ''}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-travel-blue text-white rounded-md hover:bg-travel-blue/90 transition-colors"
          >
            {destination ? 'Save Changes' : 'Create Destination'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DestinationForm;
