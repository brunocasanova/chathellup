module.exports = require( 'http' )
	.createServer( require( './app' ) )
	.listen( 3000, function (){
		console.log( 'Server running at http://localhost:3000' );
	});

require( './socket' );
require( './database' );
