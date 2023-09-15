import * as vscode from 'vscode'
import getExtensionConfig from './helpers/getExtensionConfig'
import generateBtnText from './helpers/generateBtnText'
import getTooltip from './helpers/getTooltip'
import { CONFIG_NAME_B, CONFIG_NAME_S, COMMAND_PREFIX } from './constants'

// 生成 boolean 配置类型的按钮
function generateStatusBarItem_b() {
  const statusBarMap = {} as any

  const validConfig: BoolConfig = getExtensionConfig(CONFIG_NAME_B)

  Object.keys(validConfig).forEach((key) => {
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, -2)
    statusBarItem.command = `${COMMAND_PREFIX}.${key}`
    statusBarItem.text = generateBtnText(key)
    statusBarItem.show()
    statusBarMap[key] = statusBarItem
  })

  return statusBarMap
}

// 生成 string 配置类型的按钮
function generateStatusBarItem_s() {
  const statusBarMap = {} as any

  const validConfig: StringConfig = getExtensionConfig(CONFIG_NAME_S)

  validConfig.forEach((item) => {
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, -2)
    statusBarItem.command = `${COMMAND_PREFIX}.${item.text}`
    statusBarItem.text = item.text
    statusBarItem.tooltip = getTooltip(item.key)
    statusBarItem.show()
    statusBarMap[item.text] = {
      statusBarItem,
      config: item,
    }
  })

  return statusBarMap
}

function generateStatusBarItem({ CONFIG_NAME_B, CONFIG_NAME_S }: any) {
  const statusBarMap_b = CONFIG_NAME_B && generateStatusBarItem_b()

  const statusBarMap_s = CONFIG_NAME_S && generateStatusBarItem_s()

  return { statusBarMap_b, statusBarMap_s }
}

export default generateStatusBarItem
