import { useState } from "react"

type SentryConfigProps = {
	initialToken: string
	onUpdate: (token: string) => void
}

export function SentryConfig({ initialToken, onUpdate }: SentryConfigProps) {
	const [authToken, setAuthToken] = useState(initialToken)

	const handleAuthTokenChange = (value: string) => {
		setAuthToken(value)
	}

	const handleAuthTokenBlur = () => {
		onUpdate(authToken)
	}

	return (
		<div className="bg-base-200 rounded-xl p-4 mb-4 space-y-4">
			<div className="form-control">
				<label htmlFor="sentry-token" className="label">
					<span className="label-text mb-2">
						Sentry Authentication Token
					</span>
				</label>
				<input
					id="sentry-token"
					type="text"
					placeholder="your-auth-token"
					className="input input-bordered w-full"
					value={authToken}
					onChange={(e) => handleAuthTokenChange(e.target.value)}
					onBlur={handleAuthTokenBlur}
				/>
			</div>
		</div>
	)
}
