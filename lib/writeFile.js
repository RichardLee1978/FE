const fs = require('fs-extra')
const path = require('path')
exports.write = async (dir, files) => {
  Object.keys(files).forEach((name) => {
    const filePath = path.join(dir, name)
    fs.ensureDirSync(path.dirname(filePath))
    fs.writeFileSync(filePath, files[name])
  })
}
exports.writeDir = async (dir, dirs) => {
  dirs.forEach((name) => {
    const dirPath = path.join(dir, name)
    fs.ensureDirSync(dirPath)
  })
}