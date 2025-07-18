// src/App.tsx
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import DemoPage from './pages/demo';
import LabelLookup from './pages/LabelLookup';
import LabelPage from './pages/LabelPage';

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
            <Route path="/" element={<LabelLookup />} />
            <Route path="lookup" element={<LabelLookup />} />
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
