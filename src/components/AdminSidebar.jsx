import React from 'react';
import { LayoutDashboard, Package, Mail, CalendarDays, LogOut, Terminal, Cpu } from 'lucide-react';

export default function AdminSidebar({ activeTab, setActiveTab, onExit }) {
  const MENU_ITEMS = [
    { id: 'dashboard', name: 'Performance Matrix', icon: LayoutDashboard },
    { id: 'inventory', name: 'Inventory Manager', icon: Package },
    { id: 'queries', name: 'Client Queries', icon: Mail },
    { id: 'bookings', name: 'Consult Bookings', icon: CalendarDays }
  ];

  return (
    <aside className="w-64 border-r border-dark-border bg-[#050811] flex flex-col shrink-0 h-screen sticky top-0">
      {/* Top Brand Area */}
      <div className="p-6 border-b border-dark-border flex items-center space-x-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-cyan to-brand-emerald text-dark-bg">
          <Terminal className="h-5 w-5 stroke-[2]" />
        </div>
        <div>
          <span className="text-sm font-bold text-white tracking-wider">V-NOVA CONTROL</span>
          <span className="block text-[9px] tracking-widest text-brand-emerald font-mono uppercase">Secure Access Only</span>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white border border-transparent'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Profile / Exit Area */}
      <div className="p-4 border-t border-dark-border">
        <button
          onClick={onExit}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-mono tracking-wide uppercase transition-all duration-300"
        >
          <LogOut className="h-4 w-4" />
          <span>Exit Dashboard</span>
        </button>
      </div>
    </aside>
  );
}
