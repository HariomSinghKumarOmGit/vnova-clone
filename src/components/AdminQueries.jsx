import React, { useEffect, useState } from 'react';
import { db } from '../lib/db';
import { Mail, Clock, ShieldAlert, FileText } from 'lucide-react';

export default function AdminQueries() {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    async function loadQueries() {
      const data = await db.getQueries();
      setQueries(data);
    }
    loadQueries();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-wider text-white uppercase font-mono">
          Client Queries Logs
        </h1>
        <p className="text-xs text-brand-cyan tracking-widest font-mono uppercase mt-1">
          B2B Communications Transmissions
        </p>
      </div>

      {/* Query Logs List */}
      <div className="space-y-4">
        {queries.length === 0 ? (
          <div className="rounded-xl border border-dark-border bg-dark-card/30 p-12 text-center text-slate-500 font-mono glass">
            No queries logged in storage. Submit inquiries in the Public Portal to populate this log.
          </div>
        ) : (
          queries.map((q) => (
            <div 
              key={q.id}
              className="rounded-xl border border-dark-border bg-dark-card/30 p-6 glass hover:border-brand-cyan/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-dark-border pb-4 mb-4">
                <div>
                  <span className="text-sm font-bold text-white tracking-wide">{q.company_name || 'Individual Client'}</span>
                  <span className="text-xs text-slate-400 block sm:inline sm:ml-3 font-mono">({q.full_name} / {q.company_email})</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-mono uppercase bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30">
                    {q.purpose}
                  </span>
                  <span className="text-xs text-slate-500 font-mono flex items-center space-x-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{new Date(q.created_at).toLocaleString()}</span>
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-slate-500 mb-1 flex items-center space-x-1">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Subject: {q.subject || 'N/A'}</span>
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed bg-dark-bg/50 p-4 rounded-lg border border-dark-border whitespace-pre-line font-sans">
                  {q.technical_message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
