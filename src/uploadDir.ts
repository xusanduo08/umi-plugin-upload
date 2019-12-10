const client = require('scp2');
const fs = require('fs');
const signale = require('signale');
const ssh2 = require('ssh2');
const {Client} = ssh2;
import {options} from './type';


function uploadDir(options: options):void{
  let {targetPath, sourcePath, host, username, password} = options;
    // TODO 处理目标路径结尾的斜杠/
  if(targetPath[targetPath.length - 1] === '/'){
    targetPath = targetPath.slice(0, targetPath.length - 1);
  }

  const rootPath = targetPath.slice(0, targetPath.lastIndexOf('/')); // 获取文件存放目录的上一层
  const dirName = targetPath.slice(targetPath.lastIndexOf('/') + 1); // 获取文件存放目录名
  const tempDirName = Date.now(); // 临时目录
  signale.debug(rootPath, dirName, tempDirName, targetPath);
  signale.pending('Uploading...');
  client.scp(sourcePath, {
    host: host,
    username: username,
    password: password,
    path: `${targetPath}/../${tempDirName}`
  }, err => {
    if(err){
      signale.error(err);
      fs.appendFileSync('log.txt', err, 'utf8', err => {
        signale.error(err);
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
          signale.success('Upload success !')
          conn.end();
        }).on('data', function(data){
          signale.debug('stdout:: ' + data);
        })
      })
    }).connect({
      host: host,
      username: username,
      password: password
    })
  })
}

export default uploadDir;