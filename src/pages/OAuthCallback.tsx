import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../config/api';
import { useAuth } from '../context/AuthContext';

const BACKEND_URLS = ['https://prime-label-api.onrender.com', 'https://elabel-api-9d597d4b4feb.herokuapp.com'];

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processLogin = async () => {
      try {
        const token = new URLSearchParams(window.location.search).get('token');
        const errorParam = new URLSearchParams(window.location.search).get('error');
        const errorMessage = new URLSearchParams(window.location.search).get('message');

        console.log('Processing OAuth callback with:', { token: !!token, errorParam, errorMessage });

        if (errorParam) {
          throw new Error(errorMessage || 'Authentication failed');
        }

        if (!token) {
          throw new Error('No authentication token received');
        }

        // Try each backend URL until one works
        let userData = null;
        let error = null;

        for (const apiUrl of BACKEND_URLS) {
          try {
            console.log('Trying backend URL:', apiUrl);
            const response = await fetch(`${apiUrl}/api/auth/me`, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });

            if (!response.ok) {
              console.log(`Failed to fetch from ${apiUrl}:`, response.status, response.statusText);
              continue;
            }

            const data = await response.json();
            console.log('Received API response from', apiUrl, ':', data);

            if (data && data.success && data.user) {
              userData = data;
              break;
            }
          } catch (e) {
            console.log(`Error fetching from ${apiUrl}:`, e);
            error = e;
          }
        }

        if (!userData) {
          throw error || new Error('Failed to fetch user data from all backend URLs');
        }

        // Log the user data we received
        console.log('Successfully received user data:', {
          id: userData.user.id,
          email: userData.user.email,
          firstName: userData.user.firstName,
          lastName: userData.user.lastName,
        });

        // Update auth context with the token and user data
        login(token, userData.user);

        // Update axios default header for future requests
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Small delay to ensure state updates are processed
        setTimeout(() => {
          console.log('Navigation to /lookup');
          navigate('/lookup');
        }, 100);
      } catch (error: any) {
        console.error('Error processing OAuth callback:', error);
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });

        let errorMessage = error.message;
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }

        setError(errorMessage || 'Failed to complete authentication');
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
