/**
 * Get_users_self_feed tool implementation
 */
import axios from 'axios';
import { loadApiConfig } from '../../config.js';

/**
 * See the authenticated user\'s feed.
 * 
 * @param {Object} params - Tool parameters
 * @param {*} params.count - Max number of media to return.
 * @param {*} params.minId - Return media before this \`min_id\`.
 * @param {*} params.maxId - Return media after this \`max_id\`.
 * @returns {Promise<string>} JSON string result
 */
async function get_users_self_feed_handler(params) {
  try {
    const config = loadApiConfig();
    // Build query parameters
    const queryParams = new URLSearchParams();
    if (params.count !== undefined) {
      queryParams.append('count', params.count);
    }
    if (params.minId !== undefined) {
      queryParams.append('min_id', params.minId);
    }
    if (params.maxId !== undefined) {
      queryParams.append('max_id', params.maxId);
    }
    
    // Build URL
    let url = `${config.baseUrl}/users/self/feed`;
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
export const get_users_self_feed = get_users_self_feed_handler;
get_users_self_feed.description = 'See the authenticated user\'s feed.';
get_users_self_feed.schema = {
  'count': {
    type: 'string',
    description: 'Max number of media to return.'
  },
  'minId': {
    type: 'string',
    description: 'Return media before this \`min_id\`.'
  },
  'maxId': {
    type: 'string',
    description: 'Return media after this \`max_id\`.'
  }
};
