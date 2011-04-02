var validator = require('./validator');

validatorObject = new validator.Validator();
validatorObject.addVariableToValidate("name",["required"],["Name is required!"]);
validatorObject.addVariableToValidate("dog",["required","length-1-3"],"Please enter a valid dog");
  
var objs = { "name" : "", "dog" : ""};
console.log(validatorObject.validate(objs));    