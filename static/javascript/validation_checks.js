//NodeDog validation methods and client side javascript implementation

// simply add a function to this map to be able to run that method server and client side
// by specifying the key during NodeDog validator addVariableToValidate() method in the validationsToPerform field
validation_checks = 
{
	required:
	function(value)
	{
		return (value != "null" && value.length > 0);
	},

	length:
	function(value,min,max)
	{
		return validation_checks.minLength(value,min) && validation_checks.maxLength(value,max);
	},
	
	exactLength:
	function(value,exactly)
	{
		return validation_checks.length(value,exactly,exactly);
	},
	
	minLength:
	function(value,min)
	{
		return (value != "null" && value.length >= min);
	},
	
	maxLength:
	function(value,max)
	{
		return (value != "null" && value.length <= max);
	},
	
	isInt:
	function(value)
	{
  		return (value != "null" && value.toString().search(/^-?[0-9]+$/) == 0);
	}
}






// client side version of NodeDog. Requires no change on your part!
function validateClientSide(form) 
{
    for(var key in properties)
	{
 		for(var i = 0; i < properties[key].validationsToPerform.length; i ++)
		{
 			funcarray = properties[key].validationsToPerform[i].split("(");
			funcToCall = funcarray[0];
			
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
				fieldVal = "null";
			}
			
			funcarray = (fieldVal + "," + funcarray[1]).split(",");
			lastVal = funcarray[funcarray.length-1].split(")");
			funcarray[funcarray.length-1] = lastVal[0];
			
			if(!validation_checks[funcToCall].apply(this,funcarray))
			{
				alert(properties[key].errorMessages[i]);
				
				if(!(form[key] instanceof Array))
				{
					form[key].focus();
				}
				return false;
			}
		}
	}
	return true;
}
