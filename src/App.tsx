import { ApplyingInstructions } from "@/components/applying-instructions"
import { LoadingInstructions } from "@/components/loading-instructions"
import { MCPServers } from "@/components/mcp-servers"
import { SERVER_CONFIGS } from "@/server-configs"
import type React from "react"
import { useState } from "react"

function App() {
	const [jsonContent, setJsonContent] = useState<{
		mcpServers: Record<
			string,
			{ command: string; args: string[]; env?: Record<string, string> }
		>
	}>({
		mcpServers: {}
	})
	const [terminalServers, setTerminalServers] = useState<string[]>([])
	const [uploadStatus, setUploadStatus] = useState<
		"idle" | "success" | "error"
	>("idle")
	const [isInstructionsOpen, setIsInstructionsOpen] = useState(true)

	const handleJsonInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		try {
			const content = JSON.parse(e.target.value)
			setJsonContent(content)
			setUploadStatus("success")
			setIsInstructionsOpen(false) // Close accordion on successful upload
		} catch (error) {
			console.error("Error parsing JSON:", error)
			setUploadStatus("error")
		}
	}

	const handleServerAdd = (serverType: keyof typeof SERVER_CONFIGS) => {
		const serverConfig = SERVER_CONFIGS[serverType]

		if (serverConfig.terminalCommand) {
			setTerminalServers((prev) => [...prev, serverType])
		} else {
			// Ensure we only add servers with required properties
			const newServer = {
				command: serverConfig.command as string,
				args: serverConfig.args as string[],
				...(serverConfig.env && { env: serverConfig.env })
			}

			setJsonContent({
				...jsonContent,
				mcpServers: {
					...jsonContent.mcpServers,
					[serverType]: newServer
				}
			})
		}
	}

	const handleServerRemove = (serverType: string) => {
		// Remove from terminalServers if present
		if (terminalServers.includes(serverType)) {
			setTerminalServers((prev) => prev.filter((s) => s !== serverType))
		}

		// Remove from mcpServers if present
		if (jsonContent.mcpServers[serverType]) {
			const { [serverType]: _, ...rest } = jsonContent.mcpServers
			setJsonContent({
				...jsonContent,
				mcpServers: rest
			})
		}
	}

	return (
		<main className="max-h-screen p-16">
			<div className="container mx-auto p-4 max-w-3xl">
				<h1 className="text-3xl text-center m-8">
					MCP Manager for Claude Desktop
				</h1>

				<div className="flex justify-center">
					<span className="text-md text-center mb-8">
						This is a simple GUI to manage MCP servers that your
						Claude Desktop App can use.
						<br />
						This app runs entirely client-side in your browser. No
						data is stored or sent to any servers.
						<br />
						<br />
						Learn more about MCP{" "}
						<a
							href="https://modelcontextprotocol.io"
							className="link"
							target="_blank"
							rel="noreferrer"
						>
							here
						</a>{" "}
						and{" "}
						<a
							href="https://www.anthropic.com/news/model-context-protocol"
							className="link"
							target="_blank"
							rel="noreferrer"
						>
							here
						</a>
						.
					</span>
				</div>

				<div className="space-y-6">
					<LoadingInstructions
						isOpen={isInstructionsOpen}
						onOpenChange={setIsInstructionsOpen}
						onJsonInput={handleJsonInput}
						uploadStatus={uploadStatus}
					/>

					{Object.keys(jsonContent).length > 0 &&
						uploadStatus === "success" && (
							<div className="space-y-6">
								<MCPServers
									jsonContent={
										jsonContent as {
											mcpServers: Record<
												string,
												{
													command: string
													args: string[]
												}
											>
										}
									}
									onUpdate={setJsonContent}
									onServerAdd={handleServerAdd}
									onServerRemove={handleServerRemove}
								/>

								{(Object.keys(jsonContent.mcpServers).length >
									0 ||
									terminalServers.length > 0) && (
									<ApplyingInstructions
										jsonContent={jsonContent}
										terminalServers={terminalServers}
									/>
								)}
							</div>
						)}
				</div>
				<div className="flex justify-center mt-8">
					<span className="text-sm text-center">
						Made with ❤️ by{" "}
						<a href="https://zue.ai" className="link">
							zue.ai
						</a>{" "}
						- AI automation agency and product studio.
						<br />
						Contact us for AI automation solutions and product
						development -{" "}
						<a href="mailto:hi@zue.ai" className="link">
							hi@zue.ai
						</a>
						<br />
						This project is not affiliated with Anthropic.
					</span>
				</div>
			</div>
		</main>
	)
}

export default App
