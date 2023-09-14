import * as vscode from 'vscode'
import generateStatusBarItem from './generateStatusBarItem'
import registerCommand from './registerCommand'
import watchConfigChange from './watchConfigChange'

export function activate(context: vscode.ExtensionContext) {
  // 生成按钮
  const { statusBarMap_b, statusBarMap_s } = generateStatusBarItem()
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
