function compareJSONObjects(oldJSON: any, newJSON: any): string[] {
  const changes: string[] = []

  // 检查键的数量是否发生变化
  const oldKeys = Object.keys(oldJSON)
  const newKeys = Object.keys(newJSON)

  if (oldKeys.length !== newKeys.length) {
    changes.push(`Key 数量变化: 从 ${oldKeys.length} 个到 ${newKeys.length} 个`)
  }

  // 检查键的名称变化
  oldKeys.forEach((key) => {
    if (!newKeys.includes(key)) {
      changes.push(`Key 名称变化: "${key}" 从旧 JSON 中移除`)
    }
  })

  newKeys.forEach((key) => {
    if (!oldKeys.includes(key)) {
      changes.push(`Key 名称变化: "${key}" 在新 JSON 中添加`)
    }
  })

  // 检查键对应的值的变化
  oldKeys.forEach((key) => {
    if (oldJSON[key] !== newJSON[key]) {
      changes.push(`Key 值变化: "${key}" 从 "${oldJSON[key]}" 变为 "${newJSON[key]}"`)
    }
  })

  return changes
}

// 示例用法
// const oldJSON = {
//   name: "John",
//   age: 30,
//   city: "New York",
// };

// const newJSON = {
//   name: "Jane",
//   age: 32,
//   country: "USA",
// };

// const changes = compareJSONObjects(oldJSON, newJSON);
// console.log(changes);
