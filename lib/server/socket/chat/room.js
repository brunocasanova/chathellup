var io = require( './sockets/chat' );


/*

module.exports = function (){
	this.socketIo = SocketIo;

};

Chat.prototype.auth = function( data, callback ){
		if( data.nickname in connections ) callback( false );
			
		this.connection = {
			id: this.id,
			nickname: data.nickname,
			color: randomColor(),
			connected: this.connected,
			created_at: moment().format( 'DD/MM/YY HH:MM:SS' ),
		};

		this.hasConnection = this.connection.connected;

		connections[ this.connection.nickname ] = this;

		this.getConnections = function (){
			var conn, c = { nicknames: [] };

			for( var i in connections ){
				if( typeof connections[i] !== 'object' ) continue;

				conn = connections[ i ].connection;

				c.nicknames.push( conn.nickname );

				c[ conn.nickname ] = {
					id: connections[ i ].id,
					nickname: conn.nickname,
					color: conn.color,
					created_at: conn.created_at,
				};
			}

			return c;
		};

		this.connections = function ( arg ){
			return this.getConnections( arg );
		};

		updateboard();
		callback( this.connection );
};


















Chat.prototype.disconnect = function ( connection ){
	if( ! this.hasConnection ) return;

	SocketIo.emit( 'disconnect', this.connection );
	delete connections[ this.connection.nickname ];

	updateboard();

};

Room.prototype.message = function ( data ){
	if( ! data || ! data.length || ! this.hasConnection ) return;

	var message = {
		text: data,
		created_at: moment().format( 'HH:MM a' ),

		nickname: this.connection.nickname,
		color: this.connection.color,
	};

	update( 'messages', message );

};


	socket.on( 'typing', function ( name ){
		// Testing without connection
		SocketIo.emit( name, this.connection || { nickname: 'test' } );
	}



SocketIo.on( 'connection', function ( socket ){

	socket.on( 'connect', function ( data ){
		console.log( 'Socket', socket.id, data );
	});

	socket.on( 'master', function (){

	});

	socket.on( 'login', function ( data, callback ){

		if( data.nickname in connections ) callback( false );
			
		this.connection = {
			id: this.id,
			nickname: data.nickname,
			color: randomColor(),
			connected: this.connected,
			created_at: moment().format( 'DD/MM/YY HH:MM:SS' ),
		};
		this.hasConnection = this.connection.connected;

		connections[ this.connection.nickname ] = this;

		this.getConnections = function (){
			var conn, c = { nicknames: [] };

			for( var i in connections ){
				if( typeof connections[i] !== 'object' ) continue;

				conn = connections[ i ].connection;

				c.nicknames.push( conn.nickname );

				c[ conn.nickname ] = {
					id: connections[ i ].id,
					nickname: conn.nickname,
					color: conn.color,
					created_at: conn.created_at,
				};
			}

			return c;
		};

		this.connections = function ( arg ){
			return this.getConnections( arg );
		};

		updateboard();
		callback( this.connection );
	});

	socket.on( 'message', function ( data ){
		if( ! data || ! data.length || ! this.hasConnection ) return;

		var message = {
			text: data,
			created_at: moment().format( 'HH:MM a' ),

			nickname: this.connection.nickname,
			color: this.connection.color,
		};

		update( 'messages', message );
	});

	socket.on( 'typing', function ( name ){
		// Testing without connection
		SocketIo.emit( name, this.connection || { nickname: 'test' } );
	});

	socket.on( 'disconnect', function ( name ){
		if( ! this.hasConnection ) return;

		SocketIo.emit( 'disconnect', this.connection );
		delete connections[ this.connection.nickname ];

		updateboard();
	});

	function update( ref, val ){
		SocketIo.emit( ref, val );
	}

	function updateboard(){
		if( ! socket.hasConnection ) return;

		SocketIo.emit( 'connections-board', socket.connections() );
	}

});
*/

