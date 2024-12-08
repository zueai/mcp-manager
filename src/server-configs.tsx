export type ServerConfig = {
	icon: string
	description: string
	command?: string
	args?: string[]
	env?: Record<string, string>
	terminalCommand?: string
	docsUrl: string
}

export const SERVER_CONFIGS: Record<string, ServerConfig> = {
	cloudflare: {
		icon: "https://icon.icepanel.io/Technology/svg/Cloudflare.svg",
		description: "Manage your Cloudflare workers and account resources",

		terminalCommand: "npx @cloudflare/mcp-server-cloudflare init",
		docsUrl: "https://github.com/cloudflare/mcp-server-cloudflare"
	},
	"brave-search": {
		icon: "https://www.svgrepo.com/show/305818/brave.svg",
		description: "Search the web with Brave Search API",
		terminalCommand: "",
		docsUrl:
			"https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search",
		command: "npx",
		args: ["-y", "@modelcontextprotocol/server-brave-search"],
		env: { BRAVE_API_KEY: "" }
	}
}
