const client = require('scp2');
const fs = require('fs');
import {options} from './type';

function uploadFile(options: options):void{
  let {targetPath, sourcePath, host, username, password} = options;
  client.scp(sourcePath, {
    host: host,
    username: username,
    password: password,
    path: `${targetPath}`
  }, err => {
    if(err){
      console.log('Upload failed!');
      console.error(err);
      fs.appendFileSync('log.txt', err, 'utf8', err => {
        console.log(err);
      })
      process.exit(1);
    }
  })
}

export default uploadFile;