/**
 * Get_locations_search tool implementation
 */
import axios from 'axios';
import { loadApiConfig } from '../../config.js';

/**
 * Search for a location by geographic coordinate.
 * 
 * @param {Object} params - Tool parameters
 * @param {*} params.distance - Default is 1000m (distance=1000), max distance is 5000.
 * @param {*} params.facebookPlacesId - Returns a location mapped off of a Facebook places id. If used, a Foursquare id and \`lat\`, \`lng\` are not required.
 * @param {*} params.foursquareId - Returns a location mapped off of a foursquare v1 api location id. If used, you are not required to use \`lat\` and \`lng\`. Note that this method is deprecated; you should use the new foursquare IDs with V2 of their API. 
 * @param {*} params.lat - Latitude of the center search coordinate. If used, \`lng\` is required.
 * @param {*} params.lng - Longitude of the center search coordinate. If used, \`lat\` is required.
 * @param {*} params.foursquareV2Id - Returns a location mapped off of a foursquare v2 api location id. If used, you are not required to use \`lat\` and \`lng\`. 
 * @returns {Promise<string>} JSON string result
 */
async function get_locations_search_handler(params) {
  try {
    const config = loadApiConfig();
    // Build query parameters
    const queryParams = new URLSearchParams();
    if (params.distance !== undefined) {
      queryParams.append('distance', params.distance);
    }
    if (params.facebookPlacesId !== undefined) {
      queryParams.append('facebook_places_id', params.facebookPlacesId);
    }
    if (params.foursquareId !== undefined) {
      queryParams.append('foursquare_id', params.foursquareId);
    }
    if (params.lat !== undefined) {
      queryParams.append('lat', params.lat);
    }
    if (params.lng !== undefined) {
      queryParams.append('lng', params.lng);
    }
    if (params.foursquareV2Id !== undefined) {
      queryParams.append('foursquare_v2_id', params.foursquareV2Id);
    }
    
    // Build URL
    let url = `${config.baseUrl}/locations/search`;
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
export const get_locations_search = get_locations_search_handler;
get_locations_search.description = 'Search for a location by geographic coordinate.';
get_locations_search.schema = {
  'distance': {
    type: 'string',
    description: 'Default is 1000m (distance=1000), max distance is 5000.'
  },
  'facebookPlacesId': {
    type: 'string',
    description: 'Returns a location mapped off of a Facebook places id. If used, a Foursquare id and \`lat\`, \`lng\` are not required.'
  },
  'foursquareId': {
    type: 'string',
    description: 'Returns a location mapped off of a foursquare v1 api location id. If used, you are not required to use \`lat\` and \`lng\`. Note that this method is deprecated; you should use the new foursquare IDs with V2 of their API. '
  },
  'lat': {
    type: 'string',
    description: 'Latitude of the center search coordinate. If used, \`lng\` is required.'
  },
  'lng': {
    type: 'string',
    description: 'Longitude of the center search coordinate. If used, \`lat\` is required.'
  },
  'foursquareV2Id': {
    type: 'string',
    description: 'Returns a location mapped off of a foursquare v2 api location id. If used, you are not required to use \`lat\` and \`lng\`. '
  }
};
