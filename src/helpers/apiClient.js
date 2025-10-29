import { API_CONFIG, getHeaders, handleApiResponse, handleApiError } from './apiConfig.js';

// Generic API Client with retry logic
class ApiClient {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
    this.retryAttempts = API_CONFIG.RETRY_ATTEMPTS;
  }

  // Generic request method with retry logic
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      timeout: this.timeout,
      ...options,
    };

    let lastError;
    
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        const response = await fetch(url, {
          ...config,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        return await handleApiResponse(response);
      } catch (error) {
        lastError = error;
        
        if (attempt === this.retryAttempts) {
          break;
        }
        
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }

    throw lastError;
  }

  // GET request
  async get(endpoint, token = null) {
    return this.request(endpoint, {
      method: 'GET',
      headers: getHeaders(token),
    });
  }

  // POST request
  async post(endpoint, data, token = null) {
    return this.request(endpoint, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data, token = null) {
    return this.request(endpoint, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint, token = null) {
    return this.request(endpoint, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
  }

  // PATCH request
  async patch(endpoint, data, token = null) {
    return this.request(endpoint, {
      method: 'PATCH',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient();

// Export the class for custom instances if needed
export { ApiClient };
