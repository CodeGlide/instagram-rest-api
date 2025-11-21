/**
 * Get_tags_tag_name tool implementation
 */
import axios from 'axios';
import { loadApiConfig } from '../../config.js';

/**
 * Get information about a tag object.
 * 
 * @param {Object} params - Tool parameters
 * @param {*} params.tagName - The tag name.
 * @returns {Promise<string>} JSON string result
 */
async function get_tags_tag_name_handler(params) {
  try {
    const config = loadApiConfig();
    // Validate required path parameters
    if (!params.tagName) {
      return JSON.stringify({ error: 'Missing required path parameter: tag-name' });
    }
    
    // Build URL
    let url = `${config.baseUrl}/tags/${params.tagName}`;
    
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
export const get_tags_tag_name = get_tags_tag_name_handler;
get_tags_tag_name.description = 'Get information about a tag object.';
get_tags_tag_name.schema = {
  'tagName': {
    type: 'string',
    description: 'The tag name.',
    required: true
  }
};
