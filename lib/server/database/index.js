var mongoose = module.exports = require( 'mongoose' );
var database = mongoose.connection;

var uri = 'mongodb://localhost:27017/chathellup';

var options = {
	user: 'root',
	pass: ''
};

mongoose.connect( uri, options );

database.on( 'error', function ( err ){
	console.log( 'Database error:', err );
});

database.once( 'open', function (){
	console.log( 'Database connected at', uri );
});

require( './schemas' );