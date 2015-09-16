module.exports = require( 'http' )
.createServer( require( './app' ) )
.listen( 3000, function (){
	console.log( '[SERVER]: running at http://localhost:3000' );
});

require( './socket' );