
import AdminLayout from '@/components/admin/AdminLayout';
import { useData } from '@/providers/DataProvider';
import { MapPin, BookOpen, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { destinations, travelGuides, travelDeals, loading } = useData();

  const statCards = [
    {
      title: 'Destinations',
      count: destinations.length,
      icon: <MapPin size={20} />,
      color: 'bg-travel-blue',
      link: '/admin/destinations'
    },
    {
      title: 'Travel Guides',
      count: travelGuides.length,
      icon: <BookOpen size={20} />,
      color: 'bg-travel-green',
      link: '/admin/guides'
    },
    {
      title: 'Travel Deals',
      count: travelDeals.length,
      icon: <Tag size={20} />,
      color: 'bg-travel-coral',
      link: '/admin/deals'
    }
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to the Wanderlust Admin Panel</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {statCards.map((card, index) => (
          <Link 
            key={index} 
            to={card.link}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex items-center group"
          >
            <div className={`${card.color} rounded-full p-3 mr-4 text-white`}>
              {card.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{card.title}</p>
              <p className="text-2xl font-bold">
                {loading.destinations || loading.travelGuides || loading.travelDeals ? (
                  <span className="inline-block w-12 h-8 bg-gray-200 rounded animate-pulse"></span>
                ) : (
                  card.count
                )}
              </p>
            </div>
            <div className="ml-auto transform translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link 
            to="/admin/destinations?action=new"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="bg-travel-blue/10 p-2 rounded-full mr-3">
              <MapPin size={18} className="text-travel-blue" />
            </div>
            <span>Add New Destination</span>
          </Link>
          
          <Link 
            to="/admin/guides?action=new"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="bg-travel-green/10 p-2 rounded-full mr-3">
              <BookOpen size={18} className="text-travel-green" />
            </div>
            <span>Create Travel Guide</span>
          </Link>
          
          <Link 
            to="/admin/deals?action=new"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="bg-travel-coral/10 p-2 rounded-full mr-3">
              <Tag size={18} className="text-travel-coral" />
            </div>
            <span>Add New Deal</span>
          </Link>
        </div>
      </div>

      <div className="p-6 bg-travel-dark-blue/10 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Documentation</h2>
        <p className="text-gray-600">
          This admin panel allows you to manage your travel website content. You can add, edit, or remove destinations, 
          travel guides, and deals. All changes will be immediately reflected on your website.
        </p>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
