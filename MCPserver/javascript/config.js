/**
 * API configuration for github.com/instagram/mcp-server
 */

export class APIConfig {
  constructor(baseUrl = '', bearerToken = '', apiKey = '', basicAuth = '', port = '') {
    this.baseUrl = baseUrl;
    this.bearerToken = bearerToken;
    this.apiKey = apiKey;
    this.basicAuth = basicAuth;
    this.port = port;
  }
}

/**
 * Load API configuration from environment variables
 * @returns {APIConfig} Configuration object
 */
export function loadApiConfig() {
  // Check port environment variable
  const port = process.env.PORT || process.env.port || '';
  
  const baseUrl = process.env.API_BASE_URL || '';
  
  // Check transport environment variable
  const transport = process.env.TRANSPORT || process.env.transport || '';
  
  // For STDIO mode (not HTTP/HTTPS), API_BASE_URL is required
  if (!['http', 'HTTP', 'https', 'HTTPS'].includes(transport) && !baseUrl) {
    throw new Error('API_BASE_URL environment variable not set');
  }
  
  return new APIConfig(
    baseUrl,
    process.env.BEARER_TOKEN || '',
    process.env.API_KEY || '',
    process.env.BASIC_AUTH || '',
    port
  );
}
