import * as vscode from 'vscode'
// import defaultCfg from '../defaultCfg'

function getExtensionConfig(extensionName: string) {
  const config = vscode.workspace.getConfiguration()
  const extensionConfig = config.get<ConfigObj>(extensionName, {})

  // 获取有效配置
  const validConfig: ConfigObj = {}
  Object.keys(extensionConfig).filter((key) => {
    const value = extensionConfig[key]
    if (typeof value === 'string' && /^[a-zA-Z,\.]+$/.test(value)) { // TODO: 校验较简单，后续优化
      validConfig[key] = value
    }
  })

  return validConfig
}

export default getExtensionConfig
