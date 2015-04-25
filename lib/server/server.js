console.log( '[Server] initialized!' );

module.exports = require( 'http' )
	.createServer( require( './app' ) )
	.listen( 8080 );
