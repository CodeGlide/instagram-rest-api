/**
 * Get_users_self_media_liked tool implementation
 */
import axios from 'axios';
import { loadApiConfig } from '../../config.js';

/**
 * See the list of media liked by the authenticated user.
 * 
 * @param {Object} params - Tool parameters
 * @param {*} params.count - Max number of media to return.
 * @param {*} params.maxLikeId - Return media liked before this id.
 * @returns {Promise<string>} JSON string result
 */
async function get_users_self_media_liked_handler(params) {
  try {
    const config = loadApiConfig();
    // Build query parameters
    const queryParams = new URLSearchParams();
    if (params.count !== undefined) {
      queryParams.append('count', params.count);
    }
    if (params.maxLikeId !== undefined) {
      queryParams.append('max_like_id', params.maxLikeId);
    }
    
    // Build URL
    let url = `${config.baseUrl}/users/self/media/liked`;
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
export const get_users_self_media_liked = get_users_self_media_liked_handler;
get_users_self_media_liked.description = 'See the list of media liked by the authenticated user.';
get_users_self_media_liked.schema = {
  'count': {
    type: 'string',
    description: 'Max number of media to return.'
  },
  'maxLikeId': {
    type: 'string',
    description: 'Return media liked before this id.'
  }
};
