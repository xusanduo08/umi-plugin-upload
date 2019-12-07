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
      path, // 所上传文件的本地路径
      targetPath // 远程主机上文件存放的（绝对路径）
    }],
  ],
}
```

## Options

TODO

## LICENSE

MIT
