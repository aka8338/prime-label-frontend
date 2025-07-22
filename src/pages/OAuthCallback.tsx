import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../config/api';
import { useAuth } from '../context/AuthContext';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processLogin = async () => {
      try {
        const token = new URLSearchParams(window.location.search).get('token');
        const errorParam = new URLSearchParams(window.location.search).get('error');

        if (errorParam) {
          throw new Error(errorParam === 'auth_failed' ? 'Authentication failed' : errorParam);
        }

        if (!token) {
          throw new Error('No authentication token received');
        }

        // Get user data
        const response = await api.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.data.user) {
          throw new Error('No user data received');
        }

        // Update auth context with the token and user data
        login(token, response.data.user);

        // Update axios default header for future requests
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Small delay to ensure state updates are processed
        setTimeout(() => {
          // Navigate to lookup page, just like regular login
          navigate('/lookup');
        }, 100);
      } catch (error: any) {
        console.error('Error processing OAuth callback:', error);
        setError(error.message || 'Failed to complete authentication');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    };

    processLogin();
  }, [navigate, login]);

  if (error) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#DDE5ED',
        }}
      >
        <div
          style={{
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#EF4444',
              marginBottom: '1rem',
            }}
          >
            Authentication Failed
          </h2>
          <p style={{ color: '#6B7280' }}>{error}</p>
          <p style={{ color: '#6B7280', marginTop: '0.5rem' }}>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DDE5ED',
      }}
    >
      <div
        style={{
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '1rem',
          }}
        >
          Processing login...
        </h2>
        <p style={{ color: '#6B7280' }}>Please wait while we complete your sign-in.</p>
      </div>
    </div>
  );
}
