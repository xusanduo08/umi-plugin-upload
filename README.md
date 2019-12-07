# umi-plugin-upload
基于umi的插件，文件构建完毕后自动上传至指定服务器
在没有远程构建的情况下，避免本地构建结束后，手动上传文件至远程服务器的情况

## Install

```bash
# or yarn
$ npm install
```

```bash
$ npm run build --watch
$ npm run start
```

## Usage

Configure in `.umirc.js`,

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
