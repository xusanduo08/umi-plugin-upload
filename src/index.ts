// ref:
// - https://umijs.org/plugin/develop.html
import { IApi } from 'umi-types';
const fs = require('fs');
const client = require('scp2');
const ssh2 = require('ssh2');
const {Client} = ssh2;

export default function (api: IApi, options) {

  api.onBuildSuccess(({ stats }) => {
    const {targetPath, sourcePath, host, username, password} = options;
    
    if(!username){
      throw 'Username is Required!';
    }

    if(!host){
      throw 'Host is Required!'
    }
    
    // TODO 校验是否是有效的host

    if(typeof host !== 'string'){
      throw 'Host should be String!';
    }

    if(typeof sourcePath !== 'string'){
      throw 'Source path should be String!';
    }

    if(typeof targetPath !== 'string'){
      throw 'Target path should be String!';
    }
    if(!targetPath.startsWith('/')){
      throw 'Target path should be an Absolute Path !';
    }
    const rootPath = targetPath.slice(0, targetPath.lastIndexOf('/')); // 获取文件存放目录的上一层
    const dirName = targetPath.slice(targetPath.lastIndexOf('/') + 1); // 获取文件存放目录名
    const tempDirName = Date.now(); // 临时目录
    console.log(rootPath, dirName, tempDirName);
    console.log('Uploading...');
    client.scp(sourcePath, {
      host: host,
      username: username,
      password: password,
      path: `${targetPath}/../${tempDirName}`
    }, err => {
      if(err){
        fs.appendFileSync('log.txt', stats, 'utf8', err => {
          console.log(err);
        })
        process.exit(1);
      }
      let conn = new Client();
      conn.on('ready', function(){
        // 1. 进入文件目录所在路径
        // 2. 删除已存在文件目录
        // 3. 将dist重命名成制定目录名
        conn.exec(`cd ${rootPath};rm -rf ${dirName};mv ${tempDirName} ${dirName}`, function(err, stream){
          if(err){
            throw err;
          }
          stream.on('close', function(){
            console.log('Upload success !')
            conn.end();
          }).on('data', function(data){
            console.log('stdout:: ' + data);
          })
        })
      }).connect({
        host: host,
        username: username,
        password: password
      })
    })
  });
} 
