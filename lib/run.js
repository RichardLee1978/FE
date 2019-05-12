const execa = require('execa')
const chalk = require('chalk')
const getStream = require('get-stream');
module.exports = async (command, args, target) => {

    if (!args) {
        [command, ...args] = command.split(/\s+/)
    }
    const stream = execa(command, args, {
        cwd: target
    }).stdout;

    stream.pipe(process.stdout);
    console.log(chalk.cyan.bold('👉正在安装依赖包,请稍后...'))
    getStream(stream).then(value => {
        console.log(value);
    });


}