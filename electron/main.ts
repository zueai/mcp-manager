import { exec } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import * as fs from "node:fs/promises"
import * as os from "node:os"
import * as path from "node:path"
import { promisify } from "node:util"
import { BrowserWindow, type IpcMainInvokeEvent, app, ipcMain } from "electron"
import { protocol } from "electron"

let mainWindow: BrowserWindow | null = null

async function createWindow() {
	if (mainWindow) return

	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.join(__dirname, "preload.js"),
			webSecurity: false // Allow loading local images
		}
	})

	if (process.platform === "darwin") {
		app.commandLine.appendSwitch("js-flags", "--max-old-space-size=4096")
	}

	const configPath = path.join(
		os.homedir(),
		"Library",
		"Application Support",
		"Claude",
		"claude_desktop_config.json"
	)
	console.log("Config path:", configPath)
	try {
		const configExists = existsSync(configPath)
		console.log("Config exists:", configExists)
		if (configExists) {
			const config = readFileSync(configPath, "utf8")
			console.log("Config content:", config)
		}
	} catch (error) {
		console.error("Error checking config:", error)
	}

	if (process.env.VITE_DEV_SERVER_URL) {
		await mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
	} else {
		mainWindow.loadFile("dist/index.html")
	}

	mainWindow.on("closed", () => {
		mainWindow = null
	})

	mainWindow.on("hide", () => {
		if (process.platform === "darwin") {
			app.dock.hide()
		}
	})
}

app.whenReady().then(() => {
	protocol.registerFileProtocol("app", (request, callback) => {
		const url = request.url.slice("app://".length)
		callback({ path: path.join(__dirname, url) })
	})
	createWindow()
})

app.on("activate", () => {
	if (!mainWindow) {
		createWindow()
	}
})

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit()
	}
})

ipcMain.handle("read-config", async () => {
	try {
		const configPath = path.join(
			os.homedir(),
			"Library",
			"Application Support",
			"Claude",
			"claude_desktop_config.json"
		)
		console.log("Reading config from:", configPath)

		const exists = existsSync(configPath)
		console.log("Config file exists:", exists)

		const data = await fs.readFile(configPath, "utf8")
		console.log("Config data:", data)

		const parsedData = JSON.parse(data)
		console.log("Parsed config:", parsedData)
		return parsedData
	} catch (error) {
		console.error("Error reading config:", error)
		return { success: false, error }
	}
})

ipcMain.handle(
	"execute-command",
	async (_event: IpcMainInvokeEvent, command: string) => {
		const execAsync = promisify(exec)
		try {
			const { stdout, stderr } = await execAsync(command)
			console.log("Command output:", stdout)
			if (stderr) {
				console.error("Command stderr:", stderr)
			}
			return { success: true, output: stdout }
		} catch (error) {
			console.error("Command error:", error)
			return { success: false, error }
		}
	}
)
