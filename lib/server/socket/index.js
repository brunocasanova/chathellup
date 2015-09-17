module.exports =
	require( 'socket.io' )
	.listen( require( '../../server' ) );

console.log( '[SOCKET IO]: loaded!' );
//require( './chat' );




