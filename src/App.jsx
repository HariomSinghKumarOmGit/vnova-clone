import React, { useState, useEffect } from 'react';

// Public Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Showcase from './components/Showcase';
import Industries from './components/Industries';
import Pricing from './components/Pricing';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';

// Admin Components
import AdminSidebar from './components/AdminSidebar';
import AdminDashboard from './components/AdminDashboard';
import AdminInventory from './components/AdminInventory';
import AdminQueries from './components/AdminQueries';
import AdminBookings from './components/AdminBookings';

export default function App() {
  const [layout, setLayout] = useState('public'); // 'public' | 'admin'
  const [adminTab, setAdminTab] = useState('dashboard');
  const [user, setUser] = useState(null); // { userId, isAdmin }
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);



  const handleNavigate = (view) => {
    if (view === 'admin') {
      if (user && user.isAdmin) {
        setLayout('admin');
        setAdminTab('dashboard');
      }
    } else {
      setLayout('public');
      if (currentPath !== '/') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
      }
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    // If admin, redirect to admin panel immediately
    if (userData.isAdmin) {
      setLayout('admin');
      setAdminTab('dashboard');
    } else {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setLayout('public');
  };
  
  const navigateToLogin = () => {
    window.history.pushState({}, '', '/login');
    setCurrentPath('/login');
  };

  if (currentPath === '/login') {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4 selection:bg-brand-cyan selection:text-dark-bg relative overflow-hidden">
        {/* Subtle grid background for industrial feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#080f1e_1px,transparent_1px),linear-gradient(to_bottom,#080f1e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none"></div>
        <LoginModal
          isOpen={true}
          isInline={true}
          onClose={() => {
            window.history.pushState({}, '', '/');
            setCurrentPath('/');
          }}
          onLogin={handleLogin}
        />
      </div>
    );
  }

  if (layout === 'admin') {
    return (
      <div className="min-h-screen bg-dark-bg flex">
        {/* Admin Sidebar */}
        <AdminSidebar 
          activeTab={adminTab} 
          setActiveTab={setAdminTab} 
          onExit={() => setLayout('public')} 
        />

        {/* Admin Main Workspace */}
        <main className="flex-1 overflow-y-auto h-screen p-8 lg:p-12 relative">
          {/* Subtle grid background for industrial feel */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#080f1e_1px,transparent_1px),linear-gradient(to_bottom,#080f1e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none"></div>

          <div className="relative z-10 max-w-5xl mx-auto">
            {adminTab === 'dashboard' && <AdminDashboard setActiveTab={setAdminTab} />}
            {adminTab === 'inventory' && <AdminInventory />}
            {adminTab === 'queries' && <AdminQueries />}
            {adminTab === 'bookings' && <AdminBookings />}
          </div>
        </main>
      </div>
    );
  }

  // Public Portal Layout
  return (
    <div className="min-h-screen bg-dark-bg selection:bg-brand-cyan selection:text-dark-bg">
      <Navbar 
        onNavigate={handleNavigate} 
        currentView="public" 
        user={user}
        onOpenLogin={navigateToLogin}
        onLogout={handleLogout}
      />
      
      <main>
        <Hero />
        <Showcase />
        <Industries />
        <Pricing />
        <ContactForm user={user} navigateToLogin={navigateToLogin} />
      </main>

      <Footer />
    </div>
  );
}
