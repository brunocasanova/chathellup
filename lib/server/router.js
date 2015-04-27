var app = require( './app' );

app.get( '/', function ( req, res, next ){
	res.render( 'home/index.html', { title: 'Chathellup' } );
});

app.get( '/debug', function ( req, res, next ){
	res.redirect( '/debug?port=5858' );
});