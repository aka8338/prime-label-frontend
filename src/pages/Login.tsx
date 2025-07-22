// src/pages/Login.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../config/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        // Use auth context login
        login(response.data.token, response.data.user);
        // Update axios default header for future requests
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        // Navigate to lookup page
        navigate('/lookup');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      setError('');
      const currentUrl = window.location.origin;

      // Try both backend URLs
      const backendUrls = ['https://prime-label-api.onrender.com', 'https://elabel-api-9d597d4b4feb.herokuapp.com'];

      // Check which backend is available
      let workingBackendUrl = null;
      for (const url of backendUrls) {
        try {
          const response = await fetch(`${url}/health`);
          if (response.ok) {
            workingBackendUrl = url;
            break;
          }
        } catch (error) {
          console.error(`Failed to connect to ${url}:`, error);
          continue;
        }
      }

      if (!workingBackendUrl) {
        throw new Error('Unable to connect to authentication server. Please try again later.');
      }

      // Use the working backend URL or default to the first one
      const apiUrl = workingBackendUrl;

      window.location.href = `${apiUrl}/api/auth/google?redirect=${encodeURIComponent(currentUrl)}`;
    } catch (error: any) {
      setError(error.message || 'Failed to initiate Google login. Please try again.');
      setGoogleLoading(false);
    }
  };

  return (
    <div style={{ height: 'calc(100vh - 128px)', width: '100%', overflow: 'auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '2rem 0' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '28rem',
          padding: '3rem',
          backgroundColor: '#F5F5F5',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '2px solid #E5E5E5',
          margin: '0 auto',
        }}
      >
        <div style={{ borderBottom: '2px solid #E5E5E5', paddingBottom: '2rem', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '700', color: '#10B981', textAlign: 'center' }}>Login</h1>
        </div>

        {error && <div style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: '0.375rem', color: '#DC2626' }}>{error}</div>}

        <button
          onClick={handleGoogleLogin}
          type="button"
          disabled={googleLoading}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            backgroundColor: 'white',
            color: '#374151',
            borderRadius: '0.5rem',
            fontWeight: '600',
            fontSize: '1rem',
            border: '2px solid #E5E5E5',
            cursor: googleLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
            transition: 'all 0.2s',
            opacity: googleLoading ? 0.7 : 1,
          }}
        >
          {googleLoading ? (
            <div style={{ width: '20px', height: '20px', border: '2px solid #4285F4', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
          )}
          {googleLoading ? 'Connecting...' : 'Continue with Google'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', margin: '2rem 0' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E5E5' }}></div>
          <span style={{ padding: '0 1rem', color: '#6B7280', fontSize: '0.875rem' }}>OR</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E5E5' }}></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '2rem' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '500', color: '#374151' }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: '2px solid #E5E5E5',
                outline: 'none',
                transition: 'all 0.2s',
                backgroundColor: 'white',
                color: '#374151',
              }}
              placeholder="Enter your email"
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '500', color: '#374151' }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: '2px solid #E5E5E5',
                outline: 'none',
                transition: 'all 0.2s',
                backgroundColor: 'white',
                color: '#374151',
              }}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              backgroundColor: loading ? '#9CA3AF' : '#10B981',
              color: 'white',
              borderRadius: '0.5rem',
              fontWeight: '600',
              fontSize: '1.125rem',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              transition: 'all 0.2s',
              marginBottom: '2rem',
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#6B7280', fontSize: '1rem' }}>
              Don't have an account?{' '}
              <Link to="/signup" style={{ color: '#10B981', fontWeight: '600', textDecoration: 'none' }}>
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
