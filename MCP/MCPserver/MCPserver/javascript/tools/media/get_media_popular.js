/**
 * Get_media_popular tool implementation
 */
import axios from 'axios';
import { loadApiConfig } from '../../config.js';

/**
 * Get a list of currently popular media.
 * 
 * @param {Object} params - Tool parameters
 * @returns {Promise<string>} JSON string result
 */
async function get_media_popular_handler(params) {
  try {
    const config = loadApiConfig();
    
    // Build URL
    let url = `${config.baseUrl}/media/popular`;
    
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
export const get_media_popular = get_media_popular_handler;
get_media_popular.description = 'Get a list of currently popular media.';
get_media_popular.schema = {
};
