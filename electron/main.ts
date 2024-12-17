import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from 'electron'
import * as path from 'node:path'
import * as fs from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'
import * as os from 'node:os'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'

let mainWindow: BrowserWindow | null = null

async function createWindow() {
    if (mainWindow) return
    
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    const configPath = path.join(os.homedir(), 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json')
    console.log('Config path:', configPath)
    try {
        const configExists = existsSync(configPath)
        console.log('Config exists:', configExists)
        if (configExists) {
            const config = readFileSync(configPath, 'utf8')
            console.log('Config content:', config)
        }
    } catch (error) {
        console.error('Error checking config:', error)
    }

    if (process.env.VITE_DEV_SERVER_URL) {
        await mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
    } else {
        mainWindow.loadFile('dist/index.html')
    }

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.whenReady().then(createWindow)

app.on('activate', () => {
    if (!mainWindow) {
        createWindow()
    }
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipcMain.handle('read-config', async () => {
    try {
        const configPath = path.join(os.homedir(), 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json')
        console.log('Reading config from:', configPath)
        
        const exists = existsSync(configPath)
        console.log('Config file exists:', exists)
        
        const data = await fs.readFile(configPath, 'utf8')
        console.log('Config data:', data)
        
        const parsedData = JSON.parse(data)
        console.log('Parsed config:', parsedData)
        
        return parsedData
    } catch (error) {
        console.error('Error reading config:', error)
        throw error
    }
})

ipcMain.handle('execute-command', async (_event: IpcMainInvokeEvent, command: string) => {
    const execAsync = promisify(exec)
    try {
        const { stdout, stderr } = await execAsync(command)
        console.log('Command output:', stdout)
        if (stderr) console.error('Command stderr:', stderr)
        return { success: true, output: stdout }
    } catch (error) {
        console.error('Command error:', error)
        throw error
    }
})