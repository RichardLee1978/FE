const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk');
const inquirer = require('inquirer')
const chalkPipe = require('chalk-pipe')
const run = require('./run');
const templates = require('./templates');
inquirer.registerPrompt('chalk-pipe', require('inquirer-chalk-pipe'));
exports.writePackageJson = async (dir, files) => {
  Object.keys(files).forEach((name) => {
    const filePath = path.join(dir, name)
    fs.ensureDirSync(path.dirname(filePath))
    fs.writeFileSync(filePath, files[name])
  })
}
exports.writeWidgetDir = async (dir, dirs) => {
  dirs.forEach((name) => {
    const dirPath = path.join(dir, name)
    fs.ensureDirSync(dirPath)
  })
}
exports.writeTemplates = async (dir, options) => {



  if (options.vue == true || options.react == true) {
    await templates.createWebpack(dir, options);
  }

  //console.log(output)
  const {
    isdeploy
  } = await inquirer.prompt([{
    name: 'isdeploy',
    type: 'confirm',
    message: `是否配置部署文件?`
  }])
  if (isdeploy) {
    await this.writePackageJson(dir, options);
  }
  const {
    install
  } = await inquirer.prompt([

    {
      name: 'install',
      type: 'confirm',
      message: `是否初始化项目?`
    }
  ]);
  if (install) {
    await run('npm', ['install'], dir);
  }
}
exports.writeDeployJson = async (dir, options) => {
 
  if(!fs.existsSync(path.join(dir,'deploy.json'))) {
    console.error(chalk.red.dim('失败! 配置文件不存在!!' ));
    process.exit(1);
  }
 
  const promptList = [{
    type: 'chalk-pipe',
    name: 'user',
    message: '请输入登录远程主机的用户名',
    default: ''
  }, {
    type: 'chalk-pipe',
    name: 'folder',
    message: '请输入需要部署的远程主机路径',
    default: ''
  }, {
    type: 'chalk-pipe',
    name: 'host',
    message: '请输入远程主机的IP地址',
    default: ''
  }];
  const { user,folder,host} = await inquirer.prompt(promptList);
  if(user==''||folder==''||host=='') {
    console.error(chalk.red.dim('创建配置文件失败! 用户名、远程主机路径、远程主机的IP地址均不能为空!!' ));
    process.exit(1);
  } else {
    
    const json = require(path.join(dir,'deploy.json'));
    json.user = user;
    json.folder = folder;
    json.host = host;
    fs.writeFileSync(path.join(dir,'deploy.json'),JSON.stringify(json));
  }
}