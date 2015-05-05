var database = require( '../index' );
var Schema = database.Schema;

var MessageSchema = new Schema({

    message: String,

    nickname: String,
    //user: { type: 'ObjectId', ref: 'UserSchema' },

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

module.exports = database.model( 'Message', MessageSchema );

console.log( 'DATABASE message schema loaded!' );