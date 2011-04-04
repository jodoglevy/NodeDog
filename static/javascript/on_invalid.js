//example of a callback function to run client side when validation fails
//any callback function can be run by specifying it as a param to validateClientSide()
//The callback function MUST take parameters form, fieldName, and errorMessage, in that order, with no other params
function onInvalid(form,fieldName,errorMessage)
{
	alert(errorMessage);
				
	if(!(form[fieldName] instanceof Array))
	{
		form[fieldName].focus();
	}
	return false;
}
