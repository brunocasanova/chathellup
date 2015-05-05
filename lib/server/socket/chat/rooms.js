var io = require( './socket/chat' );

io.sockets.on( 'connection', function ( socket ){

	socket.on('say to someone', function ( id, msg ){
		socket.broadcast.to( id ).emit( 'my message', msg );

	});

});