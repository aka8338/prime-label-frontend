// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import LabelPage from './pages/LabelPage';
import LabelLookup from './pages/LabelLookup';
import DemoPage from './pages/demo';

export default function App() {
  const baseUrl = import.meta.env.VITE_FRONT_END;
  // Use absolute URLs to avoid React Router interference
  const marketingSite = baseUrl + '/website/index.html';

  return (
    <Router>
      <div className="p-4">
        <nav className="p-4 bg-gray-100 flex space-x-4">
          <Link to="/lookup" className="text-blue-600">
            Label Finder |
          </Link>

          <Link to="/demo" className="text-blue-600">
            Demo |
          </Link>

          {/* Absolute link back to your marketing site */}
          <a href={marketingSite} className="text-blue-600">
            Web Site
          </a>
        </nav>

        <Routes>
          {/* SPA Routes under /app */}
          <Route path="/" element={<LabelLookup />} />
          <Route path="lookup" element={<LabelLookup />} />
          <Route path=":identifierCode" element={<LabelPage />} />
          <Route path=":sponsorName/:trialIdentifier/batch/:batchNumber" element={<LabelPage />} />
          <Route path=":sponsorName/:trialIdentifier/kit/:kitNumber" element={<LabelPage />} />
          <Route path="demo" element={<DemoPage />} />
        </Routes>
      </div>
    </Router>
  );
}
