import { MCPServerCard } from "@/components/mcp-server-card"
import { SERVER_CONFIGS } from "@/server-configs"
import { capitalizeFirstLetter } from "@/utils"
import { Plus } from "lucide-react"
import { useState } from "react"

type MCPServer = {
	command: string
	args: string[]
	env?: Record<string, string>
}

type MCPServers = {
	[key: string]: MCPServer
}

type MCPConfig = {
	mcpServers: MCPServers
}

type MCPServersProps = {
	jsonContent: MCPConfig
	onUpdate: (newContent: MCPConfig) => void
	onServerAdd: (serverType: keyof typeof SERVER_CONFIGS) => void
	onServerRemove: (serverType: string) => void
}

export function MCPServers({
	jsonContent,
	onUpdate,
	onServerAdd,
	onServerRemove
}: MCPServersProps) {
	const [customJson, setCustomJson] = useState("")
	const [customServerName, setCustomServerName] = useState("")
	const [jsonError, setJsonError] = useState("")

	const handleServerUpdate = (name: string, newConfig: MCPServer) => {
		console.log("Updating server:", name, newConfig)
		const updatedContent = {
			...jsonContent,
			mcpServers: {
				...jsonContent.mcpServers,
				[name]: newConfig
			}
		}
		onUpdate(updatedContent)
	}

	const handleServerDelete = (name: string) => {
		console.log("Deleting server:", name)
		onServerRemove(name)
	}

	const handleCustomServerAdd = () => {
		if (!customServerName.trim()) {
			setJsonError("Please enter a server name")
			return
		}

		try {
			const parsedConfig = JSON.parse(customJson)
			if (!parsedConfig.command || !Array.isArray(parsedConfig.args)) {
				setJsonError(
					"Invalid server configuration. Must include 'command' and 'args' fields"
				)
				return
			}

			const updatedContent = {
				...jsonContent,
				mcpServers: {
					...jsonContent.mcpServers,
					[customServerName]: parsedConfig
				}
			}
			onUpdate(updatedContent)

			// Reset form and close modal
			setCustomJson("")
			setCustomServerName("")
			setJsonError("")
			const modal = document.getElementById(
				"add_custom_server_modal"
			) as HTMLDialogElement
			if (modal) {
				modal.close()
			}
		} catch (error) {
			setJsonError("Invalid JSON format")
		}
	}

	const hasServers = Object.keys(jsonContent.mcpServers).length > 0

	return (
		<div className="space-y-4 my-32">
			<div className="flex justify-between items-center mb-8">
				<div className="flex items-center gap-4">
					<h2 className="text-2xl text-center">Your MCP Servers</h2>
					<div className="flex gap-2">
						<button
							type="button"
							className="btn btn-primary btn-sm"
							onClick={() => {
								const modal = document.getElementById(
									"add_server_modal"
								) as HTMLDialogElement
								if (modal) {
									modal.showModal()
								}
							}}
						>
							<Plus className="w-4 h-4" />
							<span>Add Preset</span>
						</button>
						<button
							type="button"
							className="btn btn-secondary btn-sm"
							onClick={() => {
								const modal = document.getElementById(
									"add_custom_server_modal"
								) as HTMLDialogElement
								if (modal) {
									modal.showModal()
								}
							}}
						>
							<Plus className="w-4 h-4" />
							<span>Add Custom</span>
						</button>
					</div>
				</div>
			</div>

			{/* Preset Server Modal */}
			<dialog id="add_server_modal" className="modal backdrop-blur-sm">
				<div className="modal-box rounded-3xl">
					<div className="flex justify-between items-center mb-4 sticky top-0 py-4 -mt-4 -mx-6 px-6">
						<h3 className="text-xl ml-4">Add Preset Server</h3>
						<button
							type="button"
							className="btn btn-ghost btn-sm btn-circle"
							onClick={() => {
								const modal = document.getElementById(
									"add_server_modal"
								) as HTMLDialogElement
								if (modal) {
									modal.close()
								}
							}}
						>
							✕
						</button>
					</div>

					<div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto px-4">
						{Object.entries(SERVER_CONFIGS).map(
							([serverType, config]) => (
								<button
									key={serverType}
									type="button"
									className="w-full bg-base-200 hover:bg-base-300 rounded-3xl p-4 flex items-center gap-6 h-24"
									onClick={() => {
										onServerAdd(
											serverType as keyof typeof SERVER_CONFIGS
										)
										const modal = document.getElementById(
											"add_server_modal"
										) as HTMLDialogElement
										if (modal) {
											modal.close()
										}
									}}
								>
									<div className="my-auto mx-2">
										<img
											src={config.icon}
											alt={`${serverType} icon`}
											className="w-10 h-10 object-contain"
										/>
									</div>
									<div className="flex flex-col text-left w-full">
										<span className="text-xl font-normal mb-1">
											{capitalizeFirstLetter(serverType)}
										</span>
										<p className="text-sm opacity-80">
											{config.description}
										</p>
									</div>
								</button>
							)
						)}
					</div>
				</div>
			</dialog>

			{/* Custom Server Modal */}
			<dialog
				id="add_custom_server_modal"
				className="modal backdrop-blur-sm"
			>
				<div className="modal-box rounded-3xl">
					<div className="flex justify-between items-center mb-4 sticky top-0 py-4 -mt-4 -mx-6 px-6">
						<h3 className="text-xl ml-4">Add Custom Server</h3>
						<button
							type="button"
							className="btn btn-ghost btn-sm btn-circle"
							onClick={() => {
								const modal = document.getElementById(
									"add_custom_server_modal"
								) as HTMLDialogElement
								if (modal) {
									modal.close()
								}
							}}
						>
							✕
						</button>
					</div>

					<div className="grid gap-4 py-4 px-4">
						<div className="form-control">
							<label htmlFor="serverName" className="label">
								<span className="label-text">Server Name</span>
							</label>
							<input
								id="serverName"
								type="text"
								className="input input-bordered w-full"
								value={customServerName}
								onChange={(e) =>
									setCustomServerName(e.target.value)
								}
								placeholder="Enter server name"
							/>
						</div>
						<div className="form-control">
							<label htmlFor="serverConfig" className="label">
								<span className="label-text">
									Server Configuration (JSON)
								</span>
							</label>
							<textarea
								id="serverConfig"
								className="textarea textarea-bordered h-40 font-mono"
								value={customJson}
								onChange={(e) => setCustomJson(e.target.value)}
								placeholder='{"command": "example", "args": ["arg1", "arg2"], "env": {"KEY": "value"}}'
							/>
						</div>
						{jsonError && (
							<div className="text-error text-sm">
								{jsonError}
							</div>
						)}
						<button
							type="button"
							className="btn btn-primary w-full"
							onClick={handleCustomServerAdd}
						>
							Add Server
						</button>
					</div>
				</div>
			</dialog>

			<div className="space-y-4">
				{hasServers ? (
					Object.entries(jsonContent.mcpServers).map(
						([name, config]) => {
							console.log("Rendering server:", name, config)
							const serverConfig =
								SERVER_CONFIGS[
									name as keyof typeof SERVER_CONFIGS
								]

							return (
								<MCPServerCard
									key={name}
									serverName={name}
									config={config}
									icon={serverConfig?.icon}
									onUpdate={handleServerUpdate}
									onDelete={handleServerDelete}
								/>
							)
						}
					)
				) : (
					<p className="text-gray-500 text-center">
						You currently have no MCP servers configured. Add one by
						clicking the "Add Preset" or "Add Custom" button.
					</p>
				)}
			</div>
		</div>
	)
}
