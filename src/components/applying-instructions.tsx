import { TerminalCommand } from "@/components/terminal-command"
import { SERVER_CONFIGS } from "@/server-configs"
import { Play } from "lucide-react"
import { useState } from "react"

type RuntimeServerConfig = {
	command: string
	args: string[]
	env?: Record<string, string>
}

type ApplyingInstructionsProps = {
	jsonContent: {
		mcpServers: Record<string, RuntimeServerConfig>
		cloudflare?: unknown
	}
}

export function ApplyingInstructions({
	jsonContent
}: ApplyingInstructionsProps) {
	const [autoApplyStatus, setAutoApplyStatus] = useState<
		"idle" | "running" | "success" | "error"
	>("idle")
	const [errorMessage, setErrorMessage] = useState<string>("")

	const serversNeedingSetup = Object.keys(jsonContent.mcpServers).filter(
		(serverType) =>
			SERVER_CONFIGS[serverType as keyof typeof SERVER_CONFIGS]
				?.setupCommands
	)

	// Helper function to modify the JSON content with absolute paths
	const getJsonWithAbsolutePaths = () => {
		const { cloudflare: _, ...modifiedContent } = jsonContent

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
								return "$HOME_DIR/mcp-servers/exa-mcp-server-main/build/index.js"
							case "browserbase":
								return "$HOME_DIR/mcp-servers/mcp-server-browserbase-main/browserbase/dist/index.js"
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

	const handleAutoApply = async () => {
		try {
			setAutoApplyStatus("running")
			setErrorMessage("")

			// Create a new process to execute the command
			const command = `HOME_DIR=$(echo $HOME) && echo '${JSON.stringify(
				getJsonWithAbsolutePaths(),
				null,
				2
			).replace(
				/\$HOME_DIR/g,
				"'\"$HOME_DIR\"'"
			)}' > "$HOME_DIR/Library/Application Support/Claude/claude_desktop_config.json"`

			// Use the child_process module through window.electron
			const result = await window.electron.executeCommand(command)

			if (!result.success) {
				setAutoApplyStatus("error")
				setErrorMessage(result.output)
			} else {
				setAutoApplyStatus("success")
			}
		} catch (error) {
			setAutoApplyStatus("error")
			setErrorMessage(
				error instanceof Error
					? error.message
					: "Unknown error occurred"
			)
		}
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
						<h3 className="text-lg font-tiempos-regular mb-4">
							Option 1: Auto Apply (Recommended)
						</h3>
						<div className="space-y-4">
							<p className="text-sm text-gray-600 mb-4">
								Click the button below to automatically apply
								your changes. This will update your Claude
								configuration file directly.
							</p>
							<button
								type="button"
								onClick={handleAutoApply}
								disabled={autoApplyStatus === "running"}
								className={`btn btn-primary ${autoApplyStatus === "running" ? "loading" : ""}`}
							>
								<Play className="w-4 h-4" />
								{autoApplyStatus === "running"
									? "Applying..."
									: "Apply Changes"}
							</button>
							{autoApplyStatus === "success" && (
								<div className="alert alert-success">
									<span>
										Changes applied successfully! Please
										restart Claude.app
									</span>
								</div>
							)}
							{autoApplyStatus === "error" && (
								<div className="alert alert-error">
									<span>
										Error applying changes: {errorMessage}
									</span>
								</div>
							)}
						</div>
					</div>

					<div className="divider">OR</div>

					<div className="bg-base-200 rounded-xl p-4">
						<h3 className="text-lg font-tiempos-regular">
							Option 2: Manual Setup
						</h3>
						<div className="mt-4">
							<h4 className="text-md mb-4">
								Step 1: Install Node.js and uv by running these
								commands (if not already installed)
							</h4>
							<div className="space-y-4">
								<TerminalCommand
									command={
										'curl -fsSL https://fnm.vercel.app/install | bash && source ~/.zshrc && eval "$(fnm env --use-on-cd --shell zsh)" >> ~/.zshrc && source ~/.zshrc && fnm use --install-if-missing 22 && node -v'
									}
								/>
								If the command above fails, install Node.js by
								downloading the installer from{" "}
								<a
									href="https://nodejs.org/en/download/prebuilt-installer"
									target="_blank"
									rel="noopener noreferrer"
									className="link link-primary"
								>
									https://nodejs.org/en/download/prebuilt-installer
								</a>
								<TerminalCommand
									command={
										"curl -LsSf https://astral.sh/uv/install.sh | sh && source $HOME/.cargo/env && uv python install"
									}
								/>
							</div>
						</div>
					</div>

					<div className="bg-base-200 rounded-xl p-4">
						<div className="space-y-4">
							<div>
								<h4 className="text-md mb-4">
									Step 2: Save your MCP servers to Claude by
									running:
								</h4>
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
							<h4 className="text-md mb-4">
								Step 3: Some servers require additional setup.
								Run the following commands:
							</h4>
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
						<h4 className="text-md">
							Step {serversNeedingSetup.length > 0 ? "4" : "3"}:
							Restart Claude.app
						</h4>
					</div>
				</div>
			</div>
		</div>
	)
}
