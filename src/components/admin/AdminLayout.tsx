
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, BookOpen, Tag, LogOut } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-travel-dark-blue text-white p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Wanderlust Admin</h1>
          <p className="text-white/70 text-sm mt-1">Manage your travel content</p>
        </div>
        
        <nav className="space-y-1">
          <Link 
            to="/admin" 
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              isActive('/admin') 
                ? 'bg-white/20 text-white' 
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          
          <Link 
            to="/admin/destinations" 
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              isActive('/admin/destinations') 
                ? 'bg-white/20 text-white' 
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Map size={20} />
            <span>Destinations</span>
          </Link>
          
          <Link 
            to="/admin/guides" 
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              isActive('/admin/guides') 
                ? 'bg-white/20 text-white' 
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <BookOpen size={20} />
            <span>Travel Guides</span>
          </Link>
          
          <Link 
            to="/admin/deals" 
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              isActive('/admin/deals') 
                ? 'bg-white/20 text-white' 
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Tag size={20} />
            <span>Travel Deals</span>
          </Link>
        </nav>
        
        <div className="mt-auto pt-6">
          <Link 
            to="/" 
            className="flex items-center space-x-3 p-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span>Back to Website</span>
          </Link>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-grow p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
