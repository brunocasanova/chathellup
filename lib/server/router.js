console.log( '[Router] initialized!' );

var app = require( './app' );

app.get( '/', function ( req, res, next ){
	res.render( 'home/index.html', { title: 'The index page!' });
});