import * as vscode from 'vscode'
import getStatus from './helpers/getStatus'
import generateBtnText from './helpers/generateBtnText'
import getExtensionConfig from './helpers/getExtensionConfig'
import { CONFIG_NAME } from './constants'

function registerCommand(context: vscode.ExtensionContext, statusBarMap: any) {
  const validConfig = getExtensionConfig(CONFIG_NAME)

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

export default registerCommand
