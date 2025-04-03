import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Destinations from '@/pages/Destinations';
import Destination from '@/pages/Destination';
import Guides from '@/pages/Guides';
import Guide from '@/pages/Guide';
import { DataProvider } from '@/providers/DataProvider';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminDestinations from '@/pages/admin/AdminDestinations';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/providers/AuthProvider';
import AdminRouteGuard from '@/components/admin/AdminRouteGuard';
import Login from '@/pages/admin/Login';

const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destination/:id" element={<Destination />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/:id" element={<Guide />} />
            
            {/* Admin routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <AdminRouteGuard>
                  <AdminDashboard />
                </AdminRouteGuard>
              }
            />
            <Route
              path="/admin/destinations"
              element={
                <AdminRouteGuard>
                  <AdminDestinations />
                </AdminRouteGuard>
              }
            />
            
            {/* Fallback route */}
            <Route path="*" element={<Index />} />
          </Routes>
          <Toaster position="top-right" />
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
