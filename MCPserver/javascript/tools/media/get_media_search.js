/**
 * Get_media_search tool implementation
 */
import axios from 'axios';
import { loadApiConfig } from '../../config.js';

/**
 * Search for media in a given area.
 * 
 * @param {Object} params - Tool parameters
 * @param {*} params.lat - Latitude of the center search coordinate. If used, \`lng\` is required.
 * @param {*} params.lng - Longitude of the center search coordinate. If used, \`lat\` is required.
 * @param {*} params.minTimestamp - Return media after this UNIX timestamp.
 * @param {*} params.maxTimestamp - Return media before this UNIX timestamp.
 * @param {*} params.distance - Default is 1000m (distance=1000), max distance is 5000.
 * @returns {Promise<string>} JSON string result
 */
async function get_media_search_handler(params) {
  try {
    const config = loadApiConfig();
    // Build query parameters
    const queryParams = new URLSearchParams();
    if (params.lat !== undefined) {
      queryParams.append('lat', params.lat);
    }
    if (params.lng !== undefined) {
      queryParams.append('lng', params.lng);
    }
    if (params.minTimestamp !== undefined) {
      queryParams.append('min_timestamp', params.minTimestamp);
    }
    if (params.maxTimestamp !== undefined) {
      queryParams.append('max_timestamp', params.maxTimestamp);
    }
    if (params.distance !== undefined) {
      queryParams.append('distance', params.distance);
    }
    
    // Build URL
    let url = `${config.baseUrl}/media/search`;
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
export const get_media_search = get_media_search_handler;
get_media_search.description = 'Search for media in a given area.';
get_media_search.schema = {
  'lat': {
    type: 'string',
    description: 'Latitude of the center search coordinate. If used, \`lng\` is required.'
  },
  'lng': {
    type: 'string',
    description: 'Longitude of the center search coordinate. If used, \`lat\` is required.'
  },
  'minTimestamp': {
    type: 'string',
    description: 'Return media after this UNIX timestamp.'
  },
  'maxTimestamp': {
    type: 'string',
    description: 'Return media before this UNIX timestamp.'
  },
  'distance': {
    type: 'string',
    description: 'Default is 1000m (distance=1000), max distance is 5000.'
  }
};
