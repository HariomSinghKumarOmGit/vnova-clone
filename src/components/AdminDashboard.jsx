import React, { useEffect, useState } from 'react';
import { db } from '../lib/db';
import { Package, Mail, Users, ArrowRight, Check, AlertCircle } from 'lucide-react';

export default function AdminDashboard({ setActiveTab }) {
  const [stats, setStats] = useState({
    partsCount: 0,
    queriesCount: 0,
    applicantsCount: 14 // Mocked static count as per prompts
  });
  const [recentQueries, setRecentQueries] = useState([]);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const products = await db.getProducts();
        const queries = await db.getQueries();
        
        setStats({
          partsCount: products.length,
          queriesCount: queries.length,
          applicantsCount: 14
        });
        
        // Take latest 3 queries
        setRecentQueries(queries.slice(0, 3));
      } catch (err) {
        console.error("Error loading dashboard stats:", err);
      }
    }
    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-wider text-white uppercase font-mono">
          Dashboard Performance Matrix
        </h1>
        <p className="text-xs text-brand-cyan tracking-widest font-mono uppercase mt-1">
          System Overview & Telemetry
        </p>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {/* Metric 1 */}
        <div className="rounded-xl border border-dark-border bg-dark-card/40 p-6 glass flex items-center justify-between">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Parts in Catalog
            </p>
            <p className="mt-2 text-3xl font-extrabold text-white font-mono">
              {stats.partsCount}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan">
            <Package className="h-6 w-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="rounded-xl border border-dark-border bg-dark-card/40 p-6 glass flex items-center justify-between">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Unread Queries
            </p>
            <p className="mt-2 text-3xl font-extrabold text-white font-mono">
              {stats.queriesCount}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald">
            <Mail className="h-6 w-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="rounded-xl border border-dark-border bg-dark-card/40 p-6 glass flex items-center justify-between">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Career Applicants
            </p>
            <p className="mt-2 text-3xl font-extrabold text-white font-mono">
              {stats.applicantsCount}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400">
            <Users className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Recent Queries Area */}
      <div className="rounded-xl border border-dark-border bg-dark-card/30 glass overflow-hidden">
        <div className="p-6 border-b border-dark-border flex items-center justify-between bg-dark-card/20">
          <div>
            <h2 className="text-base font-bold text-white tracking-wide uppercase font-mono">
              Recent Client Queries
            </h2>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Live transmission log from public portal contact forms
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('queries')}
            className="flex items-center space-x-1.5 text-xs font-mono tracking-wider uppercase text-brand-cyan hover:text-brand-cyan-glow transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-dark-highlight text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-dark-border">
              <tr>
                <th className="px-6 py-3.5">Company</th>
                <th className="px-6 py-3.5">Subject</th>
                <th className="px-6 py-3.5">Sender</th>
                <th className="px-6 py-3.5">Scope</th>
                <th className="px-6 py-3.5">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {recentQueries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-500 font-mono">
                    No queries logged. Submit the public contact form to seed database.
                  </td>
                </tr>
              ) : (
                recentQueries.map((query) => (
                  <tr key={query.id} className="hover:bg-dark-highlight/40 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">
                      {query.company_name || 'Individual'}
                    </td>
                    <td className="px-6 py-4 truncate max-w-xs">
                      {query.subject || 'B2B Inquiry'}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">
                      {query.full_name}
                      <span className="block text-[10px] text-slate-500">{query.company_email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                        query.purpose === 'Consulting' 
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                          : query.purpose === 'Milling'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {query.purpose}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 font-mono">
                      {new Date(query.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
