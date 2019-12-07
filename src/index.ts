// ref:
// - https://umijs.org/plugin/develop.html
import { IApi } from 'umi-types';
const fs = require('fs');
const client = require('scp2');
const ssh2 = require('ssh2');
const {Client} = ssh2;

export default function (api: IApi, options) {

  api.onBuildSuccess(({ stats }) => {
    const rootPath = options.targetPath.slice(0, options.targetPath.lastIndexOf('/')); // 获取文件存放目录的上一层
    const dirName = options.targetPath.slice(options.targetPath.lastIndexOf('/') + 1); // 获取文件存放目录名
    const tempDirName = Date.now(); // 临时目录
    console.log(rootPath, dirName, tempDirName);
    fs.appendFileSync('log.txt', stats, 'utf8', err => {
      console.log(err);
    })
    client.scp(options.path, {
      host: options.host,
      username: options.username,
      password: options.password,
      path: `${options.targetPath}/../${tempDirName}`
    }, err => {
      if(err){
        console.log(err);
      }
      let conn = new Client();
      conn.on('ready', function(){
        console.log('Client :: ready');
        // 1. 进入文件目录所在路径
        // 2. 删除已存在文件目录
        // 3. 将dist重命名成制定目录名
        conn.exec(`cd ${rootPath};rm -rf ${dirName};mv ${tempDirName} ${dirName}`, function(err, stream){
          if(err){
            throw err;
          }
          stream.on('close', function(code, signal){
            console.log('Stream :: close :: code ' + code + 'signal: ' + signal);
            conn.end();
          }).on('data', function(data){
            console.log('stdout:: ' + data);
          })
        })
      }).connect({
        host: options.host,
        username: options.username,
        password: options.password
      })
    })
  });
} 
