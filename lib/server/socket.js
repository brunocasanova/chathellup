
var server = require( './server' );

var socket = require( 'socket.io' );
var io = module.exports = socket.listen( server );

var Connection = require( './connection' );

io.sockets.on( 'connection', function ( client ){

	client.on( 'connected', function ( name ){

		var connection = new Connection( client, name );

		client.emit( 'connecteds', connection );
		//client.broadcast.emit( 'users', connection );

	});

	/*

	client.on( 'join', function ( name ){

		
	});

	client.on( 'disconnect', function ( name ){



	});


	var users = {};
	var alias = 'client';

	var count = 0;

	var user = {};

	user.others = [];


	client.on( 'join', function ( name ){

		count += 1;

		var user = users[ alias + count ] = {};

		user.alias = alias + count;
		user.name = name;

		setOthers( user, users );

		client.emit( 'user', users );
		client.broadcast.emit( 'users', users );

	});

	function setOthers( user, users ){
		user.others = [];

		for ( var i in users ){
			if( user.name != users[i].name ){
				user.others.push( users[i] );
			}
		}

		users.connectedCount = user.others.length;
	}

	client.on( 'messages', function ( data ){

		var message = data && '<span style="color: #999;">' + user.name + ':</span> ' + data || data; 

		client.emit( 'messages', message );
		client.broadcast.emit( 'messages', message );

	});

	client.on( 'disconnect', function ( client ){
	
		delete users[ user.alias ];

		console.log( 'DISCONNECT', users );

	});

*/

});

/*



var clients = {};
 
var socketsOfClients = {};

io.sockets.on( 'connection', function ( socket ){

	socket.on('set username', function ( userName ){
		
		// Is this an existing user name?
		if( clients[ userName ] === undefined ){

			// Does not exist ... so, proceed
			clients[ userName ] = socket.id;
			
			socketsOfClients[ socket.id ] = userName;
			
			userNameAvailable( socket.id, userName );
			
			userJoined( userName );
		}

		else if ( clients[ userName ] === socket.id ){
			// Ignore for now
		}

		else {
			userNameAlreadyInUse( socket.id, userName );
		}

	});

	socket.on( 'message', function ( msg ){
		var srcUser;

		if( msg.inferSrcUser ){
			// Infer user name based on the socket id
			srcUser = socketsOfClients[ socket.id ];
		}

		else{
			srcUser = msg.source;
		}

		if( msg.target == "All" ){
			
			// broadcast
			io.sockets.emit( 'message', {
				"source": srcUser,
				"message": msg.message,
				"target": msg.target
			});
		}

		else {
			// Look up the socket id
			io.sockets.sockets[ clients[ msg.target ] ].emit( 'message', {
				"source": srcUser,
				"message": msg.message,
				"target": msg.target
			});
		}

	});

	socket.on( 'disconnect', function(){
		
		var uName = socketsOfClients[ socket.id ];
		
		delete socketsOfClients[ socket.id ];
		delete clients[ uName ];

		// relay this message to all the clients

		userLeft( uName );
	});

});
 
function userJoined( uName ){
	Object.keys(socketsOfClients).forEach(function ( sId ){

		io.sockets.sockets[sId].emit( 'userJoined', { "userName": uName });
	});
}
 
function userLeft( uName ){
    io.sockets.emit('userLeft', { "userName": uName });
}
 
function userNameAvailable( sId, uName ){
  
	setTimeout(function(){

		console.log( 'Sending welcome msg to ' + uName + ' at ' + sId );

		io.sockets.sockets[ sId ].emit( 'welcome', {
			"userName" : uName,
			"currentUsers": JSON.stringify( Object.keys( clients ) ),
		});

	}, 500 );

}

function userNameAlreadyInUse(sId, uName) {
	setTimeout(function() {
		io.sockets.sockets[sId].emit('error', { "userNameInUse" : true });
	}, 500);
}
*/
