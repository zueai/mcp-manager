# MCP Manager for Claude Desktop

A simple web GUI to manage Model Context Protocol (MCP) servers for the Claude Desktop application easily. This application allows you to easily configure, install, and manage various MCP servers that extend Claude's capabilities.

## What is MCP?

The Model Context Protocol (MCP) enables Claude to access private data, APIs, and other services to answer questions and perform actions on your behalf. Learn more about MCP at:

- [modelcontextprotocol.io](https://modelcontextprotocol.io)
- [Anthropic's MCP Announcement](https://www.anthropic.com/news/model-context-protocol)

## Features

- 🚀 Easy-to-use interface for managing MCP servers
- 🔒 Runs entirely client-side - your data never leaves your computer
- ⚡️ Quick setup for popular MCP servers like:
  - Google Drive
  - Obsidian
  - PostgreSQL
  - SQLite
  - GitHub
  - GitLab
  - And many more!
- 🛠 Simple configuration of environment variables and server settings
- 📋 One-click copying of terminal commands for installation

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**:
  - TailwindCSS for utility-first CSS
  - DaisyUI for component styling
  - Tiempos font to match the Anthropic Design Language
- **Development Tools**:
  - Biome for formatting and linting
  - ESLint (came with the template and i never bothered to remove it :P)
  - TypeScript for type safety
- **Package Manager**: Bun
- **Deployment**: Cloudflare Pages

## Project Structure

src/
├── components/ # React components
│ ├── server-configs/ # Server-specific configuration components
│ └── ...
├── assets/ # Static assets and fonts
├── App.tsx # Main application component
├── server-configs.ts # MCP server configurations
└── utils.ts # Utility functions

## Key Components

- **LoadingInstructions**: Guides users through loading their existing MCP configuration
- **MCPServers**: Manages the list of configured servers
- **MCPServerCard**: Reusable server configuration card
- **ApplyingInstructions**: Provides steps to apply changes to Claude Desktop
- **server-configs.ts**: has all the info for the servers

## Development

1. Install dependencies:

   ```bash
   bun install
   ```

2. Start the development server:

   ```bash
   bun dev
   ```

3. Build for production:

   ```bash
   bun run build
   ```

## Configuration

The application manages the MCP configuration file located at:

```plaintext
~/Library/Application Support/Claude/claude_desktop_config.json
```

## Contributing

Contributions are extremely welcome! Please open a PR with new MCP servers or any other improvements to the codebase

## License

This project is not affiliated with Anthropic. All logos are trademarks of their respective owners.

---

Made with ❤️ by [zue](https://zue.ai)
