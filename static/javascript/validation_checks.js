//NodeDog validation methods and client side javascript implementation

// simply add a function to this map to be able to run that method server and client side
// by specifying the key during NodeDog validator addVariableToValidate() method in the validationsToPerform field
validation_checks = 
{
	required:
	function(value)
	{
		return value.length > 0;
	},

	lengthBetween:
	function(value,min,max)
	{
		return validation_checks.minLength(value,min) && validation_checks.maxLength(value,max);
	},
	
	exactLength:
	function(value,exactly)
	{
		return validation_checks.lengthBetween(value,exactly,exactly);
	},
	
	minLength:
	function(value,min)
	{
		return value.length >= min;
	},
	
	maxLength:
	function(value,max)
	{
		return value.length <= max;
	},
	
	isPositive:
	function(value)
	{
		return parseFloat(value) > 0;
	},
	
	isNegative:
	function(value)
	{
		return parseFloat(value) < 0;
	},
	
	isEmail: 
	function(value)
	{
    	return value.match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/);
	},

    isUrl:
    function(value)
    {
    	return value.match(/^(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-\w\d{1-3}]+\.)+(?:com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|edu|co\.uk|ac\.uk|it|fr|tv|museum|asia|local|travel|[a-z]{2}))|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/);
    },

	isAlpha:
	function(value)
	{
     	return value.match(/^[a-zA-Z]+$/);
	},

	isAlphanumeric:
	function(value)
	{
     	return value.match(/^[a-zA-Z0-9]+$/);
   	},

    isNumeric:
    function(value)
    {
		return value.match(/^-?[0-9]+$/);
	},

	isLowercase:
	function(value)
	{
		return value.match(/^[a-z0-9]+$/);
	},

	isUppercase:
	function(value)
	{
		return value.match(/^[A-Z0-9]+$/);
	},

	isInt:
	function(value)
	{
  		return value.match(/^(?:-?(?:0|[1-9][0-9]*))$/);
	},
	
	isDecimal:
	function(value)
	{
  		return value.match(/^(?:-?(?:0|[1-9][0-9]*))?(?:\.[0-9]*)?$/);
	},
	
	isFloat:
	function(value)
	{
  		return validation_checks.isDecimal(value);
	},
	
	equals:
	function(value,compareValue)
	{
  		return value == compareValue;
	},
	
	greaterThan:
	function(value,compareValue)
	{
  		return value > compareValue;
	},
	
	lessThan:
	function(value,compareValue)
	{
  		return value < compareValue;
	},

	contains:
	function(value,substring)
	{
		return !(value.indexOf(substring) === -1);
	},
	
	notContains:
	function(value,substring)
	{
		return !validation_checks.contains(value,substring);
	},
	
	regex:
	function(value,expression)
	{
		pattern = new RegExp(expression);
		return value.match(pattern);
	},
	
	notRegex:
	function(value,expression)
	{
		return !validation_checks.regex(value,expression);
	}
}




// client side version of NodeDog. Requires no change on your part!
function validateClientSide(form,callbackOnInvalid) 
{
    for(var key in properties)
	{
 		for(var i = 0; i < properties[key].functionsToCall.length; i ++)
		{
 			if(form[key].type == "text" || form[key].type == "hidden" || form[key].type == "password"
			|| form[key].type == "textarea" || form[key].type == "select")
			{
				fieldVal = form[key].value;	
			}
			else if(form[key].type == 'checkbox')
			{
				if (form[key].checked)
				{
					fieldVal = form[key].name;
				}
				else
				{
					fieldVal = null;	
				}
			}
			else if(form[key] instanceof Array && form[key][0].type == 'radio')
			{
				fieldVal = null;
				for (i=0;i<form[key].length;i++)
				{
					if (form[key][i].checked)
					{
				 		fieldVal = form[key][i].value;
				 		break;
				 	}
				}
			}
			else
			{
				fieldVal = null;
			}
			
			if(fieldVal == null)
			{
				fieldVal = "";
			}
			fieldVal = [fieldVal];
			
			funcToCall = properties[key].functionsToCall[i];
			params = properties[key].parametersToUse[i];
			params = fieldVal.concat(params)
						
			if(!validation_checks[funcToCall].apply(this,params))
			{
				if(callbackOnInvalid != null)
				{
					return callbackOnInvalid.apply(this,[form,key,properties[key].errorMessages[i]]);
				}
				else
				{
					alert(properties[key].errorMessages[i]);
					return false;	
				}
			}
		}
	}
	return true;
}
