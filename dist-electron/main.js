"use strict";
const electron = require("electron");
const path = require("node:path");
const fs = require("node:fs/promises");
const node_fs = require("node:fs");
const os = require("node:os");
const node_child_process = require("node:child_process");
const node_util = require("node:util");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const path__namespace = /* @__PURE__ */ _interopNamespaceDefault(path);
const fs__namespace = /* @__PURE__ */ _interopNamespaceDefault(fs);
const os__namespace = /* @__PURE__ */ _interopNamespaceDefault(os);
let mainWindow = null;
async function createWindow() {
  if (mainWindow) return;
  mainWindow = new electron.BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path__namespace.join(__dirname, "preload.js")
    }
  });
  const configPath = path__namespace.join(os__namespace.homedir(), "Library", "Application Support", "Claude", "claude_desktop_config.json");
  console.log("Config path:", configPath);
  try {
    const configExists = node_fs.existsSync(configPath);
    console.log("Config exists:", configExists);
    if (configExists) {
      const config = node_fs.readFileSync(configPath, "utf8");
      console.log("Config content:", config);
    }
  } catch (error) {
    console.error("Error checking config:", error);
  }
  if (process.env.VITE_DEV_SERVER_URL) {
    await mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile("dist/index.html");
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
electron.app.whenReady().then(createWindow);
electron.app.on("activate", () => {
  if (!mainWindow) {
    createWindow();
  }
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.ipcMain.handle("read-config", async () => {
  try {
    const configPath = path__namespace.join(os__namespace.homedir(), "Library", "Application Support", "Claude", "claude_desktop_config.json");
    console.log("Reading config from:", configPath);
    const exists = node_fs.existsSync(configPath);
    console.log("Config file exists:", exists);
    const data = await fs__namespace.readFile(configPath, "utf8");
    console.log("Config data:", data);
    const parsedData = JSON.parse(data);
    console.log("Parsed config:", parsedData);
    return parsedData;
  } catch (error) {
    console.error("Error reading config:", error);
    throw error;
  }
});
electron.ipcMain.handle("execute-command", async (_event, command) => {
  const execAsync = node_util.promisify(node_child_process.exec);
  try {
    const { stdout, stderr } = await execAsync(command);
    console.log("Command output:", stdout);
    if (stderr) console.error("Command stderr:", stderr);
    return { success: true, output: stdout };
  } catch (error) {
    console.error("Command error:", error);
    throw error;
  }
});
