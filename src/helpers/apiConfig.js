// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://water-tool-backend-sbo7.vercel.app/',
  ENDPOINTS: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    VERIFY_EMAIL: '/api/auth/verify-email',
    REFRESH_TOKEN: '/api/auth/refresh-token',
    USER_PROFILE: '/api/auth/me',
    UPDATE_PROFILE: '/api/auth/profile',
  },
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
};

// API Headers
export const getHeaders = (token = null) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// API Response Handler
export const handleApiResponse = async (response) => {
  if (!response.ok) {
    let errorData = {};
    try {
      errorData = await response.json();
    } catch (parseError) {
      console.warn('Failed to parse error response as JSON:', parseError);
      errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
    }
    
    const errorMessage = errorData.message || errorData.error || `HTTP error! status: ${response.status}`;
    throw new Error(errorMessage);
  }
  
  // Check if response has content before trying to parse JSON
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  } else {
    // Return text response if not JSON
    const text = await response.text();
    return { message: text };
  }
};

// API Error Handler
export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return 'Network error. Please check your connection.';
  }
  
  if (error.message.includes('CORS')) {
    return 'CORS error: Backend server needs to allow requests from this domain.';
  }
  
  if (error.message.includes('Failed to fetch')) {
    return 'Failed to connect to server. Please check if the backend is running.';
  }
  
  return error.message || 'An unexpected error occurred.';
};
