# Setting Switch

## 简介

有时我们需要经常改变系统或扩展的设置，经常打开`设置`、`扩展设置`就比较繁琐，这个扩展可以自定义配置项，将其固定在状态栏，从而一键切换。

## 示例

值为 boolean 的配置。`key` 是按钮文案，`value` 是要切换的配置项。注意：只能是值为 boolean 的配置项。

```json
{
  "settingSwitch.boolean": {
    "Eslint": "eslint.enable",
    "Format": "editor.formatOnSave,editor.formatOnPaste" /* 配置项之间用`","`分隔 */
  }
}
```

> 按钮初始状态会根据第一个配置项生成。

值为 string 的配置。

```json
{
  "settingSwitch.string": [
    {
      "text": "AutoSave", /* 按钮文字 /*
      "key": "files.autoSave", /* 配置项 */
      "value": ["onWindowChange", "onFocusChange", "off"] /* 自定义选项 */
    }
  ]
}
```
