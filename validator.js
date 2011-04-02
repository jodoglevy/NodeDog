var Validator = module.exports.Validator = function()
{
    this.properties = { "name" : "1" };
};

//fieldName is a string, validationsToPerform is an array of strings representing functions, errorMessages is an array of errors associated with not passing those functions
// Ex: if validationsToPerform[0] fails, errorMessages[0] will be returned.
// Alternatively, pass a single string to errorMessages to have that error show up for all validation faiures for this field
Validator.prototype.addVariableToValidate = function(fieldName,validationsToPerform,errorMessages) 
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
Validator.prototype.validate = function(objectHolder) 
{

    for(var key in this.properties)
	{
 		for(var i = 0; i < this.properties[key].validationsToPerform.length; i ++)
		{
 			funcarray = this.properties[key].validationsToPerform[i].split("-");
			funcToCall = funcarray[0];
			funcarray[0] = objectHolder[key];

			if(this[funcToCall].apply(this,funcarray))
			{
				return this.properties[key].errorMessages[i];
			}
		}
	}
	return null;
};

Validator.prototype.required = function(value)
{
	return (value == null || value.length == 0);
};

Validator.prototype.length = function(value,min,max)
{;
	return (value == null || value.length < min || value.length > max);
};