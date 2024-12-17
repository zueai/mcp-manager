export type MCPConfig = {
	mcpServers: Record<
		string,
		{ command: string; args: string[]; env?: Record<string, string> }
	>
	cloudflare?: unknown
}

export function capitalizeFirstLetter(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

export function isValidJsonString(str: string): boolean {
	try {
		JSON.parse(str)
		return true
	} catch (e) {
		return false
	}
}

export const isRunningInElectron = () => {
	if (
		typeof window !== "undefined" &&
		typeof window.process === "object" &&
		(window.process as NodeJS.Process)?.type === "renderer"
	) {
		return true
	}
	return false
}

export function formatCommand(command: string) {
	return command
		.replace(/\s+/g, " ")
		.replace(/^\s+|\s+$/g, "")
		.replace(/\\n/g, "\n")
}

export async function readDefaultConfig() {
	console.log("Reading default config...")
	console.log("Window electron API:", window.electron)

	try {
		if (!window.electron?.readConfig) {
			console.error("No electron API available")
			return null
		}

		const config = await window.electron.readConfig()
		console.log("Got config from electron:", config)
		console.log("Config structure:", JSON.stringify(config, null, 2))

		if (config && typeof config === "object" && "mcpServers" in config) {
			console.log("Config is valid, mcpServers:", config.mcpServers)
			return config
		}

		console.log("Invalid config format, received:", typeof config)
		return null
	} catch (error) {
		console.error("Error reading config file:", error)
		return null
	}
}

export async function checkForConfigFile(): Promise<MCPConfig | null> {
	console.log("Checking for config file...")
	const config = await readDefaultConfig()
	if (!config) {
		console.log("No config found")
		return null
	}
	console.log("Config validation result:", validateServerConfig(config))
	console.log("Returning config:", config)
	return config as MCPConfig
}

export function validateServerConfig(config: unknown): config is MCPConfig {
	console.log("Validating config:", config)
	if (!config || typeof config !== "object") {
		console.log("Config is not an object")
		return false
	}

	const { mcpServers } = config as MCPConfig

	if (!mcpServers || typeof mcpServers !== "object") {
		console.log("mcpServers is missing or not an object")
		return false
	}

	console.log("Validating servers:", Object.keys(mcpServers))

	for (const [serverName, server] of Object.entries(mcpServers)) {
		console.log(`Validating server ${serverName}:`, server)
		if (!server || typeof server !== "object") {
			console.log(`Server ${serverName} is not an object`)
			return false
		}

		if (
			typeof server.command !== "string" ||
			!Array.isArray(server.args) ||
			!server.args.every((arg) => typeof arg === "string")
		) {
			console.log(`Server ${serverName} has invalid command or args`)
			return false
		}

		if (
			server.env !== undefined &&
			(typeof server.env !== "object" ||
				!Object.values(server.env).every(
					(value) => typeof value === "string"
				))
		) {
			console.log(`Server ${serverName} has invalid env`)
			return false
		}
	}

	console.log("Config validation passed!")
	return true
}
