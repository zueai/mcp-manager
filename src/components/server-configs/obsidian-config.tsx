import { useState } from "react"

type ObsidianConfigProps = {
	initialPath: string
	onUpdate: (path: string) => void
}

export function ObsidianConfig({ initialPath, onUpdate }: ObsidianConfigProps) {
	const [vaultPath, setVaultPath] = useState(initialPath)

	const handleVaultPathChange = (value: string) => {
		setVaultPath(value)
	}

	const handleVaultPathBlur = () => {
		onUpdate(vaultPath)
	}

	return (
		<div className="bg-base-200 rounded-xl p-4 mb-4 space-y-4">
			<div className="form-control">
				<label htmlFor="vault-path" className="label">
					<span className="label-text mb-2">Obsidian Vault Path</span>
				</label>
				<input
					id="vault-path"
					type="text"
					placeholder="Path to your Obsidian vault, e.g. /Users/yourname/Documents/MyVault"
					className="input input-bordered w-full"
					value={vaultPath}
					onChange={(e) => handleVaultPathChange(e.target.value)}
					onBlur={handleVaultPathBlur}
				/>
			</div>
		</div>
	)
}
