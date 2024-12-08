import { useState } from "react"

type SQLiteConfigProps = {
	initialPath: string
	onUpdate: (dbPath: string) => void
}

export function SQLiteConfig({ initialPath, onUpdate }: SQLiteConfigProps) {
	const [dbPath, setDbPath] = useState(initialPath)

	const handleDbPathChange = (value: string) => {
		setDbPath(value)
	}

	const handleDbPathBlur = () => {
		onUpdate(dbPath)
	}

	return (
		<div className="bg-base-200 rounded-xl p-4 mb-4 space-y-4">
			<div className="form-control">
				<label htmlFor="sqlite-path" className="label">
					<span className="label-text mb-2">
						SQLite Database Path
					</span>
				</label>
				<input
					id="sqlite-path"
					type="text"
					placeholder="~/my-database.db"
					className="input input-bordered w-full"
					value={dbPath}
					onChange={(e) => handleDbPathChange(e.target.value)}
					onBlur={handleDbPathBlur}
				/>
			</div>
		</div>
	)
}
