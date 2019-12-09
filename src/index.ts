// ref:
// - https://umijs.org/plugin/develop.html
import { IApi } from 'umi-types';
import validate from './utils/validate';
const fs = require('fs');
const client = require('scp2');
const ssh2 = require('ssh2');
const {Client} = ssh2;
console.log(validate)
export default function (api: IApi, options) {

  api.onBuildSuccess(() => {
    const {targetPath, sourcePath, host, username, password} = options;
    
    // TODO 如果没有密码，提示输入密码

    validate(host, [{name:'type', value:'string'}, {name:'required'}])
    validate(username, [{name:'type', value:'string'}, {name:'required'}])
    
    // TODO 校验是否是有效的host

    validate(sourcePath, [{name:'type', value: 'string'}])
    
    validate(targetPath, [
      {name:'type', value: 'string'},
      {name:'required'},
      {name:'absolute path', rule:(target)=>{
        if(!target.startsWith('/')){
          return false;
        }
        return true;
      }}
    ]);
    
    
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
        console.log('Upload failed!');
        console.error(err);
        fs.appendFileSync('log.txt', err, 'utf8', err => {
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
