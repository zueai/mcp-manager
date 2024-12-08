import { Save, Trash2 } from "lucide-react"
import { useState } from "react"

const capitalizeFirstLetter = (str: string): string => {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

type MCPServerConfig = {
	command: string
	args: string[]
}

type MCPServerCardProps = {
	serverName: string
	config: MCPServerConfig
	icon?: React.ReactNode
	variables?: {
		name: string
		value: string
		argIndex: number
	}[]
	onUpdate: (name: string, newConfig: MCPServerConfig) => void
	onDelete: (name: string) => void
}

export function MCPServerCard({
	serverName,
	config,
	icon,
	variables,
	onUpdate,
	onDelete
}: MCPServerCardProps) {
	const [values, setValues] = useState<Record<string, string>>(() => {
		if (!variables) return {}
		const initialValues: Record<string, string> = {}
		for (const v of variables) {
			initialValues[v.name] = v.value
		}
		return initialValues
	})

	const handleVariableChange = (
		name: string,
		value: string,
		argIndex: number
	) => {
		setValues((prev) => ({ ...prev, [name]: value }))

		// Update parent immediately
		const newConfig = { ...config }
		if (variables) {
			for (const v of variables) {
				newConfig.args[v.argIndex] =
					v.name === name ? value : values[v.name]
			}
		}
		onUpdate(serverName, newConfig)
	}

	const handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation()
		onDelete(serverName)
	}

	return (
		<div className="join join-vertical w-full">
			<div className="collapse collapse-arrow join-item border border-base-300 bg-white p-4">
				<input type="checkbox" defaultChecked />
				<div className="collapse-title">
					<div className="flex items-center">
						<div className="flex items-center gap-2">
							{icon}
							<h3 className="text-lg font-sans font-semibold capitalize">
								{serverName}
							</h3>
						</div>
					</div>
				</div>
				<div className="collapse-content">
					{variables && (
						<div className="bg-base-200 rounded-lg p-4">
							<div className="space-y-4">
								{variables.map((variable) => (
									<div
										key={variable.name}
										className="form-control"
									>
										<label
											className="label"
											htmlFor={`${serverName}-${variable.name}`}
										>
											<span className="label-text">
												{variable.name}
											</span>
										</label>
										<input
											id={`${serverName}-${variable.name}`}
											type="text"
											value={values[variable.name]}
											onChange={(e) =>
												handleVariableChange(
													variable.name,
													e.target.value,
													variable.argIndex
												)
											}
											className="input input-bordered w-full"
											placeholder={`Enter ${capitalizeFirstLetter(serverName)} ${variable.name}`}
										/>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
				<div className="flex gap-2 mb-4 ml-4">
					<button
						type="button"
						onClick={handleDelete}
						className="btn btn-sm bg-red-100 hover:bg-red-200"
					>
						<Trash2 className="w-4 h-4" />
						<span className="ml-2">Delete</span>
					</button>
				</div>
			</div>
		</div>
	)
}
