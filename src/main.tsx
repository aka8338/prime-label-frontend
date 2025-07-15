import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css'; // your Tailwind + shadcn CSS
import './i18n'; // your i18n configuration

// Optional: your own ErrorBoundary component
import ErrorBoundary from './components/ErrorBoundary';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found in index.html');
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
