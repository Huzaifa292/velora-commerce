import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { loginCustomer } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const res = loginCustomer(email, password);
    if (!res.success) {
      setError(res.message);
    } else {
      navigate('/account');
    }
  };

  const handleQuickDemoLogin = (demoEmail) => {
    loginCustomer(demoEmail, 'password123');
    navigate('/account');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-velora-gold font-medium">
          Client Portal
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-velora-black font-medium">
          PATRON SIGN IN
        </h1>
        <p className="text-xs text-velora-taupe font-light">
          Access your personal curation, order archives, and private invitations.
        </p>
      </div>

      {/* Demo Credentials Helper Pill */}
      <div className="bg-velora-sand/20 border border-velora-sand p-4 text-xs space-y-2">
        <div className="flex items-center space-x-1.5 text-velora-black font-semibold uppercase tracking-wider text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-velora-gold" />
          <span>Demo Authentication Available</span>
        </div>
        <p className="text-velora-taupe">Click below to sign in instantly with a preloaded VIP patron profile:</p>
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('helena.vance@vancemedia.com')}
            className="px-2.5 py-1 bg-white border border-velora-sand text-[11px] hover:border-velora-gold hover:text-velora-gold transition-colors"
          >
            Helena Vance (VIP)
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('julian@sterlingholdings.co.uk')}
            className="px-2.5 py-1 bg-white border border-velora-sand text-[11px] hover:border-velora-gold hover:text-velora-gold transition-colors"
          >
            Julian Sterling (VIP)
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-velora-sand p-6 sm:p-8 space-y-5 shadow-sm">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
            {error}
          </div>
        )}

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
          <div className="flex justify-between items-center mb-1">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-velora-charcoal">
              Password
            </label>
            <span className="text-[10px] text-velora-taupe cursor-pointer hover:underline">
              Forgot?
            </span>
          </div>
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
          <span>Sign In to Portal</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <div className="text-center pt-2 text-xs text-velora-taupe">
          New to the House of Velora?{' '}
          <Link to="/account/register" className="text-velora-black font-semibold hover:underline">
            Register Account
          </Link>
        </div>
      </form>
    </div>
  );
};
