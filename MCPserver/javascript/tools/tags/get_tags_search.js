/**
 * Get_tags_search tool implementation
 */
import axios from 'axios';
import { loadApiConfig } from '../../config.js';

/**
 * Search for tags by name.
 * 
 * @param {Object} params - Tool parameters
 * @param {*} params.q - A valid tag name without a leading \#. (eg. snowy, nofilter)
 * @returns {Promise<string>} JSON string result
 */
async function get_tags_search_handler(params) {
  try {
    const config = loadApiConfig();
    // Build query parameters
    const queryParams = new URLSearchParams();
    if (params.q !== undefined) {
      queryParams.append('q', params.q);
    }
    
    // Build URL
    let url = `${config.baseUrl}/tags/search`;
    if (queryParams.toString()) {
      url += `?${queryParams.toString()}`;
    }
    
    // Build headers
    const headers = {
      'Accept': 'application/json',
      'X-Request-Source': 'Codeglide-MCP-generator',
    };
    // No specific authentication - add fallback
    if (config.bearerToken) {
      headers['Authorization'] = `Bearer ${config.bearerToken}`;
    } else if (config.apiKey) {
      headers['Authorization'] = `Bearer ${config.apiKey}`;
    } else if (config.basicAuth) {
      headers['Authorization'] = `Basic ${config.basicAuth}`;
    }
    
    // Add custom headers
    
    // Make API request
    const response = await axios({
      method: 'GET',
      url,
      headers,
      timeout: 30000,
      validateStatus: () => true, // Don't throw on any status
    });
    
    if (response.status >= 400) {
      return JSON.stringify({
        error: `API error (${response.status})`,
        message: response.data
      });
    }
    
    return JSON.stringify(response.data, null, 2);
  } catch (error) {
    console.error('Request failed:', error);
    return JSON.stringify({ 
      error: 'Request failed',
      message: error.message 
    });
  }
}

// Export tool with schema
export const get_tags_search = get_tags_search_handler;
get_tags_search.description = 'Search for tags by name.';
get_tags_search.schema = {
  'q': {
    type: 'string',
    description: 'A valid tag name without a leading \#. (eg. snowy, nofilter)'
  }
};
