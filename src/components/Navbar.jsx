import React from 'react';
import { Cpu, Terminal, ExternalLink, Sun, Moon } from 'lucide-react';

export default function Navbar({ onNavigate, currentView }) {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    // Check if user has explicit preference, otherwise default to light
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
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
          <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center space-x-3 cursor-pointer">
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

          {/* Action Button - Control Room Login & Theme Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-dark-border text-slate-300 hover:text-brand-cyan hover:border-brand-cyan/40 transition-colors"
              title="Toggle Light/Dark Mode"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={() => onNavigate(currentView === 'admin' ? 'home' : 'admin')}
              className={`flex items-center space-x-2 rounded-lg px-4 py-2 text-xs font-mono tracking-wide uppercase transition-all duration-300 border ${
                currentView === 'admin' 
                  ? 'border-brand-emerald/40 bg-brand-emerald/10 text-brand-emerald hover:bg-brand-emerald/20' 
                  : 'border-brand-cyan/40 bg-brand-cyan/10 text-brand-cyan hover:bg-brand-cyan/20 glow-cyan'
              }`}
            >
              <Terminal className="h-4 w-4" />
              <span>{currentView === 'admin' ? 'Public Exit' : 'Control Room'}</span>
              <ExternalLink className="h-3 w-3 opacity-60" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
