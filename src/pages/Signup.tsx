// src/pages/Signup.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../config/api';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/api/auth/signup', {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.data.success) {
        // Navigate to login page after successful signup
        navigate('/login');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: 'calc(100vh - 128px)',
        width: '100%',
        overflow: 'auto',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '2rem 0',
      }}
    >
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
        <div
          style={{
            borderBottom: '2px solid #E5E5E5',
            paddingBottom: '2rem',
            marginBottom: '2rem',
          }}
        >
          <h1
            style={{
              fontSize: '2.25rem',
              fontWeight: '700',
              color: '#10B981',
              textAlign: 'center',
            }}
          >
            Sign Up
          </h1>
        </div>

        {error && (
          <div
            style={{
              padding: '1rem',
              marginBottom: '1rem',
              backgroundColor: '#FEE2E2',
              border: '1px solid #FCA5A5',
              borderRadius: '0.375rem',
              color: '#DC2626',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name Fields Row */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            {/* First Name */}
            <div style={{ flex: 1 }}>
              <label
                htmlFor="firstName"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: '#374151',
                }}
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
                placeholder="First name"
              />
            </div>

            {/* Last Name */}
            <div style={{ flex: 1 }}>
              <label
                htmlFor="lastName"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: '#374151',
                }}
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
                placeholder="Last name"
              />
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '1rem',
                fontWeight: '500',
                color: '#374151',
              }}
            >
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
            <label
              htmlFor="password"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '1rem',
                fontWeight: '500',
                color: '#374151',
              }}
            >
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
              placeholder="Create a password"
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
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>

          <div
            style={{
              textAlign: 'center',
            }}
          >
            <p style={{ color: '#6B7280', fontSize: '1rem' }}>
              Already have an account?{' '}
              <Link
                to="/login"
                style={{
                  color: '#10B981',
                  fontWeight: '600',
                  textDecoration: 'none',
                }}
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
