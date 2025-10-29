import { API_CONFIG, getHeaders, handleApiResponse, handleApiError } from './apiConfig.js';
import { debugRegisterData, getFieldVariations } from './registerDebug.js';

// Register User API
export const registerUser = async (userData) => {
  try {
    console.log('Register API - Sending request to:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`);
    
    // Debug the input data
    const issues = debugRegisterData(userData);
    if (issues.length > 0) {
      console.error('Register API - Data validation failed:', issues);
      return {
        success: false,
        error: issues.join(', '),
        message: 'Form validation failed. Please check all fields.',
      };
    }
    
    const requestData = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };
    
    console.log('Register API - Request data:', { 
      name: userData.name, 
      email: userData.email, 
      password: '[HIDDEN]'
    });
    console.log('Register API - Full request data being sent:', requestData);
    console.log('Register API - Field variations available:', getFieldVariations(userData));
    
    // Log the exact request being made
    console.log('Register API - Making request with:');
    console.log('- URL:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`);
    console.log('- Method: POST');
    console.log('- Headers:', getHeaders());
    console.log('- Body (raw):', JSON.stringify(requestData));
    console.log('- Body (parsed):', requestData);
    
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(requestData),
    });

    console.log('Register API - Response status:', response.status);
    console.log('Register API - Response headers:', Object.fromEntries(response.headers.entries()));

    // Check if response is not ok before trying to parse
    if (!response.ok) {
      let errorMessage = `Server error: ${response.status}`;
      try {
        const errorData = await response.text();
        console.log('Register API - Error response body:', errorData);
        errorMessage = errorData || errorMessage;
      } catch (parseError) {
        console.log('Register API - Could not parse error response');
      }
      
      return {
        success: false,
        error: errorMessage,
        message: `Registration failed: ${errorMessage}`,
      };
    }

    const data = await handleApiResponse(response);
    
    console.log('Register API - Response data:', data);
    
    return {
      success: true,
      data: data,
      message: data.message || 'Registration successful! Please check your email for verification.',
    };
  } catch (error) {
    console.error('Register API - Error details:', error);
    return {
      success: false,
      error: handleApiError(error),
      message: error.message || 'Registration failed. Please try again.',
    };
  }
};

// Login User API
export const loginUser = async (credentials) => {
  try {
    console.log('Login API - Sending request to:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`);
    
    // Debug the input data
    console.log('Login API - Request data:', { 
      email: credentials.email, 
      password: '[HIDDEN]'
    });
    
    const requestData = {
      email: credentials.email,
      password: credentials.password,
    };
    
    console.log('Login API - Full request data being sent:', requestData);
    
    // Log the exact request being made
    console.log('Login API - Making request with:');
    console.log('- URL:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`);
    console.log('- Method: POST');
    console.log('- Headers:', getHeaders());
    console.log('- Body (raw):', JSON.stringify(requestData));
    console.log('- Body (parsed):', requestData);
    
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(requestData),
    });

    console.log('Login API - Response status:', response.status);
    console.log('Login API - Response headers:', Object.fromEntries(response.headers.entries()));

    // Check if response is not ok before trying to parse
    if (!response.ok) {
      let errorMessage = `Server error: ${response.status}`;
      try {
        const errorData = await response.text();
        console.log('Login API - Error response body:', errorData);
        errorMessage = errorData || errorMessage;
      } catch (parseError) {
        console.log('Login API - Could not parse error response');
      }
      
      return {
        success: false,
        error: errorMessage,
        message: `Login failed: ${errorMessage}`,
      };
    }

    const data = await handleApiResponse(response);
    
    console.log('Login API - Response data:', data);
    
    return {
      success: true,
      data: data,
      message: data.message || 'Login successful!',
    };
  } catch (error) {
    console.error('Login API - Error details:', error);
    return {
      success: false,
      error: handleApiError(error),
      message: error.message || 'Login failed. Please check your credentials.',
    };
  }
};

// Logout User API
export const logoutUser = async (token) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGOUT}`, {
      method: 'POST',
      headers: getHeaders(token),
    });

    await handleApiResponse(response);
    
    return {
      success: true,
      message: 'Logout successful!',
    };
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error),
      message: 'Logout failed.',
    };
  }
};

// Forgot Password API
export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.FORGOT_PASSWORD}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email }),
    });

    const data = await handleApiResponse(response);
    
    return {
      success: true,
      data: data,
      message: 'Password reset email sent! Please check your inbox.',
    };
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error),
      message: 'Failed to send reset email. Please try again.',
    };
  }
};

// Reset Password API
export const resetPassword = async (resetData) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RESET_PASSWORD}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(resetData),
    });

    const data = await handleApiResponse(response);
    
    return {
      success: true,
      data: data,
      message: 'Password reset successful!',
    };
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error),
      message: 'Password reset failed. Please try again.',
    };
  }
};

// Verify Email API
export const verifyEmail = async (token) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.VERIFY_EMAIL}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ token }),
    });

    const data = await handleApiResponse(response);
    
    return {
      success: true,
      data: data,
      message: 'Email verified successfully!',
    };
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error),
      message: 'Email verification failed.',
    };
  }
};

// Refresh Token API
export const refreshToken = async (refreshToken) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REFRESH_TOKEN}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ refreshToken }),
    });

    const data = await handleApiResponse(response);
    
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error),
    };
  }
};

// Get User Profile API
export const getUserProfile = async (token) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER_PROFILE}`, {
      method: 'GET',
      headers: getHeaders(token),
    });

    const data = await handleApiResponse(response);
    
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error),
    };
  }
};
