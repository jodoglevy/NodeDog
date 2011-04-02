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

app.get('/', function(req, httpResponse)
{
	    
	validatorObject = new Validator();
	validatorObject.addVariableToValidate("name",["required"],["Name is required!"]);
	validatorObject.addVariableToValidate("year",["required","length-4-4","isInt"],"Please enter a valid year");
	  
	// var objs = { "name" : "", "dog" : ""};
	// console.log(validatorObject.validate(objs));
    
    httpResponse.render('list', 
    {
       locals: {validate_params: validatorObject.getClientSideValidationParams()}
    });
});

app.listen(81);