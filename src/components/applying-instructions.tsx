import { TerminalCommand } from "@/components/terminal-command"
import { SERVER_CONFIGS } from "@/server-configs"
import type { ServerConfig } from "@/server-configs"

type RuntimeServerConfig = {
	command: string
	args: string[]
	env?: Record<string, string>
}

type ApplyingInstructionsProps = {
	jsonContent: {
		mcpServers: Record<string, RuntimeServerConfig>
	}
}

export function ApplyingInstructions({
	jsonContent
}: ApplyingInstructionsProps) {
	const serversNeedingSetup = Object.keys(jsonContent.mcpServers).filter(
		(serverType) =>
			SERVER_CONFIGS[serverType as keyof typeof SERVER_CONFIGS]
				?.setupCommands
	)

	// Helper function to modify the JSON content with absolute paths
	const getJsonWithAbsolutePaths = () => {
		const modifiedContent = { ...jsonContent }

		for (const [serverType, config] of Object.entries(
			modifiedContent.mcpServers
		)) {
			const serverConfig =
				SERVER_CONFIGS[serverType as keyof typeof SERVER_CONFIGS]
			if (serverConfig?.setupCommands) {
				// Update the args to use the shell variable expansion syntax
				config.args = config.args?.map((arg) => {
					if (arg.includes("index.js")) {
						switch (serverType) {
							case "exa":
								return "$HOME_DIR/exa-mcp-server-main/build/index.js"
							case "browserbase":
								return "$HOME_DIR/mcp-server-browserbase-main/browserbase/build/index.js"
							default:
								return arg
						}
					}
					return arg
				})
			}
		}

		return modifiedContent
	}

	return (
		<div className="join join-vertical w-full">
			<div className="collapse collapse-arrow join-item border border-base-300 bg-white mb-16 p-4">
				<input type="checkbox" />
				<h2 className="collapse-title text-xl font-tiempos-regular my-4">
					Apply your changes
				</h2>
				<div className="collapse-content space-y-4">
					<div className="bg-base-200 rounded-xl p-4">
						<h3 className="text-lg font-tiempos-regular">
							Step 1: Install Node.js and uv (if not already
							installed)
						</h3>
						<div className="space-y-4 mt-4">
							<span className="pt-2 text-md">
								- Install Node.js:{" "}
								<a
									href="https://nodejs.org/en/download/prebuilt-installer"
									className="link link-primary"
									target="_blank"
									rel="noreferrer"
								>
									https://nodejs.org/en/download/prebuilt-installer
								</a>
							</span>
							<br />
							<br />
							<span className="text-md pt-2">
								- Install{" "}
								<a
									href="https://docs.astral.sh/uv"
									target="_blank"
									rel="noreferrer"
								>
									uv
								</a>{" "}
								by running this command:
							</span>
							<TerminalCommand command="curl -LsSf https://astral.sh/uv/install.sh | sh" />
						</div>
					</div>

					<div className="bg-base-200 rounded-xl p-4">
						<div className="space-y-4">
							<div>
								<h3 className="text-lg font-tiempos-regular mb-4">
									Step 2: Save your MCP servers to Claude by
									running:
								</h3>
								<TerminalCommand
									command={`HOME_DIR=$(echo $HOME) && echo '${JSON.stringify(
										getJsonWithAbsolutePaths(),
										null,
										2
									).replace(
										/\$HOME_DIR/g,
										"'\"$HOME_DIR\"'"
									)}' > "$HOME_DIR/Library/Application Support/Claude/claude_desktop_config.json"`}
								/>
							</div>
						</div>
					</div>

					{serversNeedingSetup.length > 0 && (
						<div className="bg-base-200 rounded-xl p-4">
							<h3 className="text-lg font-tiempos-regular mb-4">
								Step 3: Some servers require additional setup.
								Run the following commands:
							</h3>
							{serversNeedingSetup.map((serverType) => (
								<div key={serverType} className="mb-4">
									<p className="text-md mb-2">
										{serverType.charAt(0).toUpperCase() +
											serverType.slice(1)}
										:
									</p>
									<TerminalCommand
										command={
											SERVER_CONFIGS[
												serverType as keyof typeof SERVER_CONFIGS
											]?.setupCommands?.command || ""
										}
									/>
								</div>
							))}
						</div>
					)}

					<div className="bg-base-200 rounded-xl p-4 mt-4">
						<h3 className="text-lg font-tiempos-regular">
							Step {serversNeedingSetup.length > 0 ? "4" : "3"}:
							Restart Claude.app
						</h3>
					</div>
				</div>
			</div>
		</div>
	)
}
