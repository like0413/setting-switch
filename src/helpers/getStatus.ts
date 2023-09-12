import * as vscode from 'vscode'
import getExtensionConfig from './getExtensionConfig'
import { CONFIG_NAME } from '../constants'

const getStatus = (key: string) => {
  const validConfig = getExtensionConfig(CONFIG_NAME)

  const configuration = vscode.workspace.getConfiguration()

  const firstSetting = validConfig[key].split(',')[0]

  return configuration.get(firstSetting, false)
}

export default getStatus
