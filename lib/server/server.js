module.exports = require( 'http' )
	.createServer( require( './app' ) )
	.listen( 8080, function (){
		console.log( 'Server running at http://localhost:8080' );
	});
