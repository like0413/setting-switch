import * as vscode from 'vscode'
import generateStatusBarItem from './generateStatusBarItem'
import registerCommand from './registerCommand'
import watchConfigChange from './watchConfigChange'
import { CONFIG_NAME_B, CONFIG_NAME_S } from './constants'

export function activate(context: vscode.ExtensionContext) {
  // 生成按钮
  const { statusBarMap_b, statusBarMap_s } = generateStatusBarItem({
    CONFIG_NAME_B,
    CONFIG_NAME_S,
  })
  // 注册命令
  registerCommand(context, {
    statusBarMap_b,
    statusBarMap_s,
  })
  // 监听配置变化
  watchConfigChange(context, {
    statusBarMap_b,
    statusBarMap_s,
  })
}

export function deactivate(context: vscode.ExtensionContext) {
  context.subscriptions.forEach((item) => {
    item.dispose()
  })
}
