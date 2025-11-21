/**
 * Get_users_user_id_follows tool implementation
 */
import axios from 'axios';
import { loadApiConfig } from '../../config.js';

/**
 * Get the list of users this user follows.
 * 
 * @param {Object} params - Tool parameters
 * @param {*} params.userId - The ID of a user to get information about, or **self** to retrieve information about authenticated user.
 * @returns {Promise<string>} JSON string result
 */
async function get_users_user_id_follows_handler(params) {
  try {
    const config = loadApiConfig();
    // Validate required path parameters
    if (!params.userId) {
      return JSON.stringify({ error: 'Missing required path parameter: user-id' });
    }
    
    // Build URL
    let url = `${config.baseUrl}/users/${params.userId}/follows`;
    
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
export const get_users_user_id_follows = get_users_user_id_follows_handler;
get_users_user_id_follows.description = 'Get the list of users this user follows.';
get_users_user_id_follows.schema = {
  'userId': {
    type: 'string',
    description: 'The ID of a user to get information about, or **self** to retrieve information about authenticated user.',
    required: true
  }
};
