
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import DestinationForm from '@/components/admin/DestinationForm';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { useData } from '@/providers/DataProvider';
import { supabase } from '@/lib/supabase';
import { Destination } from '@/lib/types';
import { toast } from 'sonner';

const AdminDestinations = () => {
  const { destinations, loading, error, refetch } = useData();
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check for query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('action') === 'new') {
      setShowForm(true);
      // Clear the query parameter without triggering reload
      navigate('/admin/destinations', { replace: true });
    }
  }, [location, navigate]);
  
  const handleAddNew = () => {
    setSelectedDestination(null);
    setShowForm(true);
  };
  
  const handleEdit = (destination: Destination) => {
    setSelectedDestination(destination);
    setShowForm(true);
  };
  
  const handleDelete = (destination: Destination) => {
    setSelectedDestination(destination);
    setShowDeleteDialog(true);
  };
  
  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedDestination(null);
  };
  
  const handleSubmitForm = async (destinationData: Partial<Destination>) => {
    setIsSubmitting(true);
    try {
      if (selectedDestination) {
        // Update existing destination
        const { error } = await supabase
          .from('destinations')
          .update(destinationData)
          .eq('id', selectedDestination.id);
        
        if (error) throw error;
        toast.success('Destination updated successfully');
      } else {
        // Create new destination
        const { error } = await supabase
          .from('destinations')
          .insert([destinationData]);
        
        if (error) throw error;
        toast.success('Destination created successfully');
      }
      
      // Refresh the destinations list
      refetch.destinations();
      handleCancelForm();
    } catch (error) {
      console.error('Error saving destination:', error);
      toast.error('Failed to save destination');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleConfirmDelete = async () => {
    if (!selectedDestination) return;
    
    try {
      const { error } = await supabase
        .from('destinations')
        .delete()
        .eq('id', selectedDestination.id);
      
      if (error) throw error;
      
      toast.success('Destination deleted successfully');
      refetch.destinations();
      setShowDeleteDialog(false);
      setSelectedDestination(null);
    } catch (error) {
      console.error('Error deleting destination:', error);
      toast.error('Failed to delete destination');
    }
  };
  
  const columns = [
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'country',
      label: 'Country',
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (value: number) => value.toFixed(1),
    },
    {
      key: 'tags',
      label: 'Tags',
      render: (tags: string[]) => (
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-0.5 text-xs bg-travel-warm-gray rounded-full"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-xs text-gray-500">+{tags.length - 3} more</span>
          )}
        </div>
      ),
    },
    {
      key: 'image',
      label: 'Image',
      render: (value: string, item: Destination) => (
        <img 
          src={value} 
          alt={item.name} 
          className="w-12 h-12 object-cover rounded"
        />
      ),
    },
  ];
  
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Destinations</h1>
        <p className="text-gray-600 mt-1">Add, edit or remove destinations</p>
      </div>
      
      {showForm ? (
        <DestinationForm
          destination={selectedDestination || undefined}
          onSubmit={handleSubmitForm}
          onCancel={handleCancelForm}
        />
      ) : (
        <DataTable
          title="Destinations"
          data={destinations}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAddNew}
          searchPlaceholder="Search destinations..."
        />
      )}
      
      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Destination"
        message={`Are you sure you want to delete "${selectedDestination?.name}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </AdminLayout>
  );
};

export default AdminDestinations;
