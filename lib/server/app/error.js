var app = require( './index.js' );

// Error 400 handling
app.use(function ( req, res, next ){
	res.statusCode = 400;

	res.render( 'errors/error400.html', {
		title: 'Chathellup | Error404'
	} );
});

// Error 500 handling
app.use(function ( err, req, res, next ){
	res.statusCode = 500;
	
	res.render( 'errors/error500.html', {
		title: 'Chathellup | Error500',
		stack: err.stack || err,
	} );

	console.log( err.stack || err );
});