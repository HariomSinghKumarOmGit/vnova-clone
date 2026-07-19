import React, { useEffect, useState } from 'react';
import { db } from '../lib/db';
import { Mail, Phone, Clock, MapPin, Video, Cpu } from 'lucide-react';

export default function Footer() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function loadProfile() {
      const data = await db.getProfile();
      setProfile(data);
    }
    loadProfile();
  }, []);

  return (
    <footer className="border-t border-dark-border bg-[#020617] text-slate-400 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand details */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-cyan to-brand-emerald text-dark-bg">
                <Cpu className="h-6 w-6 stroke-[2]" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-wider text-white">{profile.company_name || 'V-NOVA'}</span>
                <span className="block text-[10px] tracking-widest text-brand-cyan font-mono uppercase">Industrial Corp</span>
              </div>
            </div>
            <p className="text-sm max-w-sm leading-relaxed">
              {profile.tagline || 'Precision Engineered Robotic Components & B2B Solutions'}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">System Map</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#showcase" className="hover:text-brand-cyan transition-colors">Product Showcase</a>
              </li>
              <li>
                <a href="#industries" className="hover:text-brand-cyan transition-colors">Industries</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-brand-cyan transition-colors">Engineering Packages</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-brand-cyan transition-colors">Contact & Bookings</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Coordinates */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Control Room Info</h4>
            <ul className="space-y-3 text-sm font-mono">
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand-cyan" />
                <a href={`mailto:${profile.support_email}`} className="hover:text-brand-cyan transition-colors text-xs truncate">
                  {profile.support_email}
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 shrink-0 text-brand-cyan" />
                <span className="text-xs">{profile.phone}</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Clock className="h-4 w-4 shrink-0 text-brand-cyan mt-0.5" />
                <span className="text-xs leading-normal">{profile.business_hours}</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-brand-cyan mt-0.5" />
                <span className="text-xs leading-relaxed">{profile.address}</span>
              </li>
              {profile.youtube_channel && (
                <li className="flex items-center space-x-2.5 pt-2">
                  <Video className="h-4 w-4 shrink-0 text-brand-cyan" />
                  <a 
                    href={profile.youtube_channel} 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:text-brand-cyan transition-colors text-xs"
                  >
                    YouTube Channel
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs space-y-4 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} V-Nova Industrial Corp. All system coordinates monitored.</p>
          <div className="flex space-x-6">
            <span className="hover:text-white transition-colors cursor-pointer">Security Protocol</span>
            <span className="hover:text-white transition-colors cursor-pointer">Export Controls</span>
            <span className="hover:text-white transition-colors cursor-pointer">System Logs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
