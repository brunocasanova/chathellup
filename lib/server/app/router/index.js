var app = require( '../index' );

var User = require( '../../database/schemas/user.js' );
var Message = require( '../../database/schemas/message.js' );

app.get([ '/', '/home', '/home/index' ], function ( req, res, next ){
	if( ! req.session.nickname ) return res.redirect( '/login' );

	User.find( {}, function ( err, users ){
		req.users = users || {};

		Message.find( {}, function ( err, message ){
			req.message = message || {};

			res.render( 'home/index.html', { title: 'Chathellup | Home', req: req } );
		});

	});

});

app.get( '/debug', function ( req, res, next ){
	res.redirect( req.protocol + '://' + req.hostname + ':' + 8090 + '/debug?port=5858' );
});

require( './user.js' );
require( './chat.js' );