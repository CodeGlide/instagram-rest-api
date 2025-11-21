/**
 * Get_users_user_id_media_recent tool implementation
 */
import axios from 'axios';
import { loadApiConfig } from '../../config.js';

/**
 * Get the most recent media published by a user.
 * 
 * @param {Object} params - Tool parameters
 * @param {*} params.count - Max number of media to return.
 * @param {*} params.maxTimestamp - Return media before this UNIX timestamp.
 * @param {*} params.minTimestamp - Return media after this UNIX timestamp.
 * @param {*} params.minId - Return media before this \`min_id\`.
 * @param {*} params.maxId - Return media after this \`max_id\`.
 * @param {*} params.userId - The ID of a user to get information about, or **self** to retrieve information about authenticated user.
 * @returns {Promise<string>} JSON string result
 */
async function get_users_user_id_media_recent_handler(params) {
  try {
    const config = loadApiConfig();
    // Validate required path parameters
    if (!params.userId) {
      return JSON.stringify({ error: 'Missing required path parameter: user-id' });
    }
    // Build query parameters
    const queryParams = new URLSearchParams();
    if (params.count !== undefined) {
      queryParams.append('count', params.count);
    }
    if (params.maxTimestamp !== undefined) {
      queryParams.append('max_timestamp', params.maxTimestamp);
    }
    if (params.minTimestamp !== undefined) {
      queryParams.append('min_timestamp', params.minTimestamp);
    }
    if (params.minId !== undefined) {
      queryParams.append('min_id', params.minId);
    }
    if (params.maxId !== undefined) {
      queryParams.append('max_id', params.maxId);
    }
    
    // Build URL
    let url = `${config.baseUrl}/users/${params.userId}/media/recent`;
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
export const get_users_user_id_media_recent = get_users_user_id_media_recent_handler;
get_users_user_id_media_recent.description = 'Get the most recent media published by a user.';
get_users_user_id_media_recent.schema = {
  'count': {
    type: 'string',
    description: 'Max number of media to return.'
  },
  'maxTimestamp': {
    type: 'string',
    description: 'Return media before this UNIX timestamp.'
  },
  'minTimestamp': {
    type: 'string',
    description: 'Return media after this UNIX timestamp.'
  },
  'minId': {
    type: 'string',
    description: 'Return media before this \`min_id\`.'
  },
  'maxId': {
    type: 'string',
    description: 'Return media after this \`max_id\`.'
  },
  'userId': {
    type: 'string',
    description: 'The ID of a user to get information about, or **self** to retrieve information about authenticated user.',
    required: true
  }
};
