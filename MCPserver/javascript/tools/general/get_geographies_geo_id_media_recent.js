/**
 * Get_geographies_geo_id_media_recent tool implementation
 */
import axios from 'axios';
import { loadApiConfig } from '../../config.js';

/**
 * Get recent media from a custom geo-id.
 * 
 * @param {Object} params - Tool parameters
 * @param {*} params.count - Max number of media to return.
 * @param {*} params.minId - Return media before this \`min_id\`.
 * @param {*} params.geoId - The geography ID.
 * @returns {Promise<string>} JSON string result
 */
async function get_geographies_geo_id_media_recent_handler(params) {
  try {
    const config = loadApiConfig();
    // Validate required path parameters
    if (!params.geoId) {
      return JSON.stringify({ error: 'Missing required path parameter: geo-id' });
    }
    // Build query parameters
    const queryParams = new URLSearchParams();
    if (params.count !== undefined) {
      queryParams.append('count', params.count);
    }
    if (params.minId !== undefined) {
      queryParams.append('min_id', params.minId);
    }
    
    // Build URL
    let url = `${config.baseUrl}/geographies/${params.geoId}/media/recent`;
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
export const get_geographies_geo_id_media_recent = get_geographies_geo_id_media_recent_handler;
get_geographies_geo_id_media_recent.description = 'Get recent media from a custom geo-id.';
get_geographies_geo_id_media_recent.schema = {
  'count': {
    type: 'string',
    description: 'Max number of media to return.'
  },
  'minId': {
    type: 'string',
    description: 'Return media before this \`min_id\`.'
  },
  'geoId': {
    type: 'string',
    description: 'The geography ID.',
    required: true
  }
};
