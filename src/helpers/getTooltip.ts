import * as vscode from 'vscode'

export default (key: string): string => vscode.workspace.getConfiguration().get(key, '')
