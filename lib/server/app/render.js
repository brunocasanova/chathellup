var app = require( './index' );

app.use(function ( req, res, next ){

	next();
});