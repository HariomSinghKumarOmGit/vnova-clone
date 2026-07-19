import React, { useEffect, useState } from 'react';
import { db } from '../lib/db';
import { Calendar, Clock, CheckCircle2, AlertTriangle, Eye } from 'lucide-react';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    const data = await db.getBookings();
    setBookings(data);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleStatusChange = async (id, status) => {
    await db.updateBookingStatus(id, status);
    loadBookings();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-wider text-white uppercase font-mono">
          Consultation Bookings Logs
        </h1>
        <p className="text-xs text-brand-cyan tracking-widest font-mono uppercase mt-1">
          Factory floor visits scheduler log
        </p>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {bookings.length === 0 ? (
          <div className="rounded-xl border border-dark-border bg-dark-card/30 p-12 text-center text-slate-500 font-mono glass">
            No bookings scheduled yet. Submit bookings in the Public Portal to populate this log.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((b) => (
              <div 
                key={b.id}
                className="rounded-xl border border-dark-border bg-dark-card/30 p-6 glass flex flex-col justify-between hover:border-brand-cyan/30 transition-colors"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-wide">{b.visitor_name}</h3>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">Visitor Reference ID: {b.id.slice(0, 8)}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase border ${
                      b.status === 'Completed'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : b.status === 'Cancelled'
                        ? 'bg-red-500/10 text-red-400 border-red-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {b.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-slate-300 font-mono py-3 border-t border-b border-dark-border mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-brand-cyan" />
                      <span>Date: {b.target_date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-brand-cyan" />
                      <span>Slot: {b.time_slot}</span>
                    </div>
                  </div>
                </div>

                {/* Actions to update status */}
                <div className="flex justify-end space-x-2 pt-2">
                  {b.status === 'Scheduled' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(b.id, 'Completed')}
                        className="flex items-center space-x-1 text-xs text-brand-emerald bg-brand-emerald/10 border border-brand-emerald/20 hover:bg-brand-emerald/20 transition-all rounded px-2.5 py-1.5 font-mono"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Complete</span>
                      </button>
                      <button
                        onClick={() => handleStatusChange(b.id, 'Cancelled')}
                        className="flex items-center space-x-1 text-xs text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all rounded px-2.5 py-1.5 font-mono"
                      >
                        <AlertTriangle className="h-3.5 w-3.5" />
                        <span>Cancel</span>
                      </button>
                    </>
                  )}
                  {b.status !== 'Scheduled' && (
                    <span className="text-xs text-slate-600 font-mono italic">Log archived</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
