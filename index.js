import program from 'commander'
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import slash from 'slash'
import semver from 'semver'
import validateProjectName from 'validate-npm-package-name'
if (semver.satisfies(process.version, '9.x')) {
    console.log(chalk.red(
      `您正在使用 Node ${process.version}.\n` +
      `Node.js 9.x 已经停止迭代并在将来的主要版本不被支持.\n` +
      `请使用官方 LTS 版本替代.`
    ))
  }
  
/**
 * 小写转换为大写
 * @param {*} str 
 */
  function camelize (str) {
    return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
  }
  
  
  /**
   * 传递commander对象为选项,并根据这个选项提取一个新的对象
   * @param {*} cmd commander对象
   */
  function cleanArgs (cmd) {
    const args = {}
    cmd.options.forEach(o => {
      const key = camelize(o.long.replace(/^--/, ''))
      // 如果一个选项不存在并且命令具有相同名称的方法
      // 执行复制
      if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
        args[key] = cmd[key]
      }
    })
    return args
  }