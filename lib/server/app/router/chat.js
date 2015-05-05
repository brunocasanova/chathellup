var app = require( '../index' );

app.get( [ '/general', 'general/index' ], function ( req, res, next ){
	if( ! req.session.nickname ) return res.redirect( '/login' );

	res.render( 'rooms/general.html', { title: 'Chathellup | General', req: req } );
});