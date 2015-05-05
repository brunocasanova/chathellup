
function Connections(){
	this.defaultilize();
}

Connections.prototype.insert = function ( connection ){
	if( ! Object.keys( connection ).length ) throw new Error( 'Need a connection object for this operation' );

	this.raw.ids.push( connection.id );
	this.raw.aliases.push( connection.nickname );
	this.connections[ connection.nickname ] = connection;
	this.update();
};

Connections.prototype.remove = function ( connection ){
	if( ! Object.keys( connection ).length ) throw new Error( 'Need a connection object for this operation' );

	this.raw.ids.splice( connection.indexOf( connection.id ), 1 );
	this.raw.aliases.splice( connection.indexOf( connection.nickname ), 1 );

	delete this.connections[ connection.nickname ];
	this.update();
};

Connections.prototype.get = function (){
	this.update();
	return this.connections;
};

Connections.prototype.update = function (){
	if( ! Object.keys( this.connections ).length ){
		this.defaultilize();
	}
	
	var id, nickname;

	this.empty = false;

	for( var i in this.connections ){
		if( ! this.connections.hasOwnProperty( i ) ) continue;

		id = this.connections[ i ].id;
		nickname = this.connections[ i ].nickname;
		this.count += 1;

		if( this.raw.ids.indexOf( id ) === -1 ) this.raw.ids.push( id );
		if( this.raw.aliases.indexOf( nickname ) === -1 ) this.raw.aliases.push( nickname );

		this.connections[ nickname ] = this.connections[ i ];
	}
};

Connections.prototype.defaultilize = function (){
	this.connections = {};
	this.count = 0;
	this.empty = true;

	this.raw = {
		ids: [],
		aliases: [],
	};
};

Connections.prototype.alone = function (){
	return this.count == 1;
};

module.exports = new Connections();
