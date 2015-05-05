var components = [
	[ 'statics', './statics', ],

	[ 'session', './session', ],
	
	[ 'router', './router', ],

	[ 'render', './render', ],
	
	[ 'error', './error', ],
];

var middlewares = {};

components.forEach(function ( middlewares ){
	module.exports[ middlewares[0] ] = require( middlewares[1] );
	console.log( 'MIDDLEWARES', middlewares[0], 'loaded!' );
});