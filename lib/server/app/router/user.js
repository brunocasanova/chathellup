var app = require( '../index' );
var crypto = require( 'crypto' );
var User = require( '../../database/schemas/user.js' );

app.all( '/register', function ( req, res, next ){
	if( req.session.nickname ) return res.redirect( '/' );
	next();
})
.get( '/register', function ( req, res ){
	res.render( 'home/register.html', { title: 'Chathellup | Register', req: req } );
})
.post( '/register', function ( req, res ){
	var body = req.body,
		session = req.session,
		login = {};

	if( ! body.nickname && ! body.password ){
		return res.redirect( '/' );
	}

	var hashed = crypto.createHash( 'sha256' ).update( body.password ).digest( 'base64' );

	var user = new User({
		nickname: body.nickname,
		password: hashed,
		color: "#" + Math.random().toString( 16 ).slice( 2, 8 ),
	});

	user.save(function ( err ){
		if( err ) throw new Error( 'Error creating User!' );

		session.nickname = user.nickname;
		session.color = user.color;
		session.presence = user.presence;

		res.redirect( '/' );
	});

});

app.all( '/login', function ( req, res, next ){
	if( req.session.nickname ) return res.redirect( '/' );
	next();
})
.get( '/login', function ( req, res ){
	res.render( 'home/login.html', { title: 'Chathellup | Login', req: req } );
})
.post( '/login', function ( req, res ){
	var body = req.body,
		session = req.session,
		login = {};

	if( ! body.nickname && ! body.password ) return res.redirect( '/' );

	login.nickname = body.nickname;
	login.password = body.password;

	User.findOne( login, function ( err, user ){
		if( err ) return res.send( false );

		if( ! user ){
			req.error = true;
			return res.redirect( '/' );
		}

		session.nickname = user.nickname;
		session.color = user.color;
		session.presence = user.presence;

		res.redirect( '/' );
	});

});

app.get( '/logout', function ( req, res ){
	if( ! req.session.nickname ) return res.redirect( '/' );
	req.session.destroy(function ( err ){
		if( err ) return next( err );

		res.redirect( '/' );
	});
});
