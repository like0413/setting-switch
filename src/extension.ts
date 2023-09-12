import * as vscode from 'vscode'
import generateStatusBarItem from './generateStatusBarItem'
import registerCommand from './registerCommand'
import watchConfigChange from './watchConfigChange'

export function activate(context: vscode.ExtensionContext) {
  // 生成按钮
  const statusBarMap = generateStatusBarItem()
  // 注册命令
  registerCommand(context, statusBarMap)
  // 监听配置变化
  watchConfigChange(context, statusBarMap)
}

export function deactivate() {}
