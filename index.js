const program = require('commander')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const slash = require('slash')
const semver = require('semver')
const minimist = require('minimist')
const create = require('./lib/create')

exports.init =async (process) => {
    if (semver.satisfies(process.version, '9.x')) {
        console.log(chalk.red(
            `您正在使用 Node ${process.version}.\n` +
            `Node.js 9.x 已经停止迭代并在将来的主要版本不被支持.\n` +
            `请使用官方 LTS 版本替代.`
        ))
    }
    program
        .command('create <app-name>')
        .description('create a new project powered by febis')
        .option('-v, --vue', 'building vue app')
        .option('-r, --react', 'building react app')
        .option('-w, --wxApp', 'building wxApp ')
        .option('-n, --normal', 'building webapp ')
        .action((name, cmd) => {
            const options = cleanArgs(cmd)
            if (minimist(process.argv.slice(3))._.length > 1) {
                console.log(chalk.yellow(' 警告: 你提供了多个参数。第一个将被用作app的名字,其余的被忽略。\n'))
            }
            create.create(name, options)
        });
        program
        .command('widget <widget-name>')
        .description('create a new widget powered by febis')
        .option('-v, --vue', 'building vue app')
        .option('-r, --react', 'building react app')
        .option('-w, --wxApp', 'building wxApp ')
        .option('-n, --normal', 'building webapp ')
        .action((name, cmd) => {
            const options = cleanArgs(cmd)

            if (minimist(process.argv.slice(3))._.length > 1) {
                console.log(chalk.yellow(' 警告: 你提供了多个参数。第一个将被用作app的名字,其余的被忽略。\n'))
            }
            console.log(chalk.yellow(' widget: '+JSON.stringify(name)+"\n options"+JSON.stringify(options)));
        });
        program.parse(process.argv);

    /**
     * 小写转换为大写
     * @param {*} str 
     */
    function camelize(str) {
        return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
    }


    /**
     * 传递commander对象为选项,并根据这个选项提取一个新的对象
     * @param {*} cmd commander对象
     */
    function cleanArgs(cmd) {
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
}