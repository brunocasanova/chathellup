var database = require( '../index' );
var Schema = database.Schema;

var UserSchema = new Schema({

	id: Number,

    nickname: String,
	password: String,

	color: String,

	presence: {
		type: String,
		default: 'online',
	},

	created_at: {
		type: Date,
		default: Date.now,
	},

	updated_at: {
		type: Date,
		default: null,
	},
	
	deleted_at: {
		type: Date,
		default: null,
	},

});

module.exports = database.model( 'User', UserSchema );

console.log( 'DATABASE user schema loaded!' );