<h1 align="center">
	<br>
	<br>
	<img width="320" src="media/logo.png" alt="Febis">
	<br>
	<br>
	<br>
</h1>

# Febis is a tool for front-end development

## Febis 前端集成工具
- 1.安装
```
npm install -g febis
```
- 2.在项目根目录建立deploy.json文件（主要用于部署远程主机）
```
{
    "host":"主机IP地址",
    "folder":"拷贝至远程主机的文件夹地址",
    "user":"登录远程主机使用的用户名"
}
```
```
1.远程主机需要安装rsync服务，并配置默认端口
2.本机需要安装rsync服务(暂时不支持windows)
3.本地需要增加与远程主机互信(使用ssh-copy-id命令拷贝至远程主机)
```
- 3.创建一个 vue 项目(或者创建一个默认项目 febis create projectname)
```
febis create projectname -v

```
```
1.-r 表示创建一个react项目
2.-w 表示创建一个小程序项目
3.-v 表示创建一个vue项目
```
生成文件目录如下:
```
  |--projectname
  |----commom
  |----libs
  |----widgets
  |----package.json
```

- 4.部署到远程主机

   cd 到需要部署到远程主机的文件夹
```
febis deploy [foldername]
foldername 表示需要拷贝到远程主机的文件夹名字
```