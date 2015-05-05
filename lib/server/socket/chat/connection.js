var moment = require( 'moment' );

function Connection( data, socket ){

	this.nickname = data.nickname;
	this.color = data.color;
	this.presence = data.presence;

}

Connection.prototype.change = function( presence, connections ){
	if( ! presence || [ 'online', 'busy', 'offline' ].indexOf( presence ) === -1 ) throw new Error( 'Not a valid presence!' );

	this.presence = presence;
	this.update();
};

/*
Connection.prototype.Presence = require( './presence' );

Presence.prototype.remove = function( connection, connections ){
	if( typeof connection === 'object' ) throw new Error( 'Need a connection object for this operation' );

	this.states.splice( connection.indexOf( connection.nickname ), 1 );
	delete connection.presences[ connection.nickname ];

	this.state.update( connections );
};
*/
module.exports = Connection;
