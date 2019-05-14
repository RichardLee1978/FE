const Rsync = require('rsync');
const fs = require('fs-extra')
const chalk = require('chalk')
const path = require('path')
module.exports = async (deploy_path, deploy_json_path) => {
   
    if (!fs.existsSync(deploy_path)) {
        console.error(chalk.red.dim('Error: 默认\'dist\'文件夹不存在'))
        process.exit(1);
    }
    if (!fs.existsSync(deploy_json_path)) {
        console.error(chalk.red.dim('Error: 缺少配置文件'))
        process.exit(1);
    }
    const json = require(deploy_json_path);
   
    if (json.host && json.folder && json.user) {
        if (json.host != '' && json.folder != '' && json.user != '') {
            let rsync = new Rsync()
                .shell('ssh')
                .flags('avz')
                .source(deploy_path)
                .destination(json.user+'@'+json.host+':'+json.folder);
            let rsyncPid = rsync.execute(
                function (error, code, cmd) {
                    // we're done
                    console.log(chalk.cyan('👉传输完成:' + cmd));
                },
                function (data) {
                    // do things like parse progress
                    console.log(chalk.yellow('👉传输中:' + data));
                },
                function (data) {
                    // do things like parse error output
                    console.error(chalk.red.dim('Error: ' + data))
                }
            );
        } else {
            console.error(chalk.red.dim('Error: 配置项目不能为空，请检查host、folder、user是否正确'))
            process.exit(1);
        }
    } else {
        console.error(chalk.red.dim('Error: 配置项目不存在,请检查host、folder、user是否正确'))
        process.exit(1);
    }

}