const swig = require('swig');
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer')
const chalkPipe = require('chalk-pipe')
const run = require('./run');
inquirer.registerPrompt('chalk-pipe', require('inquirer-chalk-pipe'));
exports.createWebpack = async (dir, options) => {
   const promptList = this.createPrompt(options);
    const {
        entry,
        dist,
        filename,
        publicPath,
        templateSrc,
        templateDist,
        templateTitle,
        AssetsJsonName,
        devServerPort
    } = await inquirer.prompt(promptList);
    const deploy = {
        "host":"",
        "folder":"",
        "user":""
    }
    let tempUrl =''
    if(options.vue===true) {
        tempUrl = '/templates/vue/webpack.config.js';
    } else if(options.react===true) {
        tempUrl = '/templates/react/webpack.config.js'
    }

    let webpack_template = swig.compileFile(__dirname +tempUrl);
    let output = webpack_template({
        entry: entry,
        dist: dist,
        filename: filename,
        publicPath: publicPath,
        templateSrc: templateSrc,
        templateDist: templateDist,
        templateTitle: templateTitle,
        AssetsJsonName:AssetsJsonName,
        devServerPort: devServerPort
    });
    const filePath = path.join(dir, 'webpack.config.js');
    fs.writeFileSync(filePath, output);
    const path_entry = path.parse(path.join(dir, entry));
    const path_dist = path.parse(path.join(dir, dist));
    const path_templateSrc = path.parse(path.join(dir, templateSrc));
    let html_template = swig.compileFile(__dirname +'/templates/index.html');
    let html_output = html_template({
        title:templateTitle
    });

    if (!fs.existsSync(path_entry.dir)) fs.ensureDirSync(path_entry.dir);
    if (!fs.existsSync(path_dist.dir)) fs.ensureDirSync(path_dist.dir);
    if (!fs.existsSync(path_templateSrc.dir)) fs.ensureDirSync(path_templateSrc.dir);

    fs.writeFileSync(path.join(dir, 'deploy.json'),JSON.stringify(deploy));
    fs.writeFileSync(path.join(dir, entry), '');
    fs.ensureDirSync(path.join(dir, dist))
    fs.writeFileSync(path.join(dir, templateSrc), html_output);
}
exports.createPrompt = (options) => {
    const promptList = [{
        type: 'chalk-pipe',
        name: 'entry',
        message: '请输入entry',
        default: 'app.js'
    }, {
        type: 'chalk-pipe',
        name: 'dist',
        message: '请输入dist',
        default: 'dist'
    }, {
        type: 'chalk-pipe',
        name: 'filename',
        message: '请输入filename',
        default: 'js/[name].js'
    }, {
        type: 'chalk-pipe',
        name: 'publicPath',
        message: '请输入publicPath',
        default: '/'
    }, {
        type: 'chalk-pipe',
        name: 'templateSrc',
        message: '请输入HtmlWebpackPlugin入口模版源文件名及路径',
        default: 'index.html'
    }, {
        type: 'chalk-pipe',
        name: 'templateDist',
        message: '请输入HtmlWebpackPlugin入口模版释放名及路径',
        default: 'app.html'
    }, {
        type: 'chalk-pipe',
        name: 'templateTitle',
        message: '请输入HtmlWebpackPlugin入口模版title名称',
        default: 'test'
    }, 
    {
        type:'chalk-pipe',
        name:'AssetsJsonName',
        message:'生成资源映射的json名字',
        default:'test.map.json'
    },
    {
        type: 'chalk-pipe',
        name: 'devServerPort',
        message: '请输入webpackDevServer端口',
        default: '3000'
    }];
    return promptList;
}
