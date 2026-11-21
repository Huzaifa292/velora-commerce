import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { loginAdmin } = useAuthStore();

  const [email, setEmail] = useState('admin@velora.demo');
  const [password, setPassword] = useState('Velora123!');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const res = loginAdmin(email, password);
    if (!res.success) {
      setError(res.message);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D10] text-gray-200 flex flex-col justify-center items-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <span className="font-editorial text-4xl tracking-[0.25em] font-medium text-velora-gold">
              VELORA
            </span>
          </Link>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 font-mono">
            Executive Suite Administration
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div className="bg-[#18181D] border border-velora-gold/40 p-4 rounded-sm space-y-2 text-xs">
          <div className="flex items-center space-x-2 text-velora-gold font-semibold uppercase tracking-wider text-[11px]">
            <ShieldCheck className="w-4 h-4" />
            <span>Preloaded Demonstration Credentials</span>
          </div>
          <div className="font-mono text-[11px] text-gray-300 space-y-1 bg-[#101014] p-3 rounded border border-[#292930]">
            <p>Email: <span className="text-velora-gold">admin@velora.demo</span></p>
            <p>Password: <span className="text-velora-gold">Velora123!</span></p>
          </div>
          <p className="text-[10px] text-gray-400">
            Clicking "Enter Administrative Suite" below with these credentials signs you straight into the live management dashboard.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-[#141418] border border-[#27272F] p-6 sm:p-8 space-y-5 rounded shadow-2xl">
          {error && (
            <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded">
              {error}
            </div>
          )}

          <div>
            <label className="text-[11px] uppercase tracking-wider text-gray-300 font-semibold block mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1D1D23] border border-[#30303A] pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-velora-gold rounded"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-wider text-gray-300 font-semibold block mb-1">
              Secret Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1D1D23] border border-[#30303A] pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-velora-gold rounded"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-velora-gold hover:bg-velora-gold-light text-black text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 rounded flex items-center justify-center space-x-2 shadow-lg"
          >
            <span>Enter Administrative Suite</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="text-center text-xs text-gray-500">
          <Link to="/" className="hover:text-velora-gold transition-colors">
            ← Return to Customer Storefront
          </Link>
        </div>
      </div>
    </div>
  );
};
