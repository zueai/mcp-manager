import { MCPServerCard } from "@/components/mcp-server-card"
import { SERVER_CONFIGS } from "@/server-configs"
import { capitalizeFirstLetter } from "@/utils"
import { Plus, Save, X } from "lucide-react"
import { useState } from "react"

type MCPServer = {
	command: string
	args: string[]
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
	const [hasChanges, setHasChanges] = useState(false)

	const handleServerUpdate = (name: string, newConfig: MCPServer) => {
		const updatedContent = {
			...jsonContent,
			mcpServers: {
				...jsonContent.mcpServers,
				[name]: newConfig
			}
		}
		setHasChanges(true)
		onUpdate(updatedContent)
	}

	const handleServerDelete = (name: string) => {
		onServerRemove(name)
	}

	const handleAddServer = (serverType: keyof typeof SERVER_CONFIGS) => {
		onServerAdd(serverType)
	}

	const hasServers = Object.keys(jsonContent.mcpServers).length > 0

	return (
		<div className="space-y-4 my-32">
			<div className="flex justify-between items-center mb-8">
				<div className="flex items-center gap-4">
					<h2 className="text-2xl text-center">Your MCP Servers</h2>
					<button
						type="button"
						className="btn btn-primary btn-sm"
						onClick={() =>
							(
								document.getElementById(
									"add_server_modal"
								) as HTMLDialogElement
							)?.showModal()
						}
					>
						<Plus className="w-4 h-4" />
						<span>Add Server</span>
					</button>
				</div>
				{hasChanges && (
					<button
						type="button"
						onClick={() => setHasChanges(false)}
						className="btn btn-outline btn-sm"
					>
						<Save className="w-4 h-4" />
						<span className="ml-2">Save All Changes</span>
					</button>
				)}
			</div>

			<dialog id="add_server_modal" className="modal backdrop-blur-sm">
				<div className="modal-box">
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-xl">Add New Server</h3>
						<button
							type="button"
							className="btn btn-sm btn-ghost"
							onClick={() =>
								(
									document.getElementById(
										"add_server_modal"
									) as HTMLDialogElement
								)?.close()
							}
						>
							<X className="w-4 h-4" />
						</button>
					</div>

					<div className="grid gap-4 py-4">
						{Object.keys(SERVER_CONFIGS).map((serverType) => (
							<button
								key={serverType}
								type="button"
								className="w-full bg-base-200 hover:bg-base-300 rounded-xl p-4 flex items-start gap-6"
								onClick={() => {
									handleAddServer(
										serverType as keyof typeof SERVER_CONFIGS
									)
									;(
										document.getElementById(
											"add_server_modal"
										) as HTMLDialogElement
									)?.close()
								}}
							>
								<div className="my-auto">
									{
										SERVER_CONFIGS[
											serverType as keyof typeof SERVER_CONFIGS
										].icon
									}
								</div>
								<div className="flex flex-col text-left">
									<span className="text-xl font-normal mb-1">
										{capitalizeFirstLetter(serverType)}
									</span>
									<p className="text-sm opacity-80">
										{
											SERVER_CONFIGS[
												serverType as keyof typeof SERVER_CONFIGS
											].description
										}
									</p>
								</div>
							</button>
						))}
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button type="button">close</button>
				</form>
			</dialog>

			<div className="space-y-4">
				{hasServers ? (
					Object.entries(jsonContent.mcpServers).map(
						([name, config]) => {
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
									variables={serverConfig?.variables?.map(
										(v) => ({
											...v,
											value: config.args[v.argIndex] || ""
										})
									)}
									onUpdate={handleServerUpdate}
									onDelete={handleServerDelete}
								/>
							)
						}
					)
				) : (
					<p className=" text-gray-500 text-center">
						You currently have no MCP servers configured. Add one by
						clicking the "Add Server" button.
					</p>
				)}
			</div>
		</div>
	)
}
