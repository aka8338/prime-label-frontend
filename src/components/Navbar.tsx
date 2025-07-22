import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  marketingSite: string;
}

export default function Navbar({ marketingSite }: NavbarProps) {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header
      className="shadow-lg border-b border-gray-600"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: '#374151',
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              // Show Home and Website for non-authenticated users
              <>
                <Link to="/" className="text-gray-300 hover:text-white hover:bg-gray-600 px-4 py-2 rounded-md text-base font-medium transition-all duration-200">
                  Home
                </Link>
                <span className="text-gray-400 text-lg">|</span>
                <a
                  href={marketingSite}
                  className="text-gray-300 hover:text-white hover:bg-gray-600 px-4 py-2 rounded-md text-base font-medium transition-all duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Web Site
                </a>
                <span className="text-gray-400 text-lg">|</span>
                <Link to="/login" className="text-gray-300 hover:text-white hover:bg-gray-600 px-4 py-2 rounded-md text-base font-medium transition-all duration-200">
                  Login
                </Link>
                <span className="text-gray-400 text-lg">|</span>
                <Link to="/signup" className="text-gray-300 hover:text-white hover:bg-gray-600 px-4 py-2 rounded-md text-base font-medium transition-all duration-200">
                  Sign Up
                </Link>
              </>
            ) : (
              // Show Label Finder and Demo for authenticated users
              <>
                <Link to="/lookup" className="text-gray-300 hover:text-white hover:bg-gray-600 px-4 py-2 rounded-md text-base font-medium transition-all duration-200">
                  Label Finder
                </Link>
                <span className="text-gray-400 text-lg">|</span>
                <Link to="/demo" className="text-gray-300 hover:text-white hover:bg-gray-600 px-4 py-2 rounded-md text-base font-medium transition-all duration-200">
                  Demo
                </Link>
                <span className="text-gray-400 text-lg">|</span>
                <button onClick={logout} className="text-gray-300 hover:text-white hover:bg-gray-600 px-4 py-2 rounded-md text-base font-medium transition-all duration-200">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
