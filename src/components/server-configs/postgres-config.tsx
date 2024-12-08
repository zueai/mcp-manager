import { useState } from "react"

type PostgresConfigProps = {
	initialUrl: string
	onUpdate: (url: string) => void
}

export function PostgresConfig({ initialUrl, onUpdate }: PostgresConfigProps) {
	const [postgresUrl, setPostgresUrl] = useState(initialUrl)

	const handlePostgresUrlChange = (value: string) => {
		setPostgresUrl(value)
	}

	const handlePostgresUrlBlur = () => {
		onUpdate(postgresUrl)
	}

	return (
		<div className="bg-base-200 rounded-xl p-4 mb-4 space-y-4">
			<div className="form-control">
				<label htmlFor="postgres-url" className="label">
					<span className="label-text mb-2">
						PostgreSQL Connection URL
					</span>
				</label>
				<input
					id="postgres-url"
					type="text"
					placeholder="postgresql://localhost/mydb"
					className="input input-bordered w-full"
					value={postgresUrl}
					onChange={(e) => handlePostgresUrlChange(e.target.value)}
					onBlur={handlePostgresUrlBlur}
				/>
			</div>
		</div>
	)
}
