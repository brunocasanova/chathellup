module.exports =
	require( 'socket.io' )
	.listen( require( '../../server' ) );

require( './dom' );
require( './chat' );




