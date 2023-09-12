import * as vscode from 'vscode'
import generateStatusBarItem from './generateStatusBarItem'
import registerCommand from './registerCommand'
import getExtensionConfig from './helpers/getExtensionConfig'
import generateBtnText from './helpers/generateBtnText'
import { CONFIG_NAME } from './constants'

function watchConfigChange(context: vscode.ExtensionContext, statusBarMap: any) {
  let oldConfig = {} as any
  oldConfig = getExtensionConfig(CONFIG_NAME)

  let oldStatusBarMap = statusBarMap

  vscode.workspace.onDidChangeConfiguration(() => {
    // 用户更改定义的配置项
    Object.keys(oldStatusBarMap).forEach((key) => {
      oldStatusBarMap[key].text = generateBtnText(key)
    })

    const newConfig = getExtensionConfig(CONFIG_NAME)
    if (JSON.stringify(oldConfig) === JSON.stringify(newConfig)) {
      return
    }

    // 清除按钮
    Object.keys(oldStatusBarMap).forEach((key) => {
      oldStatusBarMap[key].hide()
      oldStatusBarMap[key].dispose()
      oldStatusBarMap[key] = null
    })
    context.subscriptions.forEach((item) => {
      item.dispose()
    })

    // 重新生成按钮
    const newStatusBarMap = generateStatusBarItem()
    oldStatusBarMap = newStatusBarMap
    oldConfig = newConfig
    registerCommand(context, newStatusBarMap)
  })
}

export default watchConfigChange
