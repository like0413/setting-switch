import * as vscode from 'vscode'
import generateStatusBarItem from './generateStatusBarItem'
import registerCommand from './registerCommand'
import getExtensionConfig from './helpers/getExtensionConfig'
import generateBtnText from './helpers/generateBtnText'
import getTooltip from './helpers/getTooltip'
import { CONFIG_NAME_B, CONFIG_NAME_S } from './constants'

function watchConfigChange_b(context: vscode.ExtensionContext, statusBarMap: any) {
  let oldConfig = {} as any
  oldConfig = getExtensionConfig(CONFIG_NAME_B)

  let oldStatusBarMap = statusBarMap

  vscode.workspace.onDidChangeConfiguration(() => {
    // 用户更改定义的配置项
    Object.keys(oldStatusBarMap).forEach((key) => {
      oldStatusBarMap[key].text = generateBtnText(key)
    })

    const newConfig = getExtensionConfig(CONFIG_NAME_B)
    if (JSON.stringify(oldConfig) === JSON.stringify(newConfig)) {
      return
    }

    // 清除按钮
    Object.keys(oldStatusBarMap).forEach((key) => {
      oldStatusBarMap[key].hide()
      oldStatusBarMap[key].dispose()
      oldStatusBarMap[key] = null
    })

    // 重新生成按钮
    const newStatusBarMap = generateStatusBarItem()
    oldStatusBarMap = newStatusBarMap
    oldConfig = newConfig
    registerCommand(context, {
      statusBarMap_b: newStatusBarMap,
    })
  })
}

function watchConfigChange_s(context: vscode.ExtensionContext, statusBarMap: any) {
  let oldConfig = {} as any
  oldConfig = getExtensionConfig(CONFIG_NAME_S)

  let oldStatusBarMap = statusBarMap

  vscode.workspace.onDidChangeConfiguration(() => {
    // 用户更改定义的配置项
    Object.keys(oldStatusBarMap).forEach((key) => {
      const item = oldStatusBarMap[key].statusBarItem
      item.tooltip = getTooltip(oldStatusBarMap[key].config.key)
    })

    const newConfig = getExtensionConfig(CONFIG_NAME_S)
    if (JSON.stringify(oldConfig) === JSON.stringify(newConfig)) {
      return
    }

    // 清除按钮
    Object.keys(oldStatusBarMap).forEach((key) => {
      const item = oldStatusBarMap[key].statusBarItem

      item[key].hide()
      item[key].dispose()
      item[key] = null
    })

    // 重新生成按钮
    const newStatusBarMap = generateStatusBarItem()
    oldStatusBarMap = newStatusBarMap
    oldConfig = newConfig
    registerCommand(context, {
      statusBarMap_s: newStatusBarMap,
    })
  })
}

function watchConfigChange(context: vscode.ExtensionContext, { statusBarMap_b, statusBarMap_s } = {} as any) {
  watchConfigChange_b(context, statusBarMap_b)
  watchConfigChange_s(context, statusBarMap_s)
}

export default watchConfigChange
