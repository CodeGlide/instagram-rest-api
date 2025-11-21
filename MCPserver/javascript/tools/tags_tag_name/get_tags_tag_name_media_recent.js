/**
 * Get_tags_tag_name_media_recent tool implementation
 */
import axios from 'axios';
import { loadApiConfig } from '../../config.js';

/**
 * Get a list of recently tagged media.
 * 
 * @param {Object} params - Tool parameters
 * @param {*} params.count - Max number of media to return.
 * @param {*} params.minTagId - Return media before this \`min_tag_id\`.
 * @param {*} params.maxTagId - Return media after this \`max_tag_id\`.
 * @param {*} params.tagName - The tag name.
 * @returns {Promise<string>} JSON string result
 */
async function get_tags_tag_name_media_recent_handler(params) {
  try {
    const config = loadApiConfig();
    // Validate required path parameters
    if (!params.tagName) {
      return JSON.stringify({ error: 'Missing required path parameter: tag-name' });
    }
    // Build query parameters
    const queryParams = new URLSearchParams();
    if (params.count !== undefined) {
      queryParams.append('count', params.count);
    }
    if (params.minTagId !== undefined) {
      queryParams.append('min_tag_id', params.minTagId);
    }
    if (params.maxTagId !== undefined) {
      queryParams.append('max_tag_id', params.maxTagId);
    }
    
    // Build URL
    let url = `${config.baseUrl}/tags/${params.tagName}/media/recent`;
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
export const get_tags_tag_name_media_recent = get_tags_tag_name_media_recent_handler;
get_tags_tag_name_media_recent.description = 'Get a list of recently tagged media.';
get_tags_tag_name_media_recent.schema = {
  'count': {
    type: 'string',
    description: 'Max number of media to return.'
  },
  'minTagId': {
    type: 'string',
    description: 'Return media before this \`min_tag_id\`.'
  },
  'maxTagId': {
    type: 'string',
    description: 'Return media after this \`max_tag_id\`.'
  },
  'tagName': {
    type: 'string',
    description: 'The tag name.',
    required: true
  }
};
