import { ApplyingInstructions } from "@/components/applying-instructions"
import { LoadingInstructions } from "@/components/loading-instructions"
import { MCPServers } from "@/components/mcp-servers"
import { SERVER_CONFIGS } from "@/server-configs"
import {
	type MCPConfig,
	checkForConfigFile,
	validateServerConfig
} from "@/utils"
import type React from "react"
import { useEffect, useState } from "react"

function App() {
	const [jsonContent, setJsonContent] = useState<MCPConfig>({
		mcpServers: {}
	})
	const [uploadStatus, setUploadStatus] = useState<
		"idle" | "success" | "error"
	>("idle")
	const [isInstructionsOpen, setIsInstructionsOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	// Check for config file on component mount
	useEffect(() => {
		const loadConfig = async () => {
			console.log("Starting loadConfig...")
			try {
				const config = await checkForConfigFile()
				console.log("Config loaded:", config)

				if (config && validateServerConfig(config)) {
					console.log("Config is valid, setting state...")
					setJsonContent(config)
					setUploadStatus("success")
					setIsInstructionsOpen(false)
					console.log("State updated")
				} else {
					console.log(
						"Config is invalid or missing, showing instructions"
					)
					setIsInstructionsOpen(true)
				}
			} catch (err) {
				console.error("Error loading config:", err)
				setIsInstructionsOpen(true)
			} finally {
				console.log("Setting loading to false")
				setIsLoading(false)
			}
		}
		loadConfig()
	}, [])

	useEffect(() => {
		console.log("Current state:", {
			jsonContent,
			uploadStatus,
			isInstructionsOpen,
			isLoading,
			serverCount: Object.keys(jsonContent.mcpServers).length
		})
	}, [jsonContent, uploadStatus, isInstructionsOpen, isLoading])

	const handleJsonInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		try {
			const content = JSON.parse(e.target.value)
			if (validateServerConfig(content)) {
				setJsonContent(content)
				setUploadStatus("success")
				setIsInstructionsOpen(false)
			} else {
				throw new Error("Invalid server configuration")
			}
		} catch (error) {
			console.error("Error parsing JSON:", error)
			setUploadStatus("error")
		}
	}

	const handleServerAdd = (serverType: keyof typeof SERVER_CONFIGS) => {
		console.log("Adding server:", serverType)
		const serverConfig = SERVER_CONFIGS[serverType]

		if (!serverConfig.command || !serverConfig.args) {
			console.error("Invalid server configuration")
			return
		}

		const newServer = {
			command: serverConfig.command,
			args: serverConfig.args,
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
		console.log("Removing server:", serverType)
		if (jsonContent.mcpServers[serverType]) {
			const { [serverType]: _, ...rest } = jsonContent.mcpServers
			setJsonContent({
				...jsonContent,
				mcpServers: rest
			})
		}
	}

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<span className="text-lg">Loading configuration...</span>
			</div>
		)
	}

	// Debug render conditions
	console.log("Render conditions:", {
		hasServers: Object.keys(jsonContent.mcpServers).length > 0,
		uploadStatus,
		shouldShowServers:
			Object.keys(jsonContent.mcpServers).length > 0 &&
			uploadStatus === "success"
	})

	return (
		<main className="max-h-screen p-16">
			<div className="container mx-auto p-4 max-w-4xl">
				<div className="flex justify-center items-center gap-8 mb-16">
					<div className="flex items-center justify-center rounded-2xl h-16 p-8 border-2 border-black/20">
						<img
							src="./mcp-logo.svg"
							alt="MCP Manager"
							className="h-8"
						/>
					</div>

					<div className="flex items-center justify-center rounded-2xl p-8 h-16 border-2 border-primary/30">
						<img
							src="./claude-logo.svg"
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
						perform actions on your behalf. Read the{" "}
						<a
							href="https://modelcontextprotocol.io"
							className="link"
							target="_blank"
							rel="noreferrer"
						>
							MCP docs
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
						This is a simple GUI to help you install and manage MCP
						servers in your Claude App. <br />
						This runs client-side on your machine only, so your data
						will never leave your computer.
					</span>
				</div>

				<div className="space-y-6">
					{isInstructionsOpen && (
						<LoadingInstructions
							isOpen={isInstructionsOpen}
							onOpenChange={setIsInstructionsOpen}
							onJsonInput={handleJsonInput}
							uploadStatus={uploadStatus}
						/>
					)}

					{Object.keys(jsonContent.mcpServers).length > 0 &&
						uploadStatus === "success" && (
							<div className="space-y-6">
								<MCPServers
									jsonContent={jsonContent}
									onUpdate={setJsonContent}
									onServerAdd={handleServerAdd}
									onServerRemove={handleServerRemove}
								/>

								<ApplyingInstructions
									jsonContent={jsonContent}
								/>
							</div>
						)}
				</div>
				<div className="flex flex-col items-center mt-16 mb-8">
					<a href="https://zue.ai" target="_blank" rel="noreferrer">
						<div className="flex items-center justify-center rounded-2xl p-10 h-16 border-2 border-black/10 hover:bg-primary/20 transition-all ease-in-out duration-300 shadow-md hover:shadow-lg">
							<img
								src="./logo_zue.svg"
								alt="zue.ai"
								className="h-8"
							/>
						</div>
					</a>
				</div>
				<div className="flex justify-center my-8 flex-col">
					<span className="text-md text-center">
						Made with ❤️ by zue and some incredible{" "}
						<a
							href="https://github.com/zueai/mcp-manager/graphs/contributors"
							className="link"
							target="_blank"
							rel="noreferrer"
						>
							contributors
						</a>
						.
						<br />
						You can view the source code on{" "}
						<a
							href="https://github.com/zueai/mcp-manager"
							className="link"
							target="_blank"
							rel="noreferrer"
						>
							GitHub
						</a>
						.
						<br />
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
