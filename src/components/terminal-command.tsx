import { Check, Copy } from "lucide-react"
import { useState } from "react"

interface TerminalCommandProps {
	command: string
	className?: string
}

export function TerminalCommand({
	command,
	className = ""
}: TerminalCommandProps) {
	const [hasCopied, setHasCopied] = useState(false)

	const handleCopy = () => {
		navigator.clipboard.writeText(command)
		setHasCopied(true)
		setTimeout(() => setHasCopied(false), 2000)
	}

	return (
		<div className={`bg-base-300 rounded-xl p-4 mb-4 ${className}`}>
			<p className="font-mono text-sm mb-4 break-all">{command}</p>
			<button
				type="button"
				onClick={handleCopy}
				className="btn btn-primary btn-sm"
			>
				{hasCopied ? (
					<Check className="w-4 h-4" />
				) : (
					<Copy className="w-4 h-4" />
				)}
				<span className="ml-2">
					{hasCopied ? "Copied!" : "Copy Command"}
				</span>
			</button>
		</div>
	)
}
