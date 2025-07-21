// src/App.tsx
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import DemoPage from './pages/demo';
import LabelLookup from './pages/LabelLookup';
import LabelPage from './pages/LabelPage';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App() {
  const baseUrl = import.meta.env.VITE_FRONT_END;
  const marketingSite = baseUrl + '/website/index.html';

  return (
    <Router>
      <div className="bg-gray-50" style={{ minHeight: '100vh' }}>
        <Navbar marketingSite={marketingSite} />

        <main
          className="bg-gray-50"
          style={{
            paddingTop: '64px',
            paddingBottom: '120px',
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="lookup" element={<LabelLookup />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path=":identifierCode" element={<LabelPage />} />
            <Route path=":sponsorName/:trialIdentifier/batch/:batchNumber" element={<LabelPage />} />
            <Route path=":sponsorName/:trialIdentifier/kit/:kitNumber" element={<LabelPage />} />
            <Route path="demo" element={<DemoPage />} />
          </Routes>
        </main>
      </div>

      <Footer />
    </Router>
  );
}
