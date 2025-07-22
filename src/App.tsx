// src/App.tsx
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import DemoPage from './pages/demo';
import LabelLookup from './pages/LabelLookup';
import LabelPage from './pages/LabelPage';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import OAuthCallback from './pages/OAuthCallback';
import Signup from './pages/Signup';

export default function App() {
  const baseUrl = import.meta.env.VITE_FRONT_END;
  const marketingSite = baseUrl + '/website/index.html';

  return (
    <Router>
      <AuthProvider>
        <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
          <Navbar marketingSite={marketingSite} />

          <main
            style={{
              paddingTop: '64px',
              paddingBottom: '64px',
              minHeight: 'calc(100vh - 64px)',
              backgroundColor: '#f3f4f6',
            }}
          >
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/lookup" element={<LabelLookup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/oauth-callback" element={<OAuthCallback />} />
              <Route path="/demo" element={<DemoPage />} />
              <Route path="/:identifierCode" element={<LabelPage />} />
              <Route path="/:sponsorName/:trialIdentifier/batch/:batchNumber" element={<LabelPage />} />
              <Route path="/:sponsorName/:trialIdentifier/kit/:kitNumber" element={<LabelPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}
