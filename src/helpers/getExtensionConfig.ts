import * as vscode from 'vscode'
import { CONFIG_NAME_B, CONFIG_NAME_S } from '../constants'
import Ajv from 'ajv'
const ajv = new Ajv()

const schema_b = {
  type: 'object',
  additionalProperties: {
    type: 'string',
    pattern: '^[.,a-zA-Z]+$',
  },
}

const schema_s = {
  type: 'array',
  uniqueItems: true,
  items: {
    type: 'object',
    properties: {
      text: {
        type: 'string',
      },
      key: {
        type: 'string',
      },
      value: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
    required: ['text', 'key', 'value'],
  },
}

const validate_b = ajv.compile(schema_b)
const validate_s = ajv.compile(schema_s)

// 获取 boolean 类型的配置
function getExtensionConfig_b(configName: string) {
  const extConfig = vscode.workspace.getConfiguration().get<BoolConfig>(configName, {})
  return validate_b(extConfig) ? extConfig : {}
}

// 获取 string 类型的配置
function getExtensionConfig_s(configName: string) {
  const extConfig = vscode.workspace.getConfiguration().get<StringConfig>(configName, [])
  return validate_s(extConfig) ? extConfig : []
}

function getExtensionConfig(configName: string): any {
  if (configName === CONFIG_NAME_B) {
    return getExtensionConfig_b(configName)
  } else if (configName === CONFIG_NAME_S) {
    return getExtensionConfig_s(configName)
  } else {
    return {}
  }
}

export default getExtensionConfig
