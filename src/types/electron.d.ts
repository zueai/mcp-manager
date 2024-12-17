interface ConfigData {
	mcpServers: {
		[key: string]: {
			command: string
			args: string[]
			env?: Record<string, string>
		}
	}
}

export interface IElectronAPI {
	executeCommand: (
		command: string
	) => Promise<{ success: boolean; output: string }>
	readConfig: () => Promise<ConfigData>
}

declare global {
	interface Window {
		electron: IElectronAPI
	}
}
