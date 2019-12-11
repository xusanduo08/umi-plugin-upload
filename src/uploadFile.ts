const client = require('scp2');
const fs = require('fs');
const signale = require('signale');
import {options} from './type';

function uploadFile(options: options):void{
  let {targetPath, sourcePath, host, username, password} = options;
  signale.pending('Uploading...');
  client.scp(sourcePath, {
    host: host,
    username: username,
    password: password,
    path: `${targetPath}`
  }, err => {
    if(err){
      signale.debug('Upload failed!');
      signale.error(err);
      fs.appendFileSync('log.txt', err, 'utf8', err => {
        signale.error(err);
      })
      process.exit(1);
    }
    signale.success('Upload success!');
  })
}

export default uploadFile;