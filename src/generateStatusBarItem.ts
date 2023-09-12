import * as vscode from 'vscode'
import getExtensionConfig from './helpers/getExtensionConfig'
import generateBtnText from './helpers/generateBtnText'
import { CONFIG_NAME, EXTENSION_NAME } from './constants'

function generateStatusBarItem() {
  const validConfig = getExtensionConfig(CONFIG_NAME)

  const statusBarMap = {} as any

  Object.keys(validConfig).forEach((key) => {
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, -2)
    statusBarItem.command = `${EXTENSION_NAME}.${key}`
    statusBarItem.text = generateBtnText(key)
    statusBarItem.show()
    statusBarMap[key] = statusBarItem
  })

  // 返回按钮 map
  return statusBarMap
}

export default generateStatusBarItem
