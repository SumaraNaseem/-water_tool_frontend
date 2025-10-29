// API Test Helper - Use this to test your API connection
import { API_CONFIG, getHeaders, handleApiResponse, handleApiError } from './apiConfig.js';

// Test API Connection
export const testApiConnection = async () => {
  console.log('Testing API Connection...');
  console.log('Base URL:', API_CONFIG.BASE_URL);
  console.log('Register Endpoint:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`);
  
  try {
    // Test with a simple OPTIONS request to check if server is reachable
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`, {
      method: 'OPTIONS',
      headers: getHeaders(),
    });
    
    console.log('API Response Status:', response.status);
    console.log('API Response Headers:', Object.fromEntries(response.headers.entries()));
    
    return {
      success: true,
      status: response.status,
      message: 'API server is reachable'
    };
  } catch (error) {
    console.error('API Connection Error:', error);
    return {
      success: false,
      error: handleApiError(error),
      message: 'API server is not reachable'
    };
  }
};

// Test Register API with sample data
export const testRegisterAPI = async () => {
  console.log('Testing Register API...');
  
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'testpassword123'
  };
  
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(testData),
    });
    
    console.log('Register API Response Status:', response.status);
    console.log('Register API Response Headers:', Object.fromEntries(response.headers.entries()));
    
    const data = await response.json();
    console.log('Register API Response Data:', data);
    
    return {
      success: response.ok,
      status: response.status,
      data: data,
      message: response.ok ? 'Register API is working' : 'Register API returned error'
    };
  } catch (error) {
    console.error('Register API Error:', error);
    return {
      success: false,
      error: handleApiError(error),
      message: 'Register API failed'
    };
  }
};

// Debug function to log all API configuration
export const debugApiConfig = () => {
  console.log('=== API Configuration Debug ===');
  console.log('Environment Variables:');
  console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
  console.log('MODE:', import.meta.env.MODE);
  console.log('DEV:', import.meta.env.DEV);
  console.log('PROD:', import.meta.env.PROD);
  console.log('');
  console.log('API_CONFIG:', API_CONFIG);
  console.log('');
  console.log('Sample Headers:', getHeaders());
  console.log('Sample Headers with Token:', getHeaders('sample-token-123'));
  console.log('=== End Debug ===');
};
