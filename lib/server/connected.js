
module.exports = function Connected(){
	this.connections = [];
}

Connected.prototype.connect = function ( connection ){
	this.connections.push( connection );
};

Connected.prototype.getConnecteds = function (){
	return this.connections.length && this.connections || [];
};