
var server = require( './server' );
var io = module.exports = require( 'socket.io' ).listen( server );

// var Connection = require( './connection' );
// var connection = new Connection( socket, name, Connections );

var connections = [];

io.sockets.on( 'connection', function ( socket ){

	//socket.on( 'connect', function (){

	//});

	socket.on( 'nickname', function ( nickname, cb ){

		if( nickname == "" || connections.indexOf( nickname ) !== -1 ){
			cb( false );
		}

		else{
			socket.nickname = nickname;
			socket.color = "#" + Math.random().toString( 16 ).slice( 2, 8 );;
			connections.push( nickname );

			updateConnections();

			cb( nickname );
		}

	});

	socket.on( 'disconnect', function ( name ){
		if( ! socket.nickname ) return;

		connections.splice( connections.indexOf( socket.nickname ), 1 );
		updateConnections();
	});

	function updateConnections(){
		io.sockets.emit( 'connections', connections );
	}

	socket.on( 'messages', function ( data ){

		var message = data && '<span style="color: '+ socket.color +';">' + socket.nickname + ':</span> ' + data || data; 

		io.sockets.emit( 'messages', message );

	});


});

