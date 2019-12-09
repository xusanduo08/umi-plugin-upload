type rule = (t:any) => Boolean;
type checkItem = {type: string, value?: string, rule?: rule};
type validateItem = {validateTarget: any, validateName: string, validateItems:checkItem[]};

const validate = function(v:validateItem):void{
  let {validateTarget, validateName, validateItems} = v;
  for(let i = 0; i < validateItems.length; i++){
    let item = validateItems[i];
    let {type, value, rule} = item;
    if(!type){
      console.log('Lack of validate type !');
      continue;
    }
    switch(type){
      case 'type':
        if(typeof validateTarget !== value){
          throw `${validateName} should be ${value}!`;
        }
        console.log(`Validate ${validateName}: true`);
        break;
      case 'required':
        if(!validateTarget){
          throw `${validateName} is Required!`;
        }
        console.log(`Validate ${validateName}: true`);
        break;
      default:
        if(rule){
          if(!rule(validateTarget)){
            throw `Vlidate ${validateName} failed !`;
          }
          console.log(`Validate ${validateName}: true`);
        }
        break;
    }
  }
}

export default validate;