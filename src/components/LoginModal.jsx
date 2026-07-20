import React, { useState, useEffect, useRef } from 'react';
import { X, Lock, User, Eye, EyeOff, Shield, AlertCircle, Loader2 } from 'lucide-react';

// Build credentials map from env variables at startup
function getCredentials() {
  const creds = [];
  let i = 1;
  while (true) {
    const id = import.meta.env[`VITE_U${i}_ID`];
    const pass = import.meta.env[`VITE_U${i}_PASS`];
    if (!id || !pass) break;
    creds.push({ id, pass, isAdmin: id === 'admin' });
    i++;
  }
  return creds;
}

const CREDENTIALS = getCredentials();

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 300);
    }
    if (isOpen) {
      setUserId('');
      setPassword('');
      setError('');
      setIsClosing(false);
    }
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 250);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!userId.trim() || !password.trim()) {
      setError('Please fill in both fields.');
      return;
    }

    setIsLoading(true);

    // Simulate a brief network delay for UX polish
    await new Promise(r => setTimeout(r, 600));

    const match = CREDENTIALS.find(c => c.id === userId.trim() && c.pass === password);

    if (match) {
      onLogin({ userId: match.id, isAdmin: match.isAdmin });
      handleClose();
    } else {
      setError('Invalid credentials. Please try again.');
    }

    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center ${isClosing ? 'login-backdrop-out' : 'login-backdrop-in'}`}
      style={{ background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      onClick={handleClose}
    >
      <div
        className={`relative w-[90vw] max-w-lg h-[80vh] max-h-[640px] flex flex-col rounded-2xl border border-dark-border overflow-hidden ${isClosing ? 'login-card-out' : 'login-card-in'}`}
        style={{
          background: 'linear-gradient(165deg, rgba(15,23,42,0.95) 0%, rgba(9,13,22,0.98) 100%)',
          boxShadow: '0 0 60px -15px rgba(6, 182, 212, 0.15), 0 25px 50px -12px rgba(0,0,0,0.6)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Decorative top glow bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-70"></div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 sm:px-12">
          {/* Icon */}
          <div className="mb-6 relative">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-brand-cyan/20 to-brand-emerald/10 border border-brand-cyan/20 flex items-center justify-center">
              <Shield className="h-10 w-10 text-brand-cyan" />
            </div>
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-2xl border border-brand-cyan/30 animate-ping opacity-20 pointer-events-none"></div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-1 tracking-tight">Secure Access</h2>
          <p className="text-sm text-slate-400 mb-8 text-center">
            Enter your credentials to continue
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-5">
            {/* User ID field */}
            <div className="space-y-1.5">
              <label htmlFor="login-userid" className="text-xs font-mono tracking-wider uppercase text-slate-400">
                User ID
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  ref={inputRef}
                  id="login-userid"
                  type="text"
                  value={userId}
                  onChange={e => { setUserId(e.target.value); setError(''); }}
                  placeholder="Enter your user ID"
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-input border border-dark-border text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-cyan/60 focus:ring-1 focus:ring-brand-cyan/30 transition-all"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <label htmlFor="login-password" className="text-xs font-mono tracking-wider uppercase text-slate-400">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-dark-input border border-dark-border text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-cyan/60 focus:ring-1 focus:ring-brand-cyan/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs login-error-in">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-semibold text-sm tracking-wide uppercase transition-all duration-300 flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-cyan to-brand-emerald text-dark-bg hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.4)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 spinner" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Bottom hint */}
          <p className="mt-6 text-[11px] text-slate-600 text-center">
            Access is restricted to authorized personnel only.
          </p>
        </div>

        {/* Decorative bottom elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-cyan/[0.03] to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
