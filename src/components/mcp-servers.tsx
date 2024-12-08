import { Plus, Save } from "lucide-react"
import { useState } from "react"
import { CloudflareIcon } from "./icons"
import { MCPServerCard } from "./mcp-server-card"

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
}

const SERVER_CONFIGS = {
	cloudflare: {
		icon: <CloudflareIcon className="w-8 h-8" />,
		variables: [
			{
				name: "account id",
				argIndex: 2,
				value: ""
			}
		]
	}
}

export function MCPServers({ jsonContent, onUpdate }: MCPServersProps) {
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
		console.log("Before delete:", jsonContent)
		const { [name]: _, ...rest } = jsonContent.mcpServers
		const updatedContent = {
			...jsonContent,
			mcpServers: rest
		}
		console.log("After delete:", updatedContent)
		onUpdate(updatedContent)
	}

	const hasServers = Object.keys(jsonContent.mcpServers).length > 0

	return (
		<div className="space-y-4 my-32">
			<div className="flex justify-between items-center mb-8">
				<div className="flex items-center gap-4">
					<h2 className="text-2xl text-center">Your MCP Servers</h2>
					<button type="button" className="btn btn-primary btn-sm">
						<Plus className="w-4 h-4" />
						<span className="ml-2">Add Server</span>
					</button>
				</div>
				{hasChanges && (
					<button
						type="button"
						onClick={() => setHasChanges(false)}
						className="btn btn-primary btn-sm"
					>
						<Save className="w-4 h-4" />
						<span className="ml-2">Save All Changes</span>
					</button>
				)}
			</div>

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
