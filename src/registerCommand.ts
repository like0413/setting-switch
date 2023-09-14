import * as vscode from 'vscode'
import getStatus from './helpers/getStatus'
import generateBtnText from './helpers/generateBtnText'
import getExtensionConfig from './helpers/getExtensionConfig'
import { CONFIG_NAME_B, CONFIG_NAME_S } from './constants'

function registerCommand_b(context: vscode.ExtensionContext, statusBarMap: any) {
  const validConfig = getExtensionConfig(CONFIG_NAME_B)

  Object.keys(validConfig).forEach((key) => {
    const settings = validConfig[key].split(',')
    const statusBarItem = statusBarMap[key]

    let disposable = vscode.commands.registerCommand(statusBarItem.command, () => {
      const isActivated = getStatus(key)
      const configuration = vscode.workspace.getConfiguration()

      settings.forEach((setting: string) => {
        configuration.update(setting, !isActivated, vscode.ConfigurationTarget.Global).then(() => {
          statusBarItem.text = generateBtnText(key)
        })
      })
    })

    context.subscriptions.push(disposable)
  })
}

function registerCommand_s(context: vscode.ExtensionContext, statusBarMap: any) {
  const validConfig: StringConfig = getExtensionConfig(CONFIG_NAME_S)
  const configuration = vscode.workspace.getConfiguration()

  validConfig.forEach((item) => {
    const { statusBarItem, config } = statusBarMap[item.text]

    let disposable = vscode.commands.registerCommand(statusBarItem.command, () => {
      vscode.window.showQuickPick(config.value).then((selectedOption) => {
        if (selectedOption) {
          configuration.update(config.key, selectedOption, vscode.ConfigurationTarget.Global)
          statusBarItem.tooltip = selectedOption
        }
      })
    })

    context.subscriptions.push(disposable)
  })
}

function registerCommand(context: vscode.ExtensionContext, { statusBarMap_b = {}, statusBarMap_s = {} }) {
  registerCommand_b(context, statusBarMap_b)
  registerCommand_s(context, statusBarMap_s)
}

export default registerCommand
