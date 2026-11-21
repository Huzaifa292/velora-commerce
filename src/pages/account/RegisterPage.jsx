import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { ArrowRight, Check } from 'lucide-react';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerCustomer } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const res = registerCustomer(name, email, password);
    if (!res.success) {
      setError(res.message);
    } else {
      navigate('/account');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-velora-gold font-medium">
          Privileged Membership
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-velora-black font-medium">
          CREATE ACCOUNT
        </h1>
        <p className="text-xs text-velora-taupe font-light">
          Enjoy personal styling appointments, order tracking, and seasonal invitations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-velora-sand p-6 sm:p-8 space-y-5 shadow-sm">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
            {error}
          </div>
        )}

        <div>
          <label className="text-[11px] uppercase tracking-wider font-semibold text-velora-charcoal block mb-1">
            Full Legal Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Camille Laurent"
            className="w-full bg-velora-ivory/30 border border-velora-sand px-3 py-2.5 text-xs focus:outline-none focus:border-velora-gold"
          />
        </div>

        <div>
          <label className="text-[11px] uppercase tracking-wider font-semibold text-velora-charcoal block mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="client@luxury.com"
            className="w-full bg-velora-ivory/30 border border-velora-sand px-3 py-2.5 text-xs focus:outline-none focus:border-velora-gold"
          />
        </div>

        <div>
          <label className="text-[11px] uppercase tracking-wider font-semibold text-velora-charcoal block mb-1">
            Choose Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-velora-ivory/30 border border-velora-sand px-3 py-2.5 text-xs focus:outline-none focus:border-velora-gold"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-velora-black hover:bg-velora-gold hover:text-velora-black text-white text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <span>Complete Registration</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <div className="text-center pt-2 text-xs text-velora-taupe">
          Already a patron?{' '}
          <Link to="/account/login" className="text-velora-black font-semibold hover:underline">
            Sign In Here
          </Link>
        </div>
      </form>
    </div>
  );
};
