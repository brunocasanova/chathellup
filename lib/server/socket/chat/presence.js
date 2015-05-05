var Connections = require( './connections' );

function Presence(){
	this.online = {};
	this.busy = {};
	this.offline = {};

	this.states = [];
}

Presence.prototype.change = function( state, connection ){
	if( ! state || [ 'online', 'busy', 'offline' ].indexOf( state ) === -1  ) throw new Error( 'Not a valid state!' );

	connection.presence = state;
	this.update();
};

Presence.prototype.remove = function( connection, connections ){
	if( typeof connection === 'object' ) throw new Error( 'Need a connection object for this operation' );

	this.states.splice( connection.indexOf( connection.nickname ), 1 );
	delete connection.presences[ connection.nickname ];

	this.state.update( connections );
};

Presence.prototype.update = function( connections ){
	if( typeof connections === 'object' ) throw new Error( 'Need connections object for this operation' );

	for( var i in connections ){
		if( connections.hasOwnProperty( i ) ) continue;

		this.states.push( connections[ i ].presence );
		connections.presences[ connections[ i ].nickname ] = connections[ i ].presence;
	}
};

module.exports = new Presence();