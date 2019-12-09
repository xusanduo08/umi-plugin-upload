type rule = (t:any) => Boolean;
type checkItem = {name: string, value?: string, rule?: rule};

const validate = function(valid: any, checkItems: checkItem[]):void{
  
  for(let i = 0; i < checkItems.length; i++){
    let item = checkItems[i];
    let {name, value, rule} = item;
    if(!name){
      console.log('Lack of validate name !');
      continue;
    }
    switch(name){
      case 'type':
        if(typeof valid !== value){
          throw `${name} should be ${value}!`;
        }
        console.log(`Validate ${name}: true`);
        break;
      case 'required':
        if(!valid){
          throw `${name} is Required!`;
        }
        console.log(`Validate ${name}: true`);
        break;
      default:
        if(rule){
          if(!rule(valid)){
            throw `Vlidate ${name} failed !`;
          }
          console.log(`Validate ${name}: true`);
        }
        break;
    }
  }
}

export default validate;