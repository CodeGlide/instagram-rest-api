/**
 * Delete_media_media_id_comments_comment_id tool implementation
 */
import axios from 'axios';
import { loadApiConfig } from '../../config.js';

/**
 * Remove a comment.
 * 
 * @param {Object} params - Tool parameters
 * @param {*} params.mediaId - The ID of the media resource.
 * @param {*} params.commentId - The ID of the comment entry.
 * @returns {Promise<string>} JSON string result
 */
async function delete_media_media_id_comments_comment_id_handler(params) {
  try {
    const config = loadApiConfig();
    // Validate required path parameters
    if (!params.mediaId) {
      return JSON.stringify({ error: 'Missing required path parameter: media-id' });
    }
    if (!params.commentId) {
      return JSON.stringify({ error: 'Missing required path parameter: comment-id' });
    }
    
    // Build URL
    let url = `${config.baseUrl}/media/${params.mediaId}/comments/${params.commentId}`;
    
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
      method: 'DELETE',
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
export const delete_media_media_id_comments_comment_id = delete_media_media_id_comments_comment_id_handler;
delete_media_media_id_comments_comment_id.description = 'Remove a comment.';
delete_media_media_id_comments_comment_id.schema = {
  'mediaId': {
    type: 'string',
    description: 'The ID of the media resource.',
    required: true
  },
  'commentId': {
    type: 'string',
    description: 'The ID of the comment entry.',
    required: true
  }
};
