import { Plus, X } from "lucide-react"
import { useState } from "react"

type FilesystemConfigProps = {
	initialPaths: string[]
	onUpdate: (paths: string[]) => void
}

export function FilesystemConfig({
	initialPaths,
	onUpdate
}: FilesystemConfigProps) {
	const [filesystemPaths, setFilesystemPaths] =
		useState<string[]>(initialPaths)

	const handleFilesystemPathChange = (value: string, index: number) => {
		const newPaths = [...filesystemPaths]
		newPaths[index] = value
		setFilesystemPaths(newPaths)
	}

	const handleFilesystemPathBlur = () => {
		onUpdate(filesystemPaths)
	}

	const handleAddPath = () => {
		const newPaths = [...filesystemPaths, ""]
		setFilesystemPaths(newPaths)
		onUpdate(newPaths)
	}

	const handleRemovePath = (index: number) => {
		const newPaths = filesystemPaths.filter((_, i) => i !== index)
		setFilesystemPaths(newPaths)
		onUpdate(newPaths)
	}

	return (
		<div className="bg-base-200 rounded-xl p-4 mb-4 space-y-4">
			<div className="space-y-4">
				{filesystemPaths.map((path, index) => (
					<div key={index} className="flex items-center gap-2">
						<div className="form-control flex-1">
							<label
								htmlFor={`filesystem-path-${index}`}
								className="label"
							>
								<span className="label-text mb-2">
									Allowed Directory Path{" "}
									{filesystemPaths.length > 1
										? index + 1
										: ""}
								</span>
							</label>
							<input
								id={`filesystem-path-${index}`}
								type="text"
								placeholder="Enter the directory path (e.g., /Users/username/Documents)"
								className="input input-bordered w-full"
								value={path}
								onChange={(e) =>
									handleFilesystemPathChange(
										e.target.value,
										index
									)
								}
								onBlur={handleFilesystemPathBlur}
							/>
						</div>
						{filesystemPaths.length > 1 && (
							<button
								type="button"
								className="btn btn-ghost btn-sm mt-8"
								onClick={() => handleRemovePath(index)}
							>
								<X className="w-4 h-4" />
							</button>
						)}
					</div>
				))}
				<button
					type="button"
					className="btn btn-ghost btn-sm"
					onClick={handleAddPath}
				>
					<Plus className="w-4 h-4" />
					<span>Add Another Path</span>
				</button>
			</div>
		</div>
	)
}
