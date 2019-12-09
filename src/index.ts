// ref:
// - https://umijs.org/plugin/develop.html
import { IApi } from 'umi-types';
import validate from './utils/validate';
import uploadDir from './uploadDir';
import uploadFile from './uploadFile';
const fs = require('fs');
const path = require('path');


export default function (api: IApi, options) {
  let {targetPath, sourcePath, host, username} = options;
  
  api.onBuildSuccess(() => {

    // TODO 如果没有密码，提示输入密码

    validate({validateTarget:host, validateName:'Host', validateItems: [{type:'type', value:'string'}, {type:'required'}]});
    validate({validateTarget: username, validateName:'Username', validateItems: [{type:'type', value:'string'}, {type:'required'}]});

    // TODO 校验是否是有效的host

    validate({validateTarget: sourcePath, validateName:'SourcePath', validateItems: [{type: 'required'}, {type:'type', value: 'string'}]});
    validate({validateTarget: targetPath,
      validateName:'TargetPath',
      validateItems: [
        {type:'type', value: 'string'},
        {type:'required'},
        {type:'absolute path', rule:(target)=>{
          if(!target.startsWith('/')){
            return false;
          }
          return true;
        }}
      ]
    })

    if(fs.statSync(path.resolve(sourcePath)).isDirectory()){
      uploadDir(options);
    } else {
      uploadFile(options);
    }
  });
} 
