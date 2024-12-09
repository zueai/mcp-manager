export type ServerConfig = {
	command?: string
	args?: string[]
	env?: Record<string, string>
	icon: string
	description: string
	docsUrl: string
	setupCommands?: {
		installPath: string
		command: string
	}
}

export const SERVER_CONFIGS: Record<string, ServerConfig> = {
	"brave-search": {
		icon: "https://www.svgrepo.com/show/305818/brave.svg",
		description: "Search the web with Brave Search API",

		docsUrl:
			"https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search/README.md",
		command: "npx",
		args: ["-y", "@modelcontextprotocol/server-brave-search"],
		env: { BRAVE_API_KEY: "" }
	},
	filesystem: {
		icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZvbGRlci1jbG9zZWQiPjxwYXRoIGQ9Ik0yMCAyMGEyIDIgMCAwIDAgMi0yVjhhMiAyIDAgMCAwLTItMmgtNy45YTIgMiAwIDAgMS0xLjY5LS45TDkuNiAzLjlBMiAyIDAgMCAwIDcuOTMgM0g0YTIgMiAwIDAgMC0yIDJ2MTNhMiAyIDAgMCAwIDIgMloiLz48cGF0aCBkPSJNMiAxMGgyMCIvPjwvc3ZnPg==",
		description:
			"Access and manage local filesystem with specified allowed directories",
		command: "npx",
		args: ["-y", "@modelcontextprotocol/server-filesystem", "/Users/"],

		docsUrl:
			"https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem/README.md"
	},
	memory: {
		icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJyYWluIj48cGF0aCBkPSJNMTIgNWEzIDMgMCAxIDAtNS45OTcuMTI1IDQgNCAwIDAgMC0yLjUyNiA1Ljc3IDQgNCAwIDAgMCAuNTU2IDYuNTg4QTQgNCAwIDEgMCAxMiAxOFoiLz48cGF0aCBkPSJNMTIgNWEzIDMgMCAxIDEgNS45OTcuMTI1IDQgNCAwIDAgMSAyLjUyNiA1Ljc3IDQgNCAwIDAgMS0uNTU2IDYuNTg4QTQgNCAwIDEgMSAxMiAxOFoiLz48cGF0aCBkPSJNMTUgMTNhNC41IDQuNSAwIDAgMS0zLTQgNC41IDQuNSAwIDAgMS0zIDQiLz48cGF0aCBkPSJNMTcuNTk5IDYuNWEzIDMgMCAwIDAgLjM5OS0xLjM3NSIvPjxwYXRoIGQ9Ik02LjAwMyA1LjEyNUEzIDMgMCAwIDAgNi40MDEgNi41Ii8+PHBhdGggZD0iTTMuNDc3IDEwLjg5NmE0IDQgMCAwIDEgLjU4NS0uMzk2Ii8+PHBhdGggZD0iTTE5LjkzOCAxMC41YTQgNCAwIDAgMSAuNTg1LjM5NiIvPjxwYXRoIGQ9Ik02IDE4YTQgNCAwIDAgMS0xLjk2Ny0uNTE2Ii8+PHBhdGggZD0iTTE5Ljk2NyAxNy40ODRBNCA0IDAgMCAxIDE4IDE4Ii8+PC9zdmc+",
		description: "Give Claude memory of previous conversations",
		command: "npx",
		args: ["-y", "@modelcontextprotocol/server-memory"],

		docsUrl:
			"https://github.com/modelcontextprotocol/servers/tree/main/src/memory/README.md"
	},
	"sequential-thinking": {
		icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNwYXJrbGUiPjxwYXRoIGQ9Ik05LjkzNyAxNS41QTIgMiAwIDAgMCA4LjUgMTQuMDYzbC02LjEzNS0xLjU4MmEuNS41IDAgMCAxIDAtLjk2Mkw4LjUgOS45MzZBMiAyIDAgMCAwIDkuOTM3IDguNWwxLjU4Mi02LjEzNWEuNS41IDAgMCAxIC45NjMgMEwxNC4wNjMgOC41QTIgMiAwIDAgMCAxNS41IDkuOTM3bDYuMTM1IDEuNTgxYS41LjUgMCAwIDEgMCAuOTY0TDE1LjUgMTQuMDYzYTIgMiAwIDAgMC0xLjQzNyAxLjQzN2wtMS41ODIgNi4xMzVhLjUuNSAwIDAgMS0uOTYzIDB6Ii8+PC9zdmc+",
		description:
			"Enable step-by-step reasoning and sequential problem-solving",
		command: "npx",
		args: ["-y", "@modelcontextprotocol/server-sequential-thinking"],

		docsUrl:
			"https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking/README.md"
	},
	slack: {
		icon: "https://icon.icepanel.io/Technology/svg/Slack.svg",
		description: "Let Claude access your Slack workspace",
		command: "npx",
		args: ["-y", "@modelcontextprotocol/server-slack"],
		env: {
			SLACK_BOT_TOKEN: "",
			SLACK_TEAM_ID: ""
		},

		docsUrl:
			"https://github.com/modelcontextprotocol/servers/tree/main/src/slack/README.md"
	},
	"google-drive": {
		icon: "https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg",
		description: "Access and search files in your Google Drive",
		command: "npx",
		args: ["-y", "@modelcontextprotocol/server-gdrive"],

		docsUrl:
			"https://github.com/modelcontextprotocol/servers/tree/main/src/gdrive/README.md"
	},
	// time: {
	// 	icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNsb2NrIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxwb2x5bGluZSBwb2ludHM9IjEyIDYgMTIgMTIgMTYgMTQiLz48L3N2Zz4=",
	// 	description: "Current time / time zone conversion utilities",
	// 	command: "uvx",
	// 	args: ["mcp-server-time"],
	// 	docsUrl:
	// 		"https://github.com/modelcontextprotocol/servers/tree/main/src/time/README.md"
	// },
	"google-maps": {
		icon: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Google_Maps_Logo_2020.svg",
		description: "Access Google Maps API for location and mapping services",
		command: "npx",
		args: ["-y", "@modelcontextprotocol/server-google-maps"],
		env: { GOOGLE_MAPS_API_KEY: "" },

		docsUrl:
			"https://github.com/modelcontextprotocol/servers/tree/main/src/google-maps/README.md"
	},
	"youtube-transcript": {
		icon: "https://www.svgrepo.com/show/13671/youtube.svg",
		description: "Access and search YouTube transcripts",
		command: "npx",
		args: ["-y", "@kimtaeyoon83/mcp-server-youtube-transcript"],

		docsUrl: "https://github.com/kimtaeyoon83/mcp-server-youtube-transcript"
	},
	perplexity: {
		icon: "https://seeklogo.com/images/P/perplexity-ai-logo-13120A0AAE-seeklogo.com.png",
		description: "Search the web with Perplexity API",
		command: "uvx",
		args: ["mcp-server-perplexity"],
		env: {
			PERPLEXITY_API_KEY: "your-perplexity-api-key"
		},

		docsUrl: "https://github.com/tanigami/mcp-server-perplexity"
	},
	// fetch: {
	// 	icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWdsb2JlIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxwYXRoIGQ9Ik0xMiAyYTE0LjUgMTQuNSAwIDAgMCAwIDIwIDE0LjUgMTQuNSAwIDAgMCAwLTIwIi8+PHBhdGggZD0iTTIgMTJoMjAiLz48L3N2Zz4=",
	// 	description: "Let Claude fetch and read a website",
	// 	command: "uvx",
	// 	args: ["mcp-server-fetch"],

	// 	docsUrl:
	// 		"https://github.com/modelcontextprotocol/servers/tree/main/src/fetch/README.md"
	// },
	"apple-notes": {
		icon: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Notes_icon.svg",
		description: "Access and search your Apple Notes",
		command: "uvx",
		args: ["apple-notes-mcp"],

		docsUrl: "https://github.com/sirmews/apple-notes-mcp"
	},
	exa: {
		icon: "https://media.licdn.com/dms/image/v2/D4D0BAQEGEKPKKLiNvA/company-logo_200_200/company-logo_200_200/0/1721090778302/exa_ai_logo?e=2147483647&v=beta&t=bNJAmBL2v359QkVTUgGTEbdBOqsnYSMaOuCtMDuG920",
		description: "Search the web with Exa",
		command: "npx",
		args: ["exa-mcp-server/build/index.js"],
		env: {
			EXA_API_KEY: "your-api-key-here"
		},
		setupCommands: {
			installPath: "~/mcp-servers",
			command:
				"mkdir -p $(echo $HOME)/mcp-servers && cd $(echo $HOME)/mcp-servers && \
				curl -L https://github.com/exa-labs/exa-mcp-server/archive/refs/heads/main.zip -o exa-mcp-server.zip && \
				unzip -o exa-mcp-server.zip && \
				rm exa-mcp-server.zip && \
				cd exa-mcp-server-main && \
				npm install --save axios dotenv && \
				npm run build && \
				sudo npm link"
		},

		docsUrl: "https://github.com/exa-labs/exa-mcp-server"
	},
	browserbase: {
		icon: "https://opensourcepledge.com/images/members/browserbase/logo.webp",
		description: "Let Claude explore the web with Browserbase",
		command: "node",
		args: ["mcp-server-browserbase-main/browserbase/dist/index.js"],
		env: {
			BROWSERBASE_API_KEY: "your-api-key-here",
			BROWSERBASE_PROJECT_ID: "your-project-id-here"
		},
		setupCommands: {
			installPath: "~/mcp-servers",
			command:
				"mkdir -p $(echo $HOME)/mcp-servers && cd $(echo $HOME)/mcp-servers && \
				curl -L https://github.com/browserbase/mcp-server-browserbase/archive/refs/heads/main.zip -o browserbase-mcp-server.zip && \
				unzip -o browserbase-mcp-server.zip && \
				rm browserbase-mcp-server.zip && \
				cd mcp-server-browserbase-main/browserbase && \
				npm install && \
				npm run build"
		},

		docsUrl:
			"https://github.com/browserbase/mcp-server-browserbase/tree/main/browserbase"
	},
	obsidian: {
		icon: "https://upload.wikimedia.org/wikipedia/commons/1/10/2023_Obsidian_logo.svg",
		description: "Read and search files in your Obsidian vault",
		command: "npx",
		args: ["-y", "mcp-obsidian", ""],

		docsUrl: "https://github.com/calclavia/mcp-obsidian"
	},
	todoist: {
		icon: "https://www.svgrepo.com/show/354452/todoist-icon.svg",
		description: "Access and search your Todoist tasks",
		command: "npx",
		args: ["-y", "@abhiz123/todoist-mcp-server"],
		env: {
			TODOIST_API_TOKEN: "your_api_token_here"
		},

		docsUrl: "https://github.com/abhiz123/todoist-mcp-server"
	},
	cloudflare: {
		icon: "https://icon.icepanel.io/Technology/svg/Cloudflare.svg",
		description: "Manage your Cloudflare workers and account resources",
		docsUrl: "https://github.com/cloudflare/mcp-server-cloudflare",
		setupCommands: {
			installPath: "~/mcp-servers",
			command: "npx @cloudflare/mcp-server-cloudflare init"
		}
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

		docsUrl:
			"https://github.com/modelcontextprotocol/servers/tree/main/src/aws-kb-retrieval/README.md"
	},
	everart: {
		icon: "https://pbs.twimg.com/profile_images/1717719314369789952/AmXarABn_400x400.png",
		description:
			"Interface with Everart API for digital art and design tools",
		command: "npx",
		args: ["-y", "@modelcontextprotocol/server-everart"],
		env: { EVERART_API_KEY: "" },

		docsUrl:
			"https://github.com/modelcontextprotocol/servers/tree/main/src/everart/README.md"
	},
	github: {
		icon: "https://icon.icepanel.io/Technology/svg/GitHub.svg",
		description: "Let Claude access your GitHub repositories",
		command: "npx",
		args: ["-y", "@modelcontextprotocol/server-github"],
		env: { GITHUB_PERSONAL_ACCESS_TOKEN: "" },

		docsUrl:
			"https://github.com/modelcontextprotocol/servers/blob/main/src/github/README.md"
	},
	gitlab: {
		icon: "https://icon.icepanel.io/Technology/svg/GitLab.svg",
		description: "Manage GitLab repositories and resources",
		command: "npx",
		args: ["-y", "@modelcontextprotocol/server-gitlab"],
		env: {
			GITLAB_PERSONAL_ACCESS_TOKEN: "",
			GITLAB_API_URL: "https://gitlab.com/api/v4"
		},

		docsUrl:
			"https://github.com/modelcontextprotocol/servers/blob/main/src/gitlab/README.md"
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

		docsUrl:
			"https://github.com/modelcontextprotocol/servers/tree/main/src/postgres/README.md"
	},
	puppeteer: {
		icon: "https://www.svgrepo.com/show/354228/puppeteer.svg",
		description: "Automate browser interactions with Puppeteer",
		command: "npx",
		args: ["-y", "@modelcontextprotocol/server-puppeteer"],

		docsUrl:
			"https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer/README.md"
	},
	sqlite: {
		icon: "https://icon.icepanel.io/Technology/svg/SQLite.svg",
		description: "Manage SQLite databases in local file storage",
		command: "uv",
		args: [
			"--directory",
			"parent_of_servers_repo/servers/src/sqlite",
			"run",
			"mcp-server-sqlite",
			"--db-path",
			"~/test.db"
		],

		docsUrl:
			"https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite/README.md"
	}
	// sentry: {
	// 	icon: "https://www.svgrepo.com/show/306716/sentry.svg",
	// 	description: "Retrieve and analyze issues from Sentry for debugging",
	// 	command: "uvx",
	// 	args: ["mcp-server-sentry", "--auth-token", ""],

	// 	docsUrl:
	// 		"https://github.com/modelcontextprotocol/servers/tree/main/src/sentry"
	// }
}
