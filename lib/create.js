const validateProjectName = require('validate-npm-package-name')
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const writeFile = require('./writeFile')
const config = require('./config');
const run = require('./run');
exports.create = async (projectName, options) => {
    //检测项目名称是否合法
    const cwd = options.cwd || process.cwd()
    const inCurrent = projectName === '.'
    const name = inCurrent ? path.relative('../', cwd) : projectName;
    const targetDir = path.resolve(cwd, projectName || '.')
    const dirs = ['commom', 'widgets', 'libs']
    const result = validateProjectName(name);

    if (!result.validForNewPackages) {
        console.error(chalk.red(`Invalid project name: "${name}"`))
        result.errors && result.errors.forEach(err => {
            console.error(chalk.red.dim('Error: ' + err))
        })
        result.warnings && result.warnings.forEach(warn => {
            console.error(chalk.red.dim('Warning: ' + warn))
        })
        exit(1)
    }
    //
    let def_pkg = {
        name,
        version: '0.1.0',
        private: true,
        devDependencies: {}
    }

    let pkg = Object.assign({}, def_pkg, config(options));
    let msg = fs.existsSync(targetDir)?'当前目录已存在该目录，是否删除该项目并在当前目录重新创建项目?':'在当前目录创建项目?'
    const {yes,install} = await inquirer.prompt([
            {
                name: 'yes',
                type: 'confirm',
                message: msg
            },
            {
                name: 'install',
                type: 'confirm',
                message: `是否初始化项目?`
            }
        ]);
        if(yes) {
            if (fs.existsSync(targetDir)) await fs.remove(targetDir);
                
                await writeFile.write(targetDir, {
                    'package.json': JSON.stringify(pkg, null, 2)
                })
                await writeFile.writeDir(targetDir, dirs)
        }
        if(install) {
            await run('npm', ['install'], targetDir);
        }

}