// src/pages/LandingPage.tsx
import landingBackImage from '../assets/landingBack.png';
import landingPageBackImage from '../assets/landingPageBack.png';

export default function LandingPage() {
  const backgroundStyle = {
    backgroundImage: `url(${landingBackImage}), url(${landingPageBackImage})`,
    backgroundSize: 'cover, cover',
    backgroundPosition: 'center, center',
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundAttachment: 'fixed, fixed',
    backgroundBlendMode: 'overlay',
    minHeight: '100vh',
  };

  return <div style={backgroundStyle} className="min-h-screen"></div>;
}
