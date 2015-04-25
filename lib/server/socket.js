console.log( '[Socket.io] initialized!' );

var server = require( './server' );

var socket = require( 'socket.io' );
var io = module.exports = socket.listen( server );

io.sockets.on( 'connection', function ( client ){
	console.log( 'Server socket connected!' );

	client.on( 'join', function ( name ){

		console.log( name )

		client.nickname = name;

	});

	client.on( 'messages', function ( data ){
		console.log( 'Server messages!' );

		var message = data && '<span style="color: #999;">' + client.nickname + ':</span> ' + data || data; 

		this.emit( 'messages', message );
		this.broadcast.emit( 'messages', message );

	});

} );
