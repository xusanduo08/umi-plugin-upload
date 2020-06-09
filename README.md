# umi-plugin-upload
[![NPM version](https://img.shields.io/npm/v/umi-plugin-upload.svg?style=flat)](https://npmjs.org/package/umi-plugin-upload)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-upload.svg?style=flat)](https://npmjs.org/package/umi-plugin-upload)

基于umi的插件，文件构建完毕后自动上传至指定服务器。:smile:

在没有远程构建的情况下，可以一个命令完成构建发布的流程。:smirk: 避免打包后再手动上传至服务器的麻烦。:relieved:

欢迎大家使用，欢迎大家提意见 :blush:

## Install

```bash
# or yarn
$ npm install umi-plugin-upload
```



## Usage

Configure in `.umirc.js`

```js
export default {
  plugins: [
    ['umi-plugin-upload', {
      host, // 远程主机名（必填）
      username, // 用户名（必填）
      password, // 密码（可选）
      sourcePath, // 本地源文件路径，可以是绝对路径也可以是相对路径，相对路径相对的是配置文件所在目录（必填）
      targetPath // 远程主机上文件存放路径（绝对路径，必填）
    }],
  ],
}
```

如果没有配置密码，则在上传时命令行会给出交互提示输入密码

## Example

### Upload directory
```js
export default {
  plugins: ['umi-plugin-upload', {
    host: 'xxxx',
    username: 'xxxx',
    password: 'xxxx',
    sourcePath: 'dist/',
    targetPath: '/home/ubuntu/test'
  }]
}
// 将dist目录上传到/home/ubuntu下，并命名为test
```

### Upload file
```js
export default {
  plugins: ['umi-plugin-upload', {
    host: 'xxxx',
    username: 'xxxx',
    password: 'xxxx',
    sourcePath: 'dist/umi.js',
    targetPath: '/home/ubuntu/test.js'
  }]
}
// 将umi.js上传到/home/ubuntu下并重命名为test.js
```

### Glob pattern
```js
export default {
  plugins: ['umi-plugin-upload', {
    host: 'xxxx',
    username: 'xxxx',
    password: 'xxxx',
    sourcePath: 'dist/*.js',
    targetPath: '/home/ubuntu/test'
  }]
}
// 将dist下的所有js文件上传到/home/ubuntu/test目录下，glob模式请确保targetPath代表的目录在远程是存在的
```
## Options

TODO

## LICENSE

MIT
