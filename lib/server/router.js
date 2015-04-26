var app = require( './app' );

app.get( '/home', function ( req, res, next ){
	res.render( 'home/index.html', { title: 'The index page!' });
});

app.get( '/debug', function ( req, res, next ){
	res.redirect( '/debug?port=5858' );
});