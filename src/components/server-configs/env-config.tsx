import { useState } from "react"

type EnvConfigProps = {
	env: Record<string, string>
	initialValues: Record<string, string>
	onUpdate: (key: string, value: string) => void
}

export function EnvConfig({ env, initialValues, onUpdate }: EnvConfigProps) {
	const [envValues, setEnvValues] =
		useState<Record<string, string>>(initialValues)

	const handleEnvChange = (key: string, value: string) => {
		setEnvValues((prev) => ({ ...prev, [key]: value }))
		onUpdate(key, value)
	}

	return (
		<div className="bg-base-200 rounded-xl p-4 mb-4 space-y-4">
			<div className="space-y-2">
				{Object.entries(env).map(([key]) => (
					<div key={key} className="form-control">
						<label htmlFor={`env-${key}`} className="label">
							<span className="label-text mb-2">{key}</span>
						</label>
						<input
							id={`env-${key}`}
							type="text"
							placeholder={`Paste your ${key} here`}
							className="input input-bordered w-full"
							value={envValues[key] || ""}
							onChange={(e) =>
								handleEnvChange(key, e.target.value)
							}
						/>
					</div>
				))}
			</div>
		</div>
	)
}
