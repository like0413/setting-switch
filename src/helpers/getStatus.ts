import * as vscode from 'vscode'
import getExtensionConfig from './getExtensionConfig'
import { CONFIG_NAME_B } from '../constants'

const getStatus = (key: string) => {
  const validConfig = getExtensionConfig(CONFIG_NAME_B)

  const configuration = vscode.workspace.getConfiguration()

  const firstSetting = validConfig[key].split(',')[0]

  return configuration.get(firstSetting, false)
}

export default getStatus
