# umi-plugin-upload
基于umi的插件，文件构建完毕后自动上传至指定服务器。

在没有远程构建的情况下，可以一个命令完成构建发布的流程。避免打包后再手动上传至服务器的麻烦。

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
      host, // 远程主机名
      username, // 用户名
      password, // 密码
      path, // 所上传文件的本地路径，可是是绝对路径也可以是相对路径，相对路径相对的是配置文件所在目录
      targetPath // 远程主机上文件存放的（绝对路径）
    }],
  ],
}
```

## Example

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

```js
export default {
  plugins: ['umi-plugin-upload', {
      host: 'xxxx',
      username: 'xxxx',
      password: 'xxxx',
      sourcePath: 'dist/umi.js',
      targetPath: '/home/ubuntu/test'
  }]
}
// 将umi.js上传到ubuntu下并重命名为test
```
## Options

TODO

## LICENSE

MIT
