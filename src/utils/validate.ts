const signale = require('signale');

type rule = (t:any) => Boolean;
type checkItem = {type: string, value?: string, rule?: rule};
type validateItem = {validateTarget: any, validateName: string, validateItems:checkItem[]};

const validate = function(v:validateItem):void{
  let {validateTarget, validateName, validateItems} = v;
  for(let i = 0; i < validateItems.length; i++){
    let item = validateItems[i];
    let {type, value, rule} = item;
    if(!type){
      signale.error('Lack of validate type !');
      process.exit(1);
    }
    switch(type){
      case 'type':
        if(typeof validateTarget !== value){
          signale.error(`${validateName} should be ${value}!`);
          process.exit(1);
        }
        signale.success(`Validate ${validateName} type: true`);
        break;
      case 'required':
        if(!validateTarget){
          signale.error(`${validateName} is Required!`);
          process.exit(1);
        }
        signale.success(`Validate ${validateName} required: true`);
        break;
      default:
        if(rule){
          if(!rule(validateTarget)){
            signale.error(`Vlidate ${validateName} failed !`);
            process.exit(1);
          }
          signale.success(`Validate ${validateName} ${type}: true`);
        }
        break;
    }
  }
}

export default validate;