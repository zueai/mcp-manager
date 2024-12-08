import { CheckCircle2, Copy, Save, Upload, XCircle } from "lucide-react"
import type React from "react"
import { useState } from "react"

function App() {
	const configPath =
		"~/Library/Application Support/Claude/claude_desktop_config.json"
	const [jsonContent, setJsonContent] = useState<Record<string, unknown>>({})
	const [isLoading, setIsLoading] = useState(false)
	const [uploadStatus, setUploadStatus] = useState<
		"idle" | "success" | "error"
	>("idle")
	const [hasCopied, setHasCopied] = useState(false)

	const handleCopyPath = () => {
		navigator.clipboard.writeText(configPath)
		setHasCopied(true)
		setTimeout(() => {
			setHasCopied(false)
		}, 2000) // Reset after 2 seconds
	}

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			setIsLoading(true)
			setUploadStatus("idle")
			const reader = new FileReader()
			reader.onload = (e) => {
				try {
					const content = JSON.parse(e.target?.result as string)
					setJsonContent(content)
					setUploadStatus("success")
				} catch (error) {
					console.error("Error parsing JSON:", error)
					setUploadStatus("error")
				} finally {
					setIsLoading(false)
				}
			}
			reader.readAsText(file)
		}
	}

	const handleSaveAs = async () => {
		try {
			const jsonString = JSON.stringify(jsonContent, null, 2)
			const blob = new Blob([jsonString], { type: "application/json" })
			const url = window.URL.createObjectURL(blob)
			const link = document.createElement("a")
			link.href = url
			link.download = "claude_desktop_config.json"
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
			window.URL.revokeObjectURL(url)
		} catch (error) {
			console.error("Error saving file:", error)
		}
	}

	return (
		<div className="container mx-auto p-4 max-w-3xl">
			<h1 className="text-3xl font-bold text-center mb-8">
				Claude Desktop Config Manager
			</h1>

			<div className="space-y-6">
				<div className="prose">
					<h2 className="text-xl font-semibold mb-4">How to use:</h2>

					<div className="space-y-6">
						<div>
							<h3 className="text-lg font-medium mb-2">
								Step 1: Click the Copy button below.
							</h3>
							<div className="bg-base-200 rounded-lg p-4 mb-4">
								<p className="font-mono text-sm mb-2">
									{configPath}
								</p>
								<button
									type="button"
									onClick={handleCopyPath}
									className="btn btn-primary btn-sm"
								>
									{hasCopied ? (
										<CheckCircle2 className="w-4 h-4" />
									) : (
										<Copy className="w-4 h-4" />
									)}
									<span className="ml-2">
										{hasCopied ? "Copied!" : "Copy Path"}
									</span>
								</button>
							</div>
						</div>

						<div className="space-y-6">
							<h3 className="text-lg font-medium mb-2">
								Step 2: Upload Config File
							</h3>
							<p>
								1) Click Choose File
								<br />
								2) Press <kbd className="kbd kbd-sm">⌘</kbd> +{" "}
								<kbd className="kbd kbd-sm">⇧</kbd> +{" "}
								<kbd className="kbd kbd-sm">G</kbd> in Finder to
								open the "Go to Folder" dialog.
								<br />
								3) Paste the path you just copied to select the
								config file.
								<br />
								4) Select the config file and click Open to
								upload it.
							</p>
							<div className="form-control w-full max-w-md mb-2">
								<input
									type="file"
									accept=".json"
									onChange={handleFileUpload}
									className="file-input file-input-bordered w-full"
								/>
								{isLoading && (
									<div className="mt-2 flex items-center text-base-content">
										<span className="loading loading-spinner loading-md" />
										<span className="ml-2">
											Loading file...
										</span>
									</div>
								)}
								{uploadStatus === "success" && (
									<div className="mt-2 flex items-center text-success">
										<CheckCircle2 className="w-5 h-5" />
										<span className="ml-2">
											File loaded successfully.
										</span>
									</div>
								)}
								{uploadStatus === "error" && (
									<div className="mt-2 flex items-center text-error">
										<XCircle className="w-5 h-5" />
										<span className="ml-2">
											Error loading file. Please ensure
											it's a valid JSON file.
										</span>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

				{Object.keys(jsonContent).length > 0 && (
					<div className="bg-base-200 rounded-lg p-4">
						<div className="flex justify-end mb-2">
							<button
								type="button"
								onClick={handleSaveAs}
								className="btn btn-primary btn-sm"
							>
								<Save className="w-4 h-4" />
								<span className="ml-2">Save As</span>
							</button>
						</div>
						<pre className="whitespace-pre-wrap font-mono text-sm">
							{JSON.stringify(jsonContent, null, 2)}
						</pre>
					</div>
				)}
			</div>
		</div>
	)
}

export default App
