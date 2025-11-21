#!/usr/bin/env node
/**
 * Instagram MCP Server
 * Version: 1.0.0
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { loadApiConfig } from './config.js';

// Import all tools
import * as tools from './tools/index.js';

const transport = process.env.TRANSPORT || process.env.transport || 'stdio';

async function main() {
  try {
    const config = loadApiConfig();
    
    if (transport.toLowerCase() === 'http' || transport.toLowerCase() === 'https') {
      // HTTP/HTTPS Mode
      const port = config.port;
      if (!port) {
        console.error('PORT environment variable is required for HTTP/HTTPS mode');
        process.exit(1);
      }
      
      console.error(`Starting Instagram MCP Server in ${transport.toUpperCase()} mode on port ${port}`);
      
      // HTTP mode not yet fully implemented for JavaScript
      console.error('HTTP/HTTPS mode not yet implemented for JavaScript MCP servers');
      console.error('Please use STDIO mode or switch to Python/Go implementation');
      process.exit(1);
    } else {
      // STDIO Mode (default)
      console.error('Starting Instagram MCP Server in STDIO mode');
      
      const server = new Server(
        {
          name: 'Instagram',
          version: '1.0.0',
        },
        {
          capabilities: {
            tools: {},
          },
        }
      );
      
      // Register tool handlers
      server.setRequestHandler(ListToolsRequestSchema, async () => {
        const toolList = Object.keys(tools)
          .filter(name => typeof tools[name] === 'function')
          .map(name => ({
            name: name,
            description: tools[name].description || `Call ${name} API endpoint`,
            inputSchema: {
              type: "object",
              properties: tools[name].schema || {},
            },
          }));
        
        return { tools: toolList };
      });
      
      server.setRequestHandler(CallToolRequestSchema, async (request) => {
        const toolName = request.params.name;
        const toolFunc = tools[toolName];
        
        if (!toolFunc) {
          throw new Error(`Unknown tool: ${toolName}`);
        }
        
        const result = await toolFunc(request.params.arguments || {});
        
        return {
          content: [
            {
              type: "text",
              text: result,
            },
          ],
        };
      });
      
      const transport = new StdioServerTransport();
      await server.connect(transport);
      
      console.error('Instagram MCP Server running in STDIO mode');
      console.error(`Registered ${Object.keys(tools).filter(name => typeof tools[name] === 'function').length} tools`);
    }
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main();
