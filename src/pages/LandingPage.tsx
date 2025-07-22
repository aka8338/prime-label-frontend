// src/pages/LandingPage.tsx
import { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import landingBackImage from '../assets/landingBack.png';
import landingPageBackImage from '../assets/landingPageBack.png';

export default function LandingPage() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_FRONT_END;
  const marketingSite = baseUrl + '/website/index.html';

  const handleLearnMore = () => {
    window.location.href = marketingSite;
  };

  const backgroundStyle = {
    backgroundColor: '#DDE5ED',
    minHeight: '100vh',
    position: 'relative' as const,
    overflow: 'hidden',
    display: 'flex',
  };

  const headerStyle: CSSProperties = {
    fontSize: '64px',
    fontWeight: 900,
    color: 'rgba(0, 0, 0, 0.9)',
    textAlign: 'center',
    marginBottom: '40px',
    paddingTop: '40px',
    position: 'relative',
    zIndex: 2,
  };

  const leftImageStyle: CSSProperties = {
    width: '25%',
    minHeight: '100vh',
    backgroundImage: `url(${landingBackImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.7,
    flex: 'none',
  };

  const rightImageStyle: CSSProperties = {
    width: '25%',
    minHeight: '100vh',
    backgroundImage: `url(${landingPageBackImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.7,
    flex: 'none',
  };

  const mainContentStyle: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minHeight: '100vh',
  };

  const contentWrapperStyle: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px 0',
  };

  const subtitleStyle: CSSProperties = {
    fontSize: '36px',
    fontWeight: 700,
    color: 'rgba(30, 58, 138, 0.8)',
    marginBottom: '24px',
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
  };

  const paragraphStyle: CSSProperties = {
    fontSize: '20px',
    color: 'rgba(31, 41, 55, 0.9)',
    lineHeight: 1.75,
    marginBottom: '24px',
  };

  const buttonContainerStyle: CSSProperties = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    padding: '64px 0',
  };

  const primaryButtonStyle: CSSProperties = {
    padding: '12px 32px',
    backgroundColor: '#2563eb',
    color: 'white',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: 600,
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.2s',
  };

  const secondaryButtonStyle: CSSProperties = {
    padding: '12px 32px',
    backgroundColor: 'transparent',
    color: '#2563eb',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: 600,
    cursor: 'pointer',
    border: '2px solid #2563eb',
    transition: 'background-color 0.2s',
  };

  const contentContainerStyle: CSSProperties = {
    maxWidth: '80%',
    margin: '0 auto',
    padding: '32px',
    backgroundColor: 'rgba(221, 229, 237, 0.9)',
    borderRadius: '16px',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div className="relative w-full overflow-auto">
      <div style={backgroundStyle}>
        <div style={leftImageStyle} />

        <div style={mainContentStyle}>
          <header>
            <h1 style={headerStyle}>Welcome to clinicalLabel.io</h1>
          </header>

          <div style={contentWrapperStyle}>
            <div style={contentContainerStyle}>
              <h2 style={subtitleStyle}>
                Empowering Patients,
                <br />
                Transforming Trials
              </h2>

              <p style={paragraphStyle}>
                At clinicalLabel.io, we believe clinical trial labels should put patients first. Our eLabels are designed to be clear, intuitive, and accessible — empowering participants with the
                information they need, when they need it, right from their smartphones.
              </p>

              <p style={paragraphStyle}>No more confusion, no more outdated paper labels. Just clarity, confidence, and care.</p>
            </div>
          </div>

          <div style={buttonContainerStyle}>
            <button
              style={primaryButtonStyle}
              onClick={() => navigate('/signup')}
              onMouseOver={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#1d4ed8';
              }}
              onMouseOut={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#2563eb';
              }}
            >
              Get Started
            </button>
            <button
              style={secondaryButtonStyle}
              onClick={handleLearnMore}
              onMouseOver={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'rgba(37, 99, 235, 0.05)';
              }}
              onMouseOut={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'transparent';
              }}
            >
              Learn More
            </button>
          </div>
        </div>

        <div style={rightImageStyle} />
      </div>
    </div>
  );
}
