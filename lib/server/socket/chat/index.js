var io = require( '../' );
var moment = require( 'moment' );

var Connection = require( './connection');
var Connections = require( './connections');

var Message = require( '../../database/schemas/message' );
var User = require( '../../database/schemas/user' );

//var Session = require( '../../app/session.js' );

//var utils = require( 'express/lib/utils' );

module.exports = io.of( '/general' ).on( 'connection', function ( socket ){

	socket.on( 'connect', function ( data ){
		/*
		debugger;
		var cookie_string = socket.request.headers.cookie;
		var parsed_cookies = utils.parseCookie( cookie_string );

		var connect_sid = parsed_cookies[ 'connect.sid' ];

		if( connect_sid ){

			Session.store.get( connect_sid, function ( error, session ){
			
			
			});

		}
		*/

		//if( ! Object.keys( data ).length ) return;

		//if( typeof callback != 'function' ) throw new Error( 'Callback must be a function!' );

		var nickname = data.nickname.length > 2 && data.nickname.trim() || false;
		var password = data.password.length > 2 && data.password.trim() || false;

		if( ! nickname || ! password || nickname in Connections ) callback( false );

		var connection = new Connection( data, this );

		Connections.insert( connection );

		//connection.Presence.change( 'busy', connection );
		updateboard();
		callback( connection );
	});

	socket.on( 'message', function ( data ){
		//if( ! data || ! data.length ) return;

		var body = {
			message: data.message,
			nickname: socket.connection.nickname,
			created_at: moment().format( 'HH:MM a' ),
		};

		var message = new Message( body );

		message.save(function ( err ){
			if( err ) throw new Error( 'Error creating message!' );
			
			io.sockets.emit( 'messages', body, socket.connection );
		});

	});

});

function updateboard(){
	if( ! socket.hasConnection ) return;

	io.sockets.emit( 'board', Connections );
}

