var components = [

	[ 'session', './session', ],

	[ 'statics', './statics', ],

	[ 'router', './router', ],

	[ 'render', './render', ],
	
	[ 'error', './error', ],

];

components.forEach(function ( middlewares ){
	module.exports[ middlewares[0] ] = require( middlewares[1] );
	outlog({ title: 'middlewares', output: middlewares[0] + ' loaded!' });
});