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
	},
	"aws-kb-retrieval": {
		icon: "https://icon.icepanel.io/Technology/svg/AWS.svg",
		description:
			"Access and query AWS Knowledge Base for information retrieval",
		command: "npx",
		args: ["-y", "@modelcontextprotocol/server-aws-kb-retrieval"],
		env: {
			AWS_ACCESS_KEY_ID: "",
			AWS_SECRET_ACCESS_KEY: "",
			AWS_REGION: ""
		},
		terminalCommand: "",
		docsUrl:
			"https://github.com/modelcontextprotocol/servers/tree/main/src/aws-kb-retrieval"
	},

	everart: {
		icon: "https://pbs.twimg.com/profile_images/1717719314369789952/AmXarABn_400x400.png",
		description:
			"Interface with Everart API for digital art and design tools",
		command: "npx",
		args: ["-y", "@modelcontextprotocol/server-everart"],
		env: { EVERART_API_KEY: "" },
		terminalCommand: "",
		docsUrl:
			"https://github.com/modelcontextprotocol/servers/tree/main/src/everart"
	},

	filesystem: {
		icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZvbGRlci1jbG9zZWQiPjxwYXRoIGQ9Ik0yMCAyMGEyIDIgMCAwIDAgMi0yVjhhMiAyIDAgMCAwLTItMmgtNy45YTIgMiAwIDAgMS0xLjY5LS45TDkuNiAzLjlBMiAyIDAgMCAwIDcuOTMgM0g0YTIgMiAwIDAgMC0yIDJ2MTNhMiAyIDAgMCAwIDIgMloiLz48cGF0aCBkPSJNMiAxMGgyMCIvPjwvc3ZnPg==",
		description:
			"Access and manage local filesystem with specified allowed directories",
		command: "npx",
		args: ["-y", "@modelcontextprotocol/server-filesystem"],
		terminalCommand: "",
		docsUrl:
			"https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem"
	},

	github: {
		icon: "https://icon.icepanel.io/Technology/svg/GitHub.svg",
		description: "Interact with GitHub repositories and manage resources",
		command: "npx",
		args: ["-y", "@modelcontextprotocol/server-github"],
		env: { GITHUB_PERSONAL_ACCESS_TOKEN: "" },
		terminalCommand: "",
		docsUrl:
			"https://github.com/modelcontextprotocol/servers/blob/main/src/github/README.md"
	},

	gitlab: {
		icon: "https://icon.icepanel.io/Technology/svg/GitLab.svg",
		description:
			"Manage GitLab repositories and resources with optional self-hosted support",
		command: "npx",
		args: ["-y", "@modelcontextprotocol/server-gitlab"],
		env: {
			GITLAB_PERSONAL_ACCESS_TOKEN: "",
			GITLAB_API_URL: "https://gitlab.com/api/v4"
		},
		terminalCommand: "",
		docsUrl:
			"https://github.com/modelcontextprotocol/servers/blob/main/src/gitlab/README.md"
	},

	"google-maps": {
		icon: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Google_Maps_Logo_2020.svg",
		description: "Access Google Maps API for location and mapping services",
		command: "npx",
		args: ["-y", "@modelcontextprotocol/server-google-maps"],
		env: { GOOGLE_MAPS_API_KEY: "" },
		terminalCommand: "",
		docsUrl:
			"https://github.com/modelcontextprotocol/servers/tree/main/src/google-maps"
	},

	memory: {
		icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJyYWluIj48cGF0aCBkPSJNMTIgNWEzIDMgMCAxIDAtNS45OTcuMTI1IDQgNCAwIDAgMC0yLjUyNiA1Ljc3IDQgNCAwIDAgMCAuNTU2IDYuNTg4QTQgNCAwIDEgMCAxMiAxOFoiLz48cGF0aCBkPSJNMTIgNWEzIDMgMCAxIDEgNS45OTcuMTI1IDQgNCAwIDAgMSAyLjUyNiA1Ljc3IDQgNCAwIDAgMS0uNTU2IDYuNTg4QTQgNCAwIDEgMSAxMiAxOFoiLz48cGF0aCBkPSJNMTUgMTNhNC41IDQuNSAwIDAgMS0zLTQgNC41IDQuNSAwIDAgMS0zIDQiLz48cGF0aCBkPSJNMTcuNTk5IDYuNWEzIDMgMCAwIDAgLjM5OS0xLjM3NSIvPjxwYXRoIGQ9Ik02LjAwMyA1LjEyNUEzIDMgMCAwIDAgNi40MDEgNi41Ii8+PHBhdGggZD0iTTMuNDc3IDEwLjg5NmE0IDQgMCAwIDEgLjU4NS0uMzk2Ii8+PHBhdGggZD0iTTE5LjkzOCAxMC41YTQgNCAwIDAgMSAuNTg1LjM5NiIvPjxwYXRoIGQ9Ik02IDE4YTQgNCAwIDAgMS0xLjk2Ny0uNTE2Ii8+PHBhdGggZD0iTTE5Ljk2NyAxNy40ODRBNCA0IDAgMCAxIDE4IDE4Ii8+PC9zdmc+",
		description:
			"In-memory storage and retrieval system for temporary data",
		command: "npx",
		args: ["-y", "@modelcontextprotocol/server-memory"],
		terminalCommand: "",
		docsUrl:
			"https://github.com/modelcontextprotocol/servers/tree/main/src/memory"
	},

	postgres: {
		icon: "https://www.svgrepo.com/show/303301/postgresql-logo.svg",
		description: "Connect and interact with PostgreSQL databases",
		command: "npx",
		args: [
			"-y",
			"@modelcontextprotocol/server-postgres",
			"postgresql://localhost/mydb"
		],
		terminalCommand: "",
		docsUrl:
			"https://github.com/modelcontextprotocol/servers/tree/main/src/postgres"
	},

	puppeteer: {
		icon: "https://www.svgrepo.com/show/354228/puppeteer.svg",
		description: "Automate browser interactions with Puppeteer",
		command: "npx",
		args: ["-y", "@modelcontextprotocol/server-puppeteer"],
		terminalCommand: "",
		docsUrl:
			"https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer"
	},

	"sequential-thinking": {
		icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNwYXJrbGUiPjxwYXRoIGQ9Ik05LjkzNyAxNS41QTIgMiAwIDAgMCA4LjUgMTQuMDYzbC02LjEzNS0xLjU4MmEuNS41IDAgMCAxIDAtLjk2Mkw4LjUgOS45MzZBMiAyIDAgMCAwIDkuOTM3IDguNWwxLjU4Mi02LjEzNWEuNS41IDAgMCAxIC45NjMgMEwxNC4wNjMgOC41QTIgMiAwIDAgMCAxNS41IDkuOTM3bDYuMTM1IDEuNTgxYS41LjUgMCAwIDEgMCAuOTY0TDE1LjUgMTQuMDYzYTIgMiAwIDAgMC0xLjQzNyAxLjQzN2wtMS41ODIgNi4xMzVhLjUuNSAwIDAgMS0uOTYzIDB6Ii8+PC9zdmc+",
		description:
			"Enable step-by-step reasoning and sequential problem-solving",
		command: "npx",
		args: ["-y", "@modelcontextprotocol/server-sequential-thinking"],
		terminalCommand: "",
		docsUrl:
			"https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking"
	},

	slack: {
		icon: "https://icon.icepanel.io/Technology/svg/Slack.svg",
		description:
			"Integrate with Slack for messaging and workspace management",
		command: "npx",
		args: ["-y", "@modelcontextprotocol/server-slack"],
		env: {
			SLACK_BOT_TOKEN: "",
			SLACK_TEAM_ID: ""
		},
		terminalCommand: "",
		docsUrl:
			"https://github.com/modelcontextprotocol/servers/tree/main/src/slack"
	},

	sqlite: {
		icon: "https://icon.icepanel.io/Technology/svg/SQLite.svg",
		description: "Manage SQLite databases with local file storage",
		command: "uv",
		args: [
			"--directory",
			"parent_of_servers_repo/servers/src/sqlite",
			"run",
			"mcp-server-sqlite",
			"--db-path",
			"~/test.db"
		],
		terminalCommand: "",
		docsUrl:
			"https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite"
	}
}
