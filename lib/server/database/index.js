var mongoose = module.exports = require( 'mongoose' );
var database = mongoose.connection;
var config = require( '../../../config.json' );

var uri = 'mongodb://localhost:27017/chathellup';

mongoose.connect( uri, config.mongodb );

database.on( 'error', function ( err ){
	console.log( '[DATABASE] error:', err );
});

database.once( 'open', function (){
	console.log( '[DATABASE]: connected at', uri );
});

require( './schemas' );