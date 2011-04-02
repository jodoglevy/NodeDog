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

validatorObject = new Validator();
validatorObject.addVariableToValidate("name",["required"],["Name is required!"]);
validatorObject.addVariableToValidate("year",["required","length-4-4","isInt"],"Please enter a valid year");
	  
app.get('/', function(req, httpResponse)
{    
    httpResponse.render('list', 
    {
       locals: {validate_params: validatorObject.getClientSideValidationParams(), error:null}
    });
});

app.get('/error/:error', function(req, httpResponse)
{    
    httpResponse.render('list', 
    {
       locals: {validate_params: validatorObject.getClientSideValidationParams(), error: req.params.error}
    });
});

app.post('/', function(req, httpResponse)
{
    var objs = { "name" : req.body.name, "year" : req.body.year};
	
	msg = validatorObject.validate(objs);
	
	if(msg != null)
	{
		httpResponse.redirect('/error/'+encodeURIComponent(msg)+"/");
	}
	else
	{
		httpResponse.redirect('/');
	}
});

app.listen(81);