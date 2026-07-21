import React from 'react';
import { Cpu, Sun, Moon, UserCircle, LogOut, ChevronDown } from 'lucide-react';

export default function Navbar({ onNavigate, user, onLogout }) {
  const [isDark, setIsDark] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const profileRef = React.useRef(null);

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  // Close profile dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-dark-border bg-dark-bg/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Section */}
          <a 
            href="#hero" 
            onClick={(e) => { 
              e.preventDefault(); 
              onNavigate('home'); 
              // Wait slightly for layout/view state transitions if switching layout, then scroll
              setTimeout(() => {
                const el = document.getElementById('hero');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }, 50);
            }} 
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-cyan to-brand-emerald text-dark-bg">
              <Cpu className="h-6 w-6 stroke-[2]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-wider text-white">V-NOVA</span>
              <span className="block text-[10px] tracking-widest text-brand-cyan font-mono uppercase">Industrial Corp</span>
            </div>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#showcase" 
              className="text-sm font-medium text-slate-300 hover:text-brand-cyan transition-colors"
            >
              Product Showcase
            </a>
            <a 
              href="#industries" 
              className="text-sm font-medium text-slate-300 hover:text-brand-cyan transition-colors"
            >
              Industries
            </a>
            <a 
              href="#pricing" 
              className="text-sm font-medium text-slate-300 hover:text-brand-cyan transition-colors"
            >
              Engineering Packages
            </a>
            <a 
              href="#contact" 
              className="text-sm font-medium text-slate-300 hover:text-brand-cyan transition-colors"
            >
              Contact & Bookings
            </a>
          </div>

          {/* Action Buttons - Theme Toggle & Login/Profile */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-dark-border text-slate-300 hover:text-brand-cyan hover:border-brand-cyan/40 transition-colors"
              title="Toggle Light/Dark Mode"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Profile Icon (Only shown when logged in) */}
            {user && (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 rounded-lg px-3 py-2 text-xs font-mono tracking-wide transition-all duration-300 border border-brand-emerald/40 bg-brand-emerald/10 text-brand-emerald hover:bg-brand-emerald/20"
                >
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-brand-cyan to-brand-emerald flex items-center justify-center text-dark-bg font-bold text-sm uppercase">
                    {user.userId.charAt(0)}
                  </div>
                  <span className="hidden sm:inline">{user.userId}</span>
                  <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border border-dark-border bg-dark-card shadow-xl overflow-hidden profile-dropdown-in z-50">
                    <div className="px-4 py-3 border-b border-dark-border">
                      <p className="text-xs font-mono text-brand-cyan uppercase tracking-wider">Signed in as</p>
                      <p className="text-sm text-white font-medium mt-0.5">{user.userId}</p>
                      {user.isAdmin && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                          Admin
                        </span>
                      )}
                    </div>

                    {user.isAdmin && (
                      <button
                        onClick={() => { setProfileOpen(false); onNavigate('admin'); }}
                        className="w-full px-4 py-2.5 text-left text-sm text-slate-300 hover:bg-white/5 hover:text-brand-cyan transition-colors flex items-center space-x-2"
                      >
                        <UserCircle className="h-4 w-4" />
                        <span>Admin Panel</span>
                      </button>
                    )}

                    <button
                      onClick={() => { setProfileOpen(false); onLogout(); }}
                      className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/5 hover:text-red-300 transition-colors flex items-center space-x-2 border-t border-dark-border"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
