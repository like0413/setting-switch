import * as vscode from 'vscode'
import getUserConfig from './helpers/getUserConfig'
import generateBtnText from './helpers/generateBtnText'
import getStatus from './helpers/getStatus'
import { CONFIG_NAME, EXTENSION_NAME } from './constants'

export function activate(context: vscode.ExtensionContext) {
  const validConfig = getUserConfig(CONFIG_NAME)

  const statusBarMap = {} as any

  Object.keys(validConfig).forEach((key) => {
    const settings = validConfig[key].split(',')

    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, -2)
    statusBarItem.command = `${EXTENSION_NAME}.${key}`
    statusBarItem.text = generateBtnText(key)
    statusBarItem.show()
    statusBarMap[key] = statusBarItem

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

  vscode.workspace.onDidChangeConfiguration(() => {
    Object.keys(validConfig).forEach((key) => {
      statusBarMap[key].text = generateBtnText(key)
    })
  })
}
