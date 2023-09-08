import * as vscode from 'vscode'
import getUserConfig from './getUserConfig'
import { CONFIG_NAME } from '../constants'

const getStatus = (key: string) => {
  const validConfig = getUserConfig(CONFIG_NAME)

  const configuration = vscode.workspace.getConfiguration()

  const firstSetting = validConfig[key].split(',')[0]

  return configuration.get(firstSetting, false)
}

export default getStatus
