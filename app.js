// Run this to test out the NodeDog Validator.
// The code on the page is just to show how NodeDog validator can be used.
// Express and Jade are not required to use NodeDog

require('./validator');
var express = require('express');

var app = express.createServer();

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
	app.use(express.logger());
	app.use(express.static(__dirname + '/static'));
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


//important NodeDog Validator starts here code
validatorObject = new Validator();
validatorObject.addVariableToValidate("name",["required"],["Name is required!"]);
validatorObject.addVariableToValidate("year",["required","length-4-4","isInt"],"Please enter a valid year");
	  
app.get('/', function(req, httpResponse)
{    
    httpResponse.render('list', 
    {
       locals: {validate_properties: validatorObject.getClientSideValidationProperties(), msg:null}
    });
});

app.get('/message/:msg', function(req, httpResponse)
{    
    httpResponse.render('list', 
    {
       locals: {validate_properties: validatorObject.getClientSideValidationProperties(), message: req.params.msg}
    });
});

app.post('/', function(req, httpResponse)
{
	msg = validatorObject.validate(req.body);
	
	if(msg == null)
	{
		msg = "All NodeDog validation passed!";
	}
	httpResponse.redirect('/message/'+encodeURIComponent(msg)+"/");
});

app.listen(4000);