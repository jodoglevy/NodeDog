require(__dirname+'/static/javascript/validation_checks');

Validator = function()
{
    this.properties = { };
    this.addVariableToValidate = addVariableToValidate;
    this.validate = validate;
    this.getClientSideValidationParams = getClientSideValidationParams;
    this.validation_checks = validation_checks;
};

//fieldName is a string, validationsToPerform is an array of strings representing functions, errorMessages is an array of errors associated with not passing those functions
// Ex: if validationsToPerform[0] fails, errorMessages[0] will be returned.
// Alternatively, pass a single string to errorMessages to have that error show up for all validation faiures for this field
addVariableToValidate = function(fieldName,validationsToPerform,errorMessages) 
{
    if(!(errorMessages instanceof Array))
    {
    	var msg = errorMessages;
    	errorMessages = [];
    	for(var i = 0; i < validationsToPerform.length; i ++)
    	{
    		errorMessages[i] = msg;
    	}
    }
    
    this.properties[fieldName] =
	{
		validationsToPerform: validationsToPerform,
     	errorMessages: errorMessages
	};
};

//objectHolder must be a map!
validate = function(objectHolder) 
{
    for(var key in this.properties)
	{
 		for(var i = 0; i < this.properties[key].validationsToPerform.length; i ++)
		{
 			funcarray = this.properties[key].validationsToPerform[i].split("-");
			funcToCall = funcarray[0];
			funcarray[0] = objectHolder[key];

			if(!this.validation_checks[funcToCall].apply(this,funcarray))
			{
				return this.properties[key].errorMessages[i];
			}
		}
	}
	return null;
};

getClientSideValidationParams = function()
{
	return (this.properties);
}
