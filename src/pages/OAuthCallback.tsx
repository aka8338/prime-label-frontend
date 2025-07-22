import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../config/api';
import { useAuth } from '../context/AuthContext';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const processLogin = async () => {
      try {
        const token = new URLSearchParams(window.location.search).get('token');

        if (token) {
          // Get user data
          const response = await api.get('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });

          // Update auth context with the token and user data
          login(token, response.data.user);

          // Redirect to the lookup page
          navigate('/lookup');
        } else {
          // If no token, redirect back to login
          navigate('/login');
        }
      } catch (error) {
        console.error('Error processing OAuth callback:', error);
        navigate('/login');
      }
    };

    processLogin();
  }, [navigate, login]);

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
