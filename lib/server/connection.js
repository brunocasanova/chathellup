var Connected = require( './connected' );

function Connection( socket, name ){

	this.connecteds = this.Connected.getConnecteds();
	this.others = [];

	this.id = socket.id;
	this.alias = 'connection' + this.countOthers();
	this.name = name;

	this.connected = socket.connected;
	this.disconnected = socket.disconnected;

	this.alone = ! this.others.length;

	this.Connected.connect( this );

}

Connection.prototype.setOthers = function(){
	if( ! this.connecteds.length ) return;

	for( var i in this.connecteds ){
		if( this.connecteds[i].name != this.name ){
			this.others.push( this.connecteds[i] );
		}
	}
};

Connection.prototype.countOthers = function(){
	this.setOthers();
	return this.others.length;
};

Connection.prototype.getOthers = function(){
	this.setOthers();
	return this.others;
};

Connection.prototype.Connected = new Connected();
