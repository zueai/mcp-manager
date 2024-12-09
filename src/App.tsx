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

	const handleServerRemove = (serverType: string) => {
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
			<div className="container mx-auto p-4 max-w-4xl">
				<div className="flex justify-center items-center gap-8 mb-16">
					<div className="flex items-center justify-center rounded-2xl h-16 p-8 border-2 border-black/20">
						<img
							src="/mcp-logo.svg"
							alt="MCP Manager"
							className="h-8"
						/>
					</div>

					<div className="flex items-center justify-center rounded-2xl p-8 h-16 border-2 border-primary/30">
						<img
							src="/claude-logo.svg"
							alt="Claude"
							className="h-6"
						/>
					</div>
				</div>
				<h1 className="text-5xl font-light text-center my-8">
					MCP Manager for Claude Desktop
				</h1>

				<div className="flex justify-center">
					<span className="text-md text-center mb-8">
						Give Claude access to private data, APIs, and other
						services using the Model Context Protocol so it can
						answer questions and perform actions on your behalf.{" "}
						<br />
						<br />
						In a nutshell, MCP servers are like plugins that give
						Claude (the "client") prompts, resources, and tools to
						perform actions on your behalf.{" "}
						<a
							href="https://modelcontextprotocol.io"
							className="link"
							target="_blank"
							rel="noreferrer"
						>
							Read the MCP docs
						</a>{" "}
						or check out{" "}
						<a
							href="https://www.anthropic.com/news/model-context-protocol"
							className="link"
							target="_blank"
							rel="noreferrer"
						>
							Anthropic's announcement
						</a>{" "}
						to learn more.
						<br />
						<br />
						This is a simple, web-based GUI to help you install and
						manage MCP servers in your Claude App. <br />
						This runs client-side in your browser so your data will
						never leave your computer.
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
									jsonContent={{
										mcpServers:
											jsonContent.mcpServers as Record<
												string,
												{
													command: string
													args: string[]
													env?: Record<string, string>
												}
											>
									}}
									onUpdate={setJsonContent}
									onServerAdd={handleServerAdd}
									onServerRemove={handleServerRemove}
								/>

								{Object.keys(jsonContent.mcpServers).length >
									0 && (
									<ApplyingInstructions
										jsonContent={jsonContent}
									/>
								)}
							</div>
						)}
				</div>
				<div className="flex flex-col items-center mt-16 mb-8">
					<a href="https://zue.ai" target="_blank" rel="noreferrer">
						<div className="flex items-center justify-center rounded-2xl p-10 h-16 border-2 border-black/10 hover:bg-primary/20 transition-all ease-in-out duration-300 shadow-md hover:shadow-lg">
							<img
								src="/logo_zue.svg"
								alt="zue.ai"
								className="h-8"
							/>
						</div>
					</a>
				</div>
				<div className="flex justify-center my-8 flex-col">
					<span className="text-md text-center">
						Made with ❤️ by zue. View the{" "}
						<a
							href="https://github.com/zueai/mcp-manager"
							className="link"
							target="_blank"
							rel="noreferrer"
						>
							MCP Manager source code on GitHub
						</a>
						.
						<br />
						<a
							href="https://zue.ai/talk-to-us"
							className="link"
							target="_blank"
							rel="noreferrer"
						>
							Contact us
						</a>{" "}
						for custom AI automation solutions and product
						development.
					</span>
					<span className="text-sm text-center">
						<br />
						<br />
						This project is not affiliated with Anthropic. All logos
						are trademarks of their respective owners.
					</span>
				</div>
			</div>
		</main>
	)
}

export default App
