import * as vscode from 'vscode'
import getStatus from './getStatus'

const ENABLED_TEXT = ': $(check)'
const DISABLED_TEXT = ': $(x)'

function generateBtnText(key: string) {
  return getStatus(key) ? key + ENABLED_TEXT : key + DISABLED_TEXT
}

export default generateBtnText
