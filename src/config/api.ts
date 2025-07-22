import axios from 'axios';

const isProduction = window.location.origin.includes('clinicallabel.io') || window.location.origin.includes('vercel.app');

// Function to check API availability
const checkApiAvailability = async (url: string) => {
  try {
    console.log(`Checking API availability for ${url}`);
    const response = await fetch(`${url}/health`);
    const isAvailable = response.ok;
    console.log(`API ${url} availability:`, isAvailable);
    return isAvailable;
  } catch (error) {
    console.error(`API ${url} check failed:`, error);
    return false;
  }
};

// Get the working API URL
const getWorkingApiUrl = async () => {
  if (!isProduction) {
    const devUrl = 'http://localhost:5000';
    console.log('Using development API URL:', devUrl);
    return devUrl;
  }

  const productionUrls = ['https://prime-label-api.onrender.com', 'https://elabel-api-9d597d4b4feb.herokuapp.com'];
  console.log('Checking production URLs:', productionUrls);

  // Try Render.com first, then Heroku
  for (const url of productionUrls) {
    if (await checkApiAvailability(url)) {
      console.log('Found working API URL:', url);
      return url;
    }
  }

  // If both fail, return the first one as default
  console.log('No working API found, using default:', productionUrls[0]);
  return productionUrls[0];
};

// Create axios instance with initial base URL
export const api = axios.create({
  baseURL: isProduction
    ? 'https://prime-label-api.onrender.com' // Start with Render.com URL
    : 'http://localhost:5000', // Development URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Initialize the API URL
getWorkingApiUrl().then((baseURL) => {
  console.log('Setting API base URL:', baseURL);
  api.defaults.baseURL = baseURL;
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      fullUrl: `${config.baseURL}${config.url}`,
      hasToken: !!token,
    });
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  },
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      url: response.config.url,
      fullUrl: `${response.config.baseURL}${response.config.url}`,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  async (error) => {
    console.error('API Response Error:', {
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      fullUrl: error.config ? `${error.config.baseURL}${error.config.url}` : null,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    // If first URL fails, try the alternative URL
    if (error.config && error.config.retryCount !== 1) {
      const currentUrl = error.config.baseURL;
      const productionUrls = ['https://prime-label-api.onrender.com', 'https://elabel-api-9d597d4b4feb.herokuapp.com'];

      const alternativeUrl = productionUrls.find((url) => url !== currentUrl);

      if (alternativeUrl) {
        console.log('Retrying with alternative URL:', alternativeUrl);
        error.config.baseURL = alternativeUrl;
        error.config.retryCount = 1;
        return api(error.config);
      }
    }

    return Promise.reject(error);
  },
);
