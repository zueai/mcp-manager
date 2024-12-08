import { CheckCircle2, Copy, Save, Upload, XCircle } from "lucide-react"
import type React from "react"
import { useState } from "react"
import { MCPServers } from "./mcp-servers"

function App() {
	const [jsonContent, setJsonContent] = useState<Record<string, unknown>>({})
	const [isLoading, setIsLoading] = useState(false)
	const [uploadStatus, setUploadStatus] = useState<
		"idle" | "success" | "error"
	>("idle")
	const [hasCopied, setHasCopied] = useState(false)
	const [hasCopiedSave, setHasCopiedSave] = useState(false)
	const [isInstructionsOpen, setIsInstructionsOpen] = useState(true)

	const command =
		"test -f ~/Library/Application\\ Support/Claude/claude_desktop_config.json && pbcopy < ~/Library/Application\\ Support/Claude/claude_desktop_config.json || (echo '{\\n  \"mcpServers\": {}\\n}' | tee ~/Library/Application\\ Support/Claude/claude_desktop_config.json | pbcopy)"
	const handleCopyCommand = () => {
		navigator.clipboard.writeText(command)
		setHasCopied(true)
		setTimeout(() => setHasCopied(false), 2000) // Reset after 2 seconds
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

	const handleSaveCommand = () => {
		try {
			const jsonString = JSON.stringify(jsonContent, null, 2)
			// Escape quotes and newlines for shell command
			const escapedJson = jsonString
				.replace(/"/g, '\\"')
				.replace(/\n/g, "\\n")
			const saveCommand = `echo "${escapedJson}" > ~/Library/Application\\ Support/Claude/claude_desktop_config.json`

			navigator.clipboard.writeText(saveCommand)
			setHasCopiedSave(true)
			setTimeout(() => setHasCopiedSave(false), 2000)
		} catch (error) {
			console.error("Error generating save command:", error)
		}
	}

	const handleJsonInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		try {
			const content = JSON.parse(e.target.value)
			setJsonContent(content)
			setUploadStatus("success")
			setIsInstructionsOpen(false) // Close accordion on successful upload
		} catch (error) {
			console.error("Error parsing JSON:", error)
			setUploadStatus("error")
		}
	}

	return (
		<main className="bg-[#f2f1e9] min-h-screen">
			<div className="container mx-auto p-4 max-w-3xl">
				<h1 className="text-3xl text-center m-8">
					MCP Manager for Claude Desktop
				</h1>

				<div className="space-y-6">
					<div className="join join-vertical w-full">
						<div className="collapse collapse-arrow join-item border border-base-300 bg-white">
							<input
								type="checkbox"
								checked={isInstructionsOpen}
								onChange={(e) =>
									setIsInstructionsOpen(e.target.checked)
								}
							/>
							<h2 className="collapse-title text-xl ">
								Instructions to load your config file (MacOS)
							</h2>
							<div className="collapse-content">
								<div className="prose">
									<div className="space-y-6">
										<div className="bg-base-200 rounded-lg p-4">
											<div>
												<h3 className="text-md font-tiempos-regular mb-4">
													Step 1: Run this command in
													Terminal to copy your config
													file to your clipboard
												</h3>
												<div className="bg-base-300 rounded-lg p-4 mb-4">
													<p className="font-mono text-sm mb-4 break-all">
														{command}
													</p>
													<button
														type="button"
														onClick={
															handleCopyCommand
														}
														className="btn btn-primary btn-sm"
													>
														{hasCopied ? (
															<CheckCircle2 className="w-4 h-4" />
														) : (
															<Copy className="w-4 h-4" />
														)}
														<span className="ml-2">
															{hasCopied
																? "Copied!"
																: "Copy Command"}
														</span>
													</button>
												</div>
											</div>
										</div>

										<div className="bg-base-200 rounded-lg p-4">
											<div>
												<h3 className="text-lg font-tiempos-regular mb-4">
													Step 2: Paste the copied
													content below.
												</h3>
												<p className="text-sm mb-4">
													This data is stored locally
													(client-side on your
													browser) and never leaves
													your computer.
												</p>
												<textarea
													className="textarea textarea-bordered w-full h-16 font-mono"
													placeholder="Paste the copied JSON content here..."
													onChange={handleJsonInput}
												/>
												{uploadStatus === "success" && (
													<div className="mt-2 flex items-center text-success">
														<CheckCircle2 className="w-5 h-5" />
														<span className="ml-2">
															Uploaded
															successfully.
														</span>
													</div>
												)}
												{uploadStatus === "error" && (
													<div className="mt-2 flex items-center text-error">
														<XCircle className="w-5 h-5" />
														<span className="ml-2">
															Error: Please ensure
															the content is valid
															JSON.
														</span>
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{Object.keys(jsonContent).length > 0 && (
						<div className="space-y-6">
							<MCPServers
								jsonContent={
									jsonContent as {
										mcpServers: Record<
											string,
											{ command: string; args: string[] }
										>
									}
								}
								onUpdate={setJsonContent}
							/>

							<div className="join join-vertical w-full">
								<div className="collapse collapse-arrow join-item border border-base-300 bg-white">
									<input type="checkbox" />
									<h2 className="collapse-title text-xl font-tiempos-regular">
										Save your changes
									</h2>
									<div className="collapse-content">
										<div className="bg-base-200 rounded-lg p-4">
											<div className="space-y-4">
												<div>
													<h3 className="text-lg font-tiempos-regular mb-4">
														Run this command in
														Terminal to save your
														changes to the config
														file
													</h3>
													<div className="bg-base-300 rounded-lg p-4 mb-4">
														<p className="font-mono text-sm mb-4 break-all">
															{`echo "${JSON.stringify(jsonContent, null, 2).replace(/"/g, '\\"').replace(/\n/g, "\\n")}" > ~/Library/Application\\ Support/Claude/claude_desktop_config.json`}
														</p>
														<button
															type="button"
															onClick={
																handleSaveCommand
															}
															className="btn btn-primary btn-sm"
														>
															{hasCopiedSave ? (
																<CheckCircle2 className="w-4 h-4" />
															) : (
																<Save className="w-4 h-4" />
															)}
															<span className="ml-2">
																{hasCopiedSave
																	? "Copied!"
																	: "Copy Command"}
															</span>
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</main>
	)
}

export default App
