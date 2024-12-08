import { TerminalCommand } from "@/components/terminal-command"
import { SERVER_CONFIGS } from "@/server-configs"

interface ApplyingInstructionsProps {
	jsonContent: {
		mcpServers: Record<
			string,
			{
				command: string
				args: string[]
			}
		>
	}
	terminalServers: string[]
}

export function ApplyingInstructions({
	jsonContent,
	terminalServers
}: ApplyingInstructionsProps) {
	return (
		<div className="join join-vertical w-full">
			<div className="collapse collapse-arrow join-item border border-base-300 bg-white mb-16">
				<input type="checkbox" />
				<h2 className="collapse-title text-xl font-tiempos-regular">
					Apply your changes
				</h2>
				<div className="collapse-content">
					<div className="bg-base-200 rounded-lg p-4">
						<div className="space-y-4">
							<div>
								<h3 className="text-lg font-tiempos-regular mb-4">
									Step 1: Run these terminal commands
								</h3>

								{Object.keys(jsonContent.mcpServers).length >
									0 && (
									<TerminalCommand
										command={`echo "${JSON.stringify(
											jsonContent,
											null,
											2
										)
											.replace(/"/g, '\\"')
											.replace(
												/\n/g,
												"\\n"
											)}" > ~/Library/Application\\ Support/Claude/claude_desktop_config.json`}
									/>
								)}

								{terminalServers.map((serverType) => {
									const serverConfig =
										SERVER_CONFIGS[
											serverType as keyof typeof SERVER_CONFIGS
										]
									return (
										<div key={serverType} className="mt-4">
											<TerminalCommand
												command={
													serverConfig.terminalCommand
												}
											/>
										</div>
									)
								})}
							</div>
						</div>
					</div>
					<div className="bg-base-200 rounded-lg p-4 mt-4">
						<h3 className="text-lg font-tiempos-regular">
							Step 2: Restart Claude.app
						</h3>
					</div>
				</div>
			</div>
		</div>
	)
}
