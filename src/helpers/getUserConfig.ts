import * as vscode from 'vscode'

function getUserConfig(configName: string) {
  const config = vscode.workspace.getConfiguration()
  const userConfig = config.get<ConfigObj>(configName, {})

  // 获取有效配置
  const validConfig: ConfigObj = {}
  Object.keys(userConfig).filter((key) => {
    const value = userConfig[key]
    if (typeof value === 'string' && /^[a-zA-Z,\.]+$/.test(value)) {
      validConfig[key] = value
    }
  })

  return validConfig
}

export default getUserConfig
