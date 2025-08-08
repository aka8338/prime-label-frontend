// src/App.tsx
import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import DemoPage from './pages/demo';
import LabelLookup from './pages/LabelLookup';
import LabelPage from './pages/LabelPage';

// Component to handle external redirect
const MainWebsiteRedirect = () => {
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_FRONT_END;
    const mainWebsite = baseUrl + '/main-website/index.html';
    window.location.href = mainWebsite;
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f3f4f6',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h2>Redirecting to main website...</h2>
        <p>Please wait while we redirect you to the main website.</p>
      </div>
    </div>
  );
};

export default function App() {
  const baseUrl = import.meta.env.VITE_FRONT_END;
  const marketingSite = baseUrl + '/website/index.html';
  const mainWebsite = baseUrl + '/main-website/index.html';

  return (
    <Router>
      <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
        <Navbar marketingSite={marketingSite} mainWebsite={mainWebsite} />

        <main
          style={{
            paddingTop: '64px',
            paddingBottom: '64px',
            minHeight: 'calc(100vh - 64px)',
            backgroundColor: '#f3f4f6',
          }}
        >
          <Routes>
            <Route path="/" element={<MainWebsiteRedirect />} />
            <Route path="/lookup" element={<LabelLookup />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/:identifierCode" element={<LabelPage />} />
            <Route path="/:sponsorName/:trialIdentifier/batch/:batchNumber" element={<LabelPage />} />
            <Route path="/:sponsorName/:trialIdentifier/kit/:kitNumber" element={<LabelPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
